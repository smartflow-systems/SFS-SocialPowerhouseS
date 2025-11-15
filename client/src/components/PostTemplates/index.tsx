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
  FileText,
  Plus,
  Copy,
  Check,
  Trash2,
  Edit,
  Eye,
  Search,
  Folder,
  Star,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostTemplate {
  id: string;
  name: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'all';
  category: string;
  content: string;
  hashtags: string[];
  mediaPlaceholder?: string;
  favorite: boolean;
  usageCount: number;
  avgEngagement: number;
  performance: {
    likes: number;
    comments: number;
    shares: number;
  };
  createdAt: Date;
  lastUsed?: Date;
}

export default function PostTemplates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<PostTemplate | null>(null);

  // Mock data - in production, this would come from API
  const [templates, setTemplates] = useState<PostTemplate[]>([
    {
      id: '1',
      name: 'Product Announcement',
      platform: 'instagram',
      category: 'Marketing',
      content: `🚀 Exciting news! We're thrilled to announce [PRODUCT_NAME]!

✨ [Key Feature 1]
✨ [Key Feature 2]
✨ [Key Feature 3]

Available now! Link in bio 👆

[CTA]`,
      hashtags: ['newproduct', 'announcement', 'productlaunch', 'innovation', 'comingsoon'],
      mediaPlaceholder: 'Product image or video',
      favorite: true,
      usageCount: 34,
      avgEngagement: 9.2,
      performance: {
        likes: 1250,
        comments: 89,
        shares: 45
      },
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Monday Motivation',
      platform: 'all',
      category: 'Engagement',
      content: `💪 Happy Monday!

Remember: [MOTIVATIONAL_QUOTE]

What are your goals for this week? Drop them below! 👇

Let's make it an amazing week! 🌟`,
      hashtags: ['mondaymotivation', 'motivationmonday', 'goals', 'success', 'inspiration'],
      mediaPlaceholder: 'Inspirational quote graphic',
      favorite: true,
      usageCount: 67,
      avgEngagement: 8.7,
      performance: {
        likes: 890,
        comments: 124,
        shares: 34
      },
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Behind The Scenes',
      platform: 'instagram',
      category: 'Content',
      content: `👀 Behind the scenes at [LOCATION/EVENT]

We love sharing what goes on behind the camera! Here's a sneak peek at [PROCESS/ACTIVITY].

What would you like to see more of? Let us know! 💬`,
      hashtags: ['behindthescenes', 'bts', 'sneakpeek', 'process', 'transparency'],
      mediaPlaceholder: 'BTS photo or video',
      favorite: false,
      usageCount: 23,
      avgEngagement: 7.5,
      performance: {
        likes: 456,
        comments: 67,
        shares: 12
      },
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Customer Testimonial',
      platform: 'all',
      category: 'Social Proof',
      content: `⭐ Customer Love Alert! ⭐

"[TESTIMONIAL_TEXT]" - [Customer Name]

Stories like these fuel our passion! Thank you for being part of our journey. ❤️

Have you tried [PRODUCT/SERVICE]? Share your experience below! 👇`,
      hashtags: ['testimonial', 'customerreview', 'happy customers', 'socialiproof', 'reviews'],
      mediaPlaceholder: 'Customer photo or product image',
      favorite: true,
      usageCount: 45,
      avgEngagement: 8.9,
      performance: {
        likes: 1120,
        comments: 98,
        shares: 56
      },
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      name: 'Educational Tip',
      platform: 'linkedin',
      category: 'Educational',
      content: `💡 Pro Tip: [TIP_TITLE]

Here's a quick tip that can help you [BENEFIT]:

1️⃣ [Step 1]
2️⃣ [Step 2]
3️⃣ [Step 3]

Try this out and let me know how it works for you!

What other topics would you like me to cover? Comment below! 👇`,
      hashtags: ['protip', 'education', 'learning', 'tips', 'productivity'],
      mediaPlaceholder: 'Infographic or carousel',
      favorite: false,
      usageCount: 29,
      avgEngagement: 7.8,
      performance: {
        likes: 567,
        comments: 45,
        shares: 78
      },
      createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      name: 'Flash Sale',
      platform: 'all',
      category: 'Promotional',
      content: `🔥 FLASH SALE ALERT! 🔥

[DISCOUNT_PERCENTAGE]% OFF [PRODUCT/CATEGORY]!

⏰ Today only!
🎁 [Special offer details]
✨ [Additional benefit]

Don't miss out! Shop now 👉 [LINK]

[LIMITED_TIME_CTA]`,
      hashtags: ['flashsale', 'sale', 'discount', 'limitedtime', 'shopnow'],
      mediaPlaceholder: 'Sale graphic with products',
      favorite: true,
      usageCount: 52,
      avgEngagement: 9.5,
      performance: {
        likes: 1890,
        comments: 156,
        shares: 234
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '7',
      name: 'Team Spotlight',
      platform: 'linkedin',
      category: 'Company Culture',
      content: `👥 Team Spotlight: Meet [EMPLOYEE_NAME]!

[EMPLOYEE_NAME] is our [POSITION] and has been with us for [DURATION].

Here's what [he/she/they] love about working here:
"[QUOTE]"

Fun fact: [FUN_FACT]

We're lucky to have such amazing people on our team! ✨`,
      hashtags: ['teamspotlight', 'companyculture', 'team', 'workplace', 'employees'],
      mediaPlaceholder: 'Employee photo',
      favorite: false,
      usageCount: 18,
      avgEngagement: 6.9,
      performance: {
        likes: 234,
        comments: 23,
        shares: 15
      },
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    },
    {
      id: '8',
      name: 'User Generated Content',
      platform: 'instagram',
      category: 'Community',
      content: `📸 Repost from @[USERNAME]!

We absolutely LOVE seeing how you use [PRODUCT/SERVICE]! 😍

Thank you for sharing and being part of our community! ❤️

Want to be featured? Tag us in your posts! 👆

📷: @[USERNAME]`,
      hashtags: ['ugc', 'community', 'repost', 'featured', 'customerphoto'],
      mediaPlaceholder: 'Customer content',
      favorite: true,
      usageCount: 41,
      avgEngagement: 8.4,
      performance: {
        likes: 987,
        comments: 76,
        shares: 34
      },
      createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
  ]);

  const platforms = ['all', 'instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform =
      selectedPlatform === 'all' ||
      template.platform === selectedPlatform ||
      template.platform === 'all';
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  const handleCopyTemplate = (template: PostTemplate) => {
    const fullContent = `${template.content}\n\n${template.hashtags.map(tag => `#${tag}`).join(' ')}`;
    navigator.clipboard.writeText(fullContent);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);

    // Update usage count
    setTemplates(templates.map(t =>
      t.id === template.id
        ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date() }
        : t
    ));
  };

  const toggleFavorite = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, favorite: !t.favorite } : t
    ));
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
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

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      instagram: '📸',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼',
      tiktok: '🎵',
      all: '🌐'
    };
    return icons[platform] || '📱';
  };

  const totalTemplates = templates.length;
  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0);
  const avgEngagement = templates.length > 0
    ? (templates.reduce((sum, t) => sum + t.avgEngagement, 0) / templates.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient flex items-center gap-3">
            <FileText className="w-8 h-8 text-sf-gold" />
            Post Templates
          </h1>
          <p className="text-muted-foreground mt-1">
            Save and reuse your best-performing post templates
          </p>
        </div>

        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-sf-black border-sf-gold/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-sfs-gold">Create Post Template</DialogTitle>
            </DialogHeader>
            <CreateTemplateForm onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-4 stagger-1 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <Folder className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Templates</p>
              <p className="text-2xl font-bold text-sfs-gold">{totalTemplates}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-2 fade-in-up">
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

        <Card className="glass-card p-4 stagger-3 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-sf-gold" />
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates..."
                className="pl-10 bg-sf-black/40 border-sf-gold/20 text-foreground"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap py-2">Platform:</span>
            {platforms.map(platform => (
              <Button
                key={platform}
                variant={selectedPlatform === platform ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPlatform(platform)}
                className={cn(
                  'capitalize whitespace-nowrap',
                  selectedPlatform === platform && 'btn-gold'
                )}
              >
                {getPlatformIcon(platform)} {platform}
              </Button>
            ))}
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap py-2">Category:</span>
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
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, idx) => (
          <Card
            key={template.id}
            className={cn(
              'sfs-flow-card hover-elevate',
              `stagger-${(idx % 6) + 1} fade-in-up`
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    <Star
                      className={cn(
                        'w-4 h-4',
                        template.favorite && 'fill-yellow-500 text-yellow-500'
                      )}
                    />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge text-xs">
                    {getPlatformIcon(template.platform)} {template.platform}
                  </span>
                  <span className="badge text-xs">{template.category}</span>
                </div>
              </div>
            </div>

            {/* Content Preview */}
            <div className="mb-4 p-3 rounded-lg bg-sf-black/40 border border-sf-gold/10">
              <p className="text-sm text-foreground line-clamp-4 whitespace-pre-wrap">
                {template.content}
              </p>
              {template.mediaPlaceholder && (
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <ImageIcon className="w-3 h-3" />
                  {template.mediaPlaceholder}
                </div>
              )}
            </div>

            {/* Hashtags */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {template.hashtags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-sf-gold/10 text-sf-gold border border-sf-gold/20"
                  >
                    #{tag}
                  </span>
                ))}
                {template.hashtags.length > 3 && (
                  <span className="text-xs px-2 py-0.5 text-muted-foreground">
                    +{template.hashtags.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-sf-gold/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Heart className="w-3 h-3" />
                </div>
                <p className="text-sm font-bold text-sfs-gold">
                  {template.performance.likes > 1000
                    ? `${(template.performance.likes / 1000).toFixed(1)}K`
                    : template.performance.likes}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <MessageCircle className="w-3 h-3" />
                </div>
                <p className="text-sm font-bold text-sfs-gold">
                  {template.performance.comments}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Share2 className="w-3 h-3" />
                </div>
                <p className="text-sm font-bold text-sfs-gold">
                  {template.performance.shares}
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Used</span>
                <span className="text-sfs-gold font-bold">{template.usageCount}x</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Engagement</span>
                <span className={cn('font-bold', getEngagementColor(template.avgEngagement))}>
                  {template.avgEngagement}/10
                </span>
              </div>
              {template.lastUsed && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last used</span>
                  <span className="text-foreground">{formatTimeAgo(template.lastUsed)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => setPreviewTemplate(template)}
                variant="outline"
                className="flex-1 border-sf-gold/20 hover:border-sf-gold/40"
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>

              <Button
                size="sm"
                onClick={() => handleCopyTemplate(template)}
                className={cn(
                  'flex-1 transition-all',
                  copiedId === template.id
                    ? 'bg-green-500/20 text-green-500 border-green-500/40'
                    : 'btn-gold'
                )}
              >
                {copiedId === template.id ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Use
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => deleteTemplate(template.id)}
                className="border-red-500/20 text-red-500 hover:border-red-500/40 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card className="sfs-glass-card p-12 text-center">
          <FileText className="w-16 h-16 text-sf-gold/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No templates found
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedPlatform !== 'all' || selectedCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first template to get started'}
          </p>
          {!searchQuery && selectedPlatform === 'all' && selectedCategory === 'all' && (
            <Button onClick={() => setIsCreating(true)} className="btn-gold">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Template
            </Button>
          )}
        </Card>
      )}

      {/* Preview Dialog */}
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
          <DialogContent className="bg-sf-black border-sf-gold/30 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-sfs-gold">{previewTemplate.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-sf-black/40 border border-sf-gold/20">
                <p className="text-foreground whitespace-pre-wrap mb-4">
                  {previewTemplate.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {previewTemplate.hashtags.map(tag => (
                    <span key={tag} className="text-sm text-sf-gold">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => handleCopyTemplate(previewTemplate)}
                className="w-full btn-gold"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Pro Tip */}
      <Card className="sfs-flow-card bg-sf-gold/5 border-sf-gold/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sf-gold mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sfs-gold mb-1">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use [PLACEHOLDERS] for easy customization of templates</li>
              <li>• Track performance to identify your best-converting templates</li>
              <li>• Create platform-specific templates for optimal engagement</li>
              <li>• Update templates based on seasonal trends and current events</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CreateTemplateForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('all');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');

  const handleCreate = () => {
    // In production, this would call an API
    console.log('Creating template:', { name, platform, category, content, hashtags });
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Template Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Product Announcement"
            className="bg-sf-black/40 border-sf-gold/20 text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-sf-black/40 border border-sf-gold/20 text-foreground"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Category
        </label>
        <Input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g., Marketing, Engagement, Promotional"
          className="bg-sf-black/40 border-sf-gold/20 text-foreground"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Content Template
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your template here... Use [PLACEHOLDERS] for customizable parts"
          className="min-h-[150px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Tip: Use [PLACEHOLDER_NAME] for parts that change each time
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Hashtags (comma-separated, without #)
        </label>
        <Textarea
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="newproduct, announcement, launch, innovation"
          className="min-h-[80px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
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
          disabled={!name || !category || !content}
          className="flex-1 btn-gold"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>
    </div>
  );
}
