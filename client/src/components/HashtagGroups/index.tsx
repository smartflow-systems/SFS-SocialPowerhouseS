import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Hash,
  Plus,
  Copy,
  Check,
  Trash2,
  Edit,
  TrendingUp,
  Eye,
  Search,
  Folder,
  Star,
  BarChart3,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HashtagGroup {
  id: string;
  name: string;
  category: string;
  hashtags: string[];
  color: string;
  favorite: boolean;
  usageCount: number;
  avgEngagement: number;
  lastUsed?: Date;
  createdAt: Date;
}

export default function HashtagGroups() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingGroup, setEditingGroup] = useState<HashtagGroup | null>(null);

  // Mock data - in production, this would come from API
  const [groups, setGroups] = useState<HashtagGroup[]>([
    {
      id: '1',
      name: 'Product Launch',
      category: 'Marketing',
      hashtags: [
        'newproduct',
        'productlaunch',
        'innovation',
        'comingsoon',
        'exclusive',
        'limitededition',
        'shopnow',
        'brandnew',
        'musthave',
        'trending'
      ],
      color: 'from-purple-500 to-pink-500',
      favorite: true,
      usageCount: 45,
      avgEngagement: 8.5,
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Monday Motivation',
      category: 'Engagement',
      hashtags: [
        'mondaymotivation',
        'motivationmonday',
        'inspiration',
        'success',
        'goals',
        'hustle',
        'mindset',
        'positivevibes',
        'believeinyourself',
        'nevergiveup'
      ],
      color: 'from-blue-500 to-cyan-500',
      favorite: true,
      usageCount: 120,
      avgEngagement: 9.2,
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Fashion & Style',
      category: 'Industry',
      hashtags: [
        'fashion',
        'style',
        'ootd',
        'fashionblogger',
        'instafashion',
        'fashionista',
        'streetstyle',
        'styleinspo',
        'outfitoftheday',
        'fashionable'
      ],
      color: 'from-pink-500 to-rose-500',
      favorite: false,
      usageCount: 78,
      avgEngagement: 7.8,
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Tech & Innovation',
      category: 'Industry',
      hashtags: [
        'technology',
        'tech',
        'innovation',
        'ai',
        'machinelearning',
        'startup',
        'future',
        'digital',
        'coding',
        'developer'
      ],
      color: 'from-green-500 to-emerald-500',
      favorite: false,
      usageCount: 34,
      avgEngagement: 6.5,
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      name: 'Weekend Vibes',
      category: 'Engagement',
      hashtags: [
        'weekend',
        'weekendvibes',
        'saturday',
        'sunday',
        'relax',
        'chill',
        'goodtimes',
        'fun',
        'enjoy',
        'happiness'
      ],
      color: 'from-orange-500 to-amber-500',
      favorite: true,
      usageCount: 92,
      avgEngagement: 8.9,
      lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      name: 'Business Growth',
      category: 'Business',
      hashtags: [
        'business',
        'entrepreneur',
        'growth',
        'success',
        'leadership',
        'marketing',
        'branding',
        'businessowner',
        'smallbusiness',
        'entrepreneurship'
      ],
      color: 'from-indigo-500 to-purple-500',
      favorite: false,
      usageCount: 56,
      avgEngagement: 7.2,
      lastUsed: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000)
    }
  ]);

  const categories = ['all', ...Array.from(new Set(groups.map(g => g.category)))];

  const filteredGroups = groups.filter(group => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopyHashtags = (group: HashtagGroup) => {
    const hashtagString = group.hashtags.map(tag => `#${tag}`).join(' ');
    navigator.clipboard.writeText(hashtagString);
    setCopiedId(group.id);
    setTimeout(() => setCopiedId(null), 2000);

    // Update usage count
    setGroups(groups.map(g =>
      g.id === group.id
        ? { ...g, usageCount: g.usageCount + 1, lastUsed: new Date() }
        : g
    ));
  };

  const toggleFavorite = (groupId: string) => {
    setGroups(groups.map(g =>
      g.id === groupId ? { ...g, favorite: !g.favorite } : g
    ));
  };

  const deleteGroup = (groupId: string) => {
    setGroups(groups.filter(g => g.id !== groupId));
  };

  const formatTimeAgo = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getEngagementColor = (score: number) => {
    if (score >= 8.5) return 'text-green-500';
    if (score >= 7) return 'text-yellow-500';
    return 'text-orange-500';
  };

  const totalHashtags = groups.reduce((sum, g) => sum + g.hashtags.length, 0);
  const totalUsage = groups.reduce((sum, g) => sum + g.usageCount, 0);
  const avgEngagement = groups.length > 0
    ? (groups.reduce((sum, g) => sum + g.avgEngagement, 0) / groups.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient flex items-center gap-3">
            <Hash className="w-8 h-8 text-sf-gold" />
            Hashtag Groups
          </h1>
          <p className="text-muted-foreground mt-1">
            Save and reuse your best-performing hashtag collections
          </p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-sf-black border-sf-gold/30">
            <DialogHeader>
              <DialogTitle className="text-sfs-gold">Create Hashtag Group</DialogTitle>
            </DialogHeader>
            <CreateGroupForm onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 stagger-1 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Groups</p>
              <p className="text-2xl font-bold text-sfs-gold">{groups.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-2 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <Hash className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Hashtags</p>
              <p className="text-2xl font-bold text-sfs-gold">{totalHashtags}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-3 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Usage</p>
              <p className="text-2xl font-bold text-sfs-gold">{totalUsage}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-4 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Engagement</p>
              <p className={cn('text-2xl font-bold', getEngagementColor(Number(avgEngagement)))}>
                {avgEngagement}/10
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups or hashtags..."
              className="pl-10 bg-sf-black/40 border-sf-gold/20 text-foreground"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'capitalize whitespace-nowrap',
                selectedCategory === cat && 'btn-gold'
              )}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group, idx) => (
          <Card
            key={group.id}
            className={cn(
              'sfs-flow-card hover-elevate cursor-pointer',
              `stagger-${(idx % 6) + 1} fade-in-up`
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{group.name}</h3>
                  <button
                    onClick={() => toggleFavorite(group.id)}
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    <Star
                      className={cn(
                        'w-4 h-4',
                        group.favorite && 'fill-yellow-500 text-yellow-500'
                      )}
                    />
                  </button>
                </div>
                <span className="badge text-xs">{group.category}</span>
              </div>
            </div>

            {/* Hashtags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                {group.hashtags.slice(0, 8).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-sf-gold/10 text-sf-gold border border-sf-gold/20"
                  >
                    #{tag}
                  </span>
                ))}
                {group.hashtags.length > 8 && (
                  <span className="text-xs px-2 py-0.5 text-muted-foreground">
                    +{group.hashtags.length - 8} more
                  </span>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-sf-gold/10">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Tags</p>
                <p className="text-sm font-bold text-sfs-gold">{group.hashtags.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Used</p>
                <p className="text-sm font-bold text-sfs-gold">{group.usageCount}x</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Score</p>
                <p className={cn('text-sm font-bold', getEngagementColor(group.avgEngagement))}>
                  {group.avgEngagement}
                </p>
              </div>
            </div>

            {/* Last Used */}
            {group.lastUsed && (
              <p className="text-xs text-muted-foreground mb-3">
                Last used: {formatTimeAgo(group.lastUsed)}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleCopyHashtags(group)}
                className={cn(
                  'flex-1 transition-all',
                  copiedId === group.id
                    ? 'bg-green-500/20 text-green-500 border-green-500/40'
                    : 'btn-gold'
                )}
              >
                {copiedId === group.id ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy All
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingGroup(group)}
                className="border-sf-gold/20 hover:border-sf-gold/40"
              >
                <Edit className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteGroup(group.id)}
                className="border-red-500/20 text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <Card className="sfs-glass-card p-12 text-center">
          <Hash className="w-16 h-16 text-sf-gold/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No hashtag groups found
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first hashtag group to get started'}
          </p>
          {!searchQuery && selectedCategory === 'all' && (
            <Button onClick={() => setIsCreating(true)} className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Group
            </Button>
          )}
        </Card>
      )}

      {/* Pro Tip */}
      <Card className="sfs-flow-card bg-sf-gold/5 border-sf-gold/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sf-gold mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sfs-gold mb-1">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Group hashtags by campaign, industry, or content type for quick access</li>
              <li>• Mix popular and niche hashtags for maximum reach and engagement</li>
              <li>• Update groups based on performance metrics to keep them fresh</li>
              <li>• Use favorites to quickly access your best-performing groups</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CreateGroupForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleCreate = () => {
    // In production, this would call an API
    console.log('Creating group:', { name, category, hashtags: hashtags.split(',') });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Group Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Product Launch"
          className="bg-sf-black/40 border-sf-gold/20 text-foreground"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Category
        </label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Marketing, Business, Engagement"
          className="bg-sf-black/40 border-sf-gold/20 text-foreground"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Hashtags (comma-separated, without #)
        </label>
        <Textarea
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="newproduct, productlaunch, innovation, exclusive"
          className="min-h-[120px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {hashtags.split(',').filter(t => t.trim()).length} hashtags
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1 border-sf-gold/20"
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          disabled={!name || !category || !hashtags}
          className="flex-1 btn-gold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>
    </div>
  );
}
