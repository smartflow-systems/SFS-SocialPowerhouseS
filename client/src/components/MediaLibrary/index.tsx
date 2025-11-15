/**
 * Media Library - Cloud storage for brand assets
 * Beautiful SFS-themed media manager with drag-and-drop
 */

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Upload,
  Image,
  Video,
  File,
  Folder,
  Search,
  Grid,
  List,
  Trash2,
  Download,
  Copy,
  Check,
  Star,
  Filter,
  Plus,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: number;
  folder?: string;
  favorite: boolean;
  createdAt: Date;
  tags: string[];
}

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Mock data - will be replaced with real API
  const mockFiles: MediaFile[] = [
    {
      id: '1',
      name: 'brand-logo.png',
      url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Brand+Logo',
      type: 'image',
      size: 245000,
      folder: 'Brand Assets',
      favorite: true,
      createdAt: new Date('2024-01-15'),
      tags: ['logo', 'brand']
    },
    {
      id: '2',
      name: 'product-showcase.mp4',
      url: 'https://via.placeholder.com/400x300/E6C200/000000?text=Video',
      type: 'video',
      size: 5240000,
      folder: 'Products',
      favorite: false,
      createdAt: new Date('2024-01-14'),
      tags: ['product', 'video']
    },
    {
      id: '3',
      name: 'instagram-template.jpg',
      url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Template',
      type: 'image',
      size: 189000,
      folder: 'Templates',
      favorite: true,
      createdAt: new Date('2024-01-13'),
      tags: ['template', 'instagram']
    },
    {
      id: '4',
      name: 'social-post-1.png',
      url: 'https://via.placeholder.com/400x300/E6C200/000000?text=Post+1',
      type: 'image',
      size: 312000,
      favorite: false,
      createdAt: new Date('2024-01-12'),
      tags: ['social', 'content']
    },
    {
      id: '5',
      name: 'promo-banner.jpg',
      url: 'https://via.placeholder.com/400x300/FFD700/000000?text=Promo',
      type: 'image',
      size: 456000,
      folder: 'Campaigns',
      favorite: false,
      createdAt: new Date('2024-01-11'),
      tags: ['promo', 'campaign']
    },
    {
      id: '6',
      name: 'customer-testimonial.mp4',
      url: 'https://via.placeholder.com/400x300/E6C200/000000?text=Testimonial',
      type: 'video',
      size: 3100000,
      folder: 'Testimonials',
      favorite: true,
      createdAt: new Date('2024-01-10'),
      tags: ['testimonial', 'video']
    }
  ];

  const folders = [...new Set(mockFiles.map(f => f.folder).filter(Boolean))];

  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFolder = !selectedFolder || file.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      default: return <File className="w-5 h-5" />;
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            Manage your brand assets and content 📸
          </p>
        </div>
        <Button className="btn-gold pulse-on-hover">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Toolbar */}
      <Card className="sfs-glass-card">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="pl-10 bg-sf-black/40 border-sf-gold/20"
              />
            </div>
          </div>

          {/* Folder Filter */}
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-sf-gold" />
            <select
              value={selectedFolder || ''}
              onChange={(e) => setSelectedFolder(e.target.value || null)}
              className="bg-sf-black/40 border border-sf-gold/20 rounded-lg px-3 py-2 text-sm text-foreground"
            >
              <option value="">All Folders</option>
              {folders.map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-1 p-1 bg-sf-brown/20 rounded-lg">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewMode('grid')}
              className={cn(viewMode === 'grid' && 'bg-sf-gold/20 text-sf-gold')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setViewMode('list')}
              className={cn(viewMode === 'list' && 'bg-sf-gold/20 text-sf-gold')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Bulk Actions */}
          {selectedFiles.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedFiles.size} selected
              </span>
              <Button size="sm" variant="ghost" className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Image className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Images</p>
              <p className="text-lg font-bold text-sf-gold">
                {mockFiles.filter(f => f.type === 'image').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Videos</p>
              <p className="text-lg font-bold text-sf-gold">
                {mockFiles.filter(f => f.type === 'video').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Favorites</p>
              <p className="text-lg font-bold text-sf-gold">
                {mockFiles.filter(f => f.favorite).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Folder className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Folders</p>
              <p className="text-lg font-bold text-sf-gold">{folders.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Files Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file, idx) => (
            <Card
              key={file.id}
              className={cn(
                'sfs-glass-card hover-elevate cursor-pointer group relative overflow-hidden transition-all',
                selectedFiles.has(file.id) && 'ring-2 ring-sf-gold',
                `stagger-${(idx % 6) + 1} fade-in-up`
              )}
              onClick={() => toggleSelect(file.id)}
            >
              {/* Image Preview */}
              <div className="aspect-video bg-sf-brown/20 rounded-lg overflow-hidden mb-3 relative">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {file.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                )}
                {file.favorite && (
                  <Star className="absolute top-2 right-2 w-5 h-5 text-sf-gold fill-sf-gold" />
                )}
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <p className="font-medium text-sm text-foreground truncate">
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatFileSize(file.size)}</span>
                  <span>{file.type}</span>
                </div>
                {file.folder && (
                  <div className="badge text-xs">{file.folder}</div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyUrl(file.url);
                  }}
                  className="w-8 h-8 rounded-lg bg-sf-black/80 backdrop-blur flex items-center justify-center hover:bg-sf-gold/20 transition-colors"
                >
                  {copiedUrl === file.url ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-white" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="w-8 h-8 rounded-lg bg-sf-black/80 backdrop-blur flex items-center justify-center hover:bg-sf-gold/20 transition-colors"
                >
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="sfs-flow-card p-0 overflow-hidden">
          <table className="w-full">
            <thead className="bg-sf-gold/5">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-sf-gold">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-sf-gold">Type</th>
                <th className="text-left p-4 text-sm font-semibold text-sf-gold">Size</th>
                <th className="text-left p-4 text-sm font-semibold text-sf-gold">Folder</th>
                <th className="text-left p-4 text-sm font-semibold text-sf-gold">Date</th>
                <th className="text-right p-4 text-sm font-semibold text-sf-gold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file => (
                <tr
                  key={file.id}
                  className={cn(
                    'border-t border-sf-gold/10 hover:bg-sf-gold/5 transition-colors cursor-pointer',
                    selectedFiles.has(file.id) && 'bg-sf-gold/10'
                  )}
                  onClick={() => toggleSelect(file.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sf-brown/20 flex items-center justify-center text-sf-gold">
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        {file.tags.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {file.tags.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground capitalize">{file.type}</td>
                  <td className="p-4 text-sm text-muted-foreground">{formatFileSize(file.size)}</td>
                  <td className="p-4">
                    {file.folder && (
                      <span className="badge text-xs">{file.folder}</span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {file.createdAt.toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyUrl(file.url);
                        }}
                      >
                        {copiedUrl === file.url ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <Card className="sfs-flow-card p-12 text-center">
          <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
          </p>
          <Button className="btn-gold">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </Card>
      )}
    </div>
  );
}
