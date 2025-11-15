/**
 * Bulk Upload - CSV import for agencies
 * Schedule 100s of posts in minutes with beautiful SFS theme
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Upload,
  FileText,
  Download,
  Check,
  X,
  AlertCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  FileUp,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ParsedPost {
  id: string;
  date: string;
  time: string;
  platform: string;
  content: string;
  mediaUrl?: string;
  hashtags?: string;
  status: 'valid' | 'error' | 'warning';
  errors?: string[];
}

export default function BulkUpload() {
  const [step, setStep] = useState<'upload' | 'preview' | 'scheduling'>('upload');
  const [parsedPosts, setParsedPosts] = useState<ParsedPost[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Mock parsed data
  const mockParsedPosts: ParsedPost[] = [
    {
      id: '1',
      date: '2024-02-15',
      time: '09:00',
      platform: 'instagram',
      content: 'Start your day with positive vibes! ✨ What are you grateful for today?',
      hashtags: '#motivation #gratitude #mondaymood',
      status: 'valid'
    },
    {
      id: '2',
      date: '2024-02-15',
      time: '14:00',
      platform: 'facebook',
      content: '🔥 New blog post alert! Learn how to grow your social media following organically.',
      mediaUrl: 'https://example.com/image1.jpg',
      status: 'valid'
    },
    {
      id: '3',
      date: '2024-02-15',
      time: '19:00',
      platform: 'twitter',
      content: 'Quick tip: Consistency beats perfection every time. Keep showing up! 💪',
      status: 'valid'
    },
    {
      id: '4',
      date: '2024-02-16',
      time: '10:00',
      platform: 'linkedin',
      content: 'Excited to share our latest case study on B2B content marketing strategies.',
      hashtags: '#marketing #B2B',
      status: 'warning',
      errors: ['No media attached - LinkedIn posts with images get 2x engagement']
    },
    {
      id: '5',
      date: '2024-02-16',
      time: '15:00',
      platform: 'invalid-platform',
      content: 'This post has an error',
      status: 'error',
      errors: ['Invalid platform: invalid-platform']
    }
  ];

  const handleFileUpload = () => {
    // Simulate file processing
    setParsedPosts(mockParsedPosts);
    setStep('preview');
  };

  const validPosts = parsedPosts.filter(p => p.status === 'valid');
  const warningPosts = parsedPosts.filter(p => p.status === 'warning');
  const errorPosts = parsedPosts.filter(p => p.status === 'error');

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      instagram: '📸',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼',
      tiktok: '🎵',
      youtube: '📺',
      pinterest: '📌'
    };
    return icons[platform] || '📱';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient">Bulk Upload</h1>
          <p className="text-muted-foreground mt-1">
            Schedule hundreds of posts in minutes 🚀
          </p>
        </div>
        <Button
          variant="outline"
          className="border-sf-gold/20"
          onClick={() => {
            // Download CSV template
            const csvContent = `date,time,platform,content,media_url,hashtags
2024-02-15,09:00,instagram,"Good morning! Start your day right ✨","https://example.com/image.jpg","#morning #motivation"
2024-02-15,14:00,facebook,"Check out our latest blog post!","","#blog #content"
2024-02-15,19:00,twitter,"Quick social media tip for today","","#socialmedia #tips"`;
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'bulk-upload-template.csv';
            a.click();
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* Progress Steps */}
      <Card className="sfs-glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
              step === 'upload' ? 'bg-sf-gold text-sf-black' : 'bg-sf-gold/20 text-sf-gold'
            )}>
              1
            </div>
            <div>
              <p className={cn(
                'font-semibold',
                step === 'upload' ? 'text-foreground' : 'text-muted-foreground'
              )}>
                Upload CSV
              </p>
              <p className="text-xs text-muted-foreground">Import your posts</p>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-muted-foreground" />

          <div className="flex items-center gap-4">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
              step === 'preview' ? 'bg-sf-gold text-sf-black' : 'bg-sf-gold/20 text-sf-gold'
            )}>
              2
            </div>
            <div>
              <p className={cn(
                'font-semibold',
                step === 'preview' ? 'text-foreground' : 'text-muted-foreground'
              )}>
                Review & Fix
              </p>
              <p className="text-xs text-muted-foreground">Check for errors</p>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-muted-foreground" />

          <div className="flex items-center gap-4">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
              step === 'scheduling' ? 'bg-sf-gold text-sf-black' : 'bg-sf-gold/20 text-sf-gold'
            )}>
              3
            </div>
            <div>
              <p className={cn(
                'font-semibold',
                step === 'scheduling' ? 'text-foreground' : 'text-muted-foreground'
              )}>
                Schedule
              </p>
              <p className="text-xs text-muted-foreground">Queue your posts</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Upload Step */}
      {step === 'upload' && (
        <Card
          className={cn(
            'sfs-flow-card p-12 text-center border-2 border-dashed transition-all cursor-pointer',
            isDragging ? 'border-sf-gold bg-sf-gold/5' : 'border-sf-gold/20'
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload();
          }}
        >
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-sf-gold/10 flex items-center justify-center mx-auto">
              <FileUp className="w-10 h-10 text-sf-gold" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gold-gradient mb-2">
                Drop your CSV file here
              </h3>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button
                className="btn-gold pulse-on-hover"
                onClick={handleFileUpload}
              >
                <Upload className="w-4 h-4 mr-2" />
                Select CSV File
              </Button>
            </div>

            <div className="max-w-md mx-auto space-y-3 text-left">
              <p className="text-sm font-semibold text-foreground">CSV Format Requirements:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Columns: date, time, platform, content, media_url (optional), hashtags (optional)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Date format: YYYY-MM-DD</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Time format: HH:MM (24-hour)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Supported platforms: instagram, facebook, twitter, linkedin, tiktok, youtube, pinterest</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Preview Step */}
      {step === 'preview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-sf-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Posts</p>
                  <p className="text-lg font-bold text-sf-gold">{parsedPosts.length}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valid</p>
                  <p className="text-lg font-bold text-green-500">{validPosts.length}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                  <p className="text-lg font-bold text-yellow-500">{warningPosts.length}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Errors</p>
                  <p className="text-lg font-bold text-red-500">{errorPosts.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Posts Table */}
          <Card className="sfs-flow-card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sf-gold/5">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-sf-gold">Status</th>
                    <th className="text-left p-4 text-sm font-semibold text-sf-gold">Date & Time</th>
                    <th className="text-left p-4 text-sm font-semibold text-sf-gold">Platform</th>
                    <th className="text-left p-4 text-sm font-semibold text-sf-gold">Content</th>
                    <th className="text-left p-4 text-sm font-semibold text-sf-gold">Media</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedPosts.map((post, idx) => (
                    <tr
                      key={post.id}
                      className={cn(
                        'border-t border-sf-gold/10 hover:bg-sf-gold/5 transition-colors',
                        `stagger-${(idx % 6) + 1} fade-in-up`
                      )}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {post.status === 'valid' && (
                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                              <Check className="w-4 h-4 text-green-500" />
                            </div>
                          )}
                          {post.status === 'warning' && (
                            <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            </div>
                          )}
                          {post.status === 'error' && (
                            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                              <X className="w-4 h-4 text-red-500" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-foreground">{post.date}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getPlatformIcon(post.platform)}</span>
                          <span className="text-sm capitalize text-foreground">{post.platform}</span>
                        </div>
                      </td>
                      <td className="p-4 max-w-md">
                        <p className="text-sm text-foreground line-clamp-2">{post.content}</p>
                        {post.hashtags && (
                          <p className="text-xs text-muted-foreground mt-1">{post.hashtags}</p>
                        )}
                        {post.errors && post.errors.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {post.errors.map((error, i) => (
                              <p key={i} className="text-xs text-red-500">{error}</p>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        {post.mediaUrl ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep('upload')}
              className="border-sf-gold/20"
            >
              Upload Different File
            </Button>
            <Button
              className="btn-gold"
              disabled={validPosts.length === 0}
              onClick={() => setStep('scheduling')}
            >
              <Play className="w-4 h-4 mr-2" />
              Schedule {validPosts.length} Post{validPosts.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      )}

      {/* Scheduling Step */}
      {step === 'scheduling' && (
        <Card className="sfs-flow-card p-12 text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-500" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gold-gradient mb-2">
                Successfully Scheduled!
              </h2>
              <p className="text-muted-foreground text-lg">
                {validPosts.length} posts have been added to your queue
              </p>
            </div>

            <div className="max-w-md mx-auto bg-sf-gold/5 rounded-lg p-6 border border-sf-gold/20">
              <Calendar className="w-8 h-8 text-sf-gold mx-auto mb-3" />
              <p className="text-sm text-foreground mb-2">Your posts will be published on schedule</p>
              <p className="text-xs text-muted-foreground">
                You can view and manage them in your Content Calendar
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => setStep('upload')}
                className="border-sf-gold/20"
              >
                Upload More Posts
              </Button>
              <Button className="btn-gold">
                <Calendar className="w-4 h-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
