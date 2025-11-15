import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  Clock,
  Hash,
  Link as LinkIcon,
  Check,
  Copy,
  Sparkles,
  TrendingUp,
  Eye,
  Zap,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FirstCommentTemplate {
  id: string;
  name: string;
  content: string;
  hashtags: string[];
  links: string[];
  platform: 'instagram' | 'facebook' | 'tiktok';
  delay: number; // seconds
  enabled: boolean;
  usageCount: number;
  lastUsed?: Date;
  createdAt: Date;
}

export default function FirstComment() {
  const [selectedTemplate, setSelectedTemplate] = useState<FirstCommentTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [autoPostEnabled, setAutoPostEnabled] = useState(true);

  // Mock data - in production, this would come from API
  const [templates, setTemplates] = useState<FirstCommentTemplate[]>([
    {
      id: '1',
      name: 'Product Launch',
      content: 'Shop now! 🛍️ Link in bio for exclusive early access.',
      hashtags: [
        'newproduct',
        'productlaunch',
        'shopnow',
        'limitededition',
        'exclusive',
        'shopping',
        'musthave',
        'newcollection',
        'trending',
        'viral'
      ],
      links: ['https://shop.example.com/new'],
      platform: 'instagram',
      delay: 5,
      enabled: true,
      usageCount: 34,
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Engagement Boost',
      content: '👇 Drop a ❤️ if you agree! Let me know your thoughts below.',
      hashtags: [
        'engagement',
        'community',
        'letschat',
        'comments',
        'discussion',
        'thoughts',
        'opinions',
        'interact',
        'talk',
        'conversation'
      ],
      links: [],
      platform: 'instagram',
      delay: 3,
      enabled: true,
      usageCount: 67,
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Blog Link Drop',
      content: 'Read the full article on our blog! 📖 Link: https://blog.example.com/latest',
      hashtags: [
        'blog',
        'article',
        'readmore',
        'linkinbio',
        'learn',
        'education',
        'content',
        'writer',
        'blogger',
        'reading'
      ],
      links: ['https://blog.example.com/latest'],
      platform: 'instagram',
      delay: 5,
      enabled: true,
      usageCount: 23,
      lastUsed: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'Call to Action',
      content: '✨ Tag a friend who needs to see this! Share with someone who would love it.',
      hashtags: [
        'tagafriend',
        'share',
        'viral',
        'trending',
        'explore',
        'fyp',
        'foryou',
        'instagood',
        'photooftheday',
        'love'
      ],
      links: [],
      platform: 'instagram',
      delay: 3,
      enabled: false,
      usageCount: 89,
      lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      name: 'Contest Entry',
      content: 'To enter: 1) Follow us 2) Like this post 3) Tag 2 friends below! 🎁 Winner announced Friday!',
      hashtags: [
        'giveaway',
        'contest',
        'win',
        'free',
        'prize',
        'competition',
        'enter',
        'winner',
        'giveawayalert',
        'contestalert'
      ],
      links: [],
      platform: 'instagram',
      delay: 2,
      enabled: true,
      usageCount: 12,
      lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    }
  ]);

  const toggleTemplate = (templateId: string) => {
    setTemplates(templates.map(t =>
      t.id === templateId ? { ...t, enabled: !t.enabled } : t
    ));
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const copyTemplate = (template: FirstCommentTemplate) => {
    const fullComment = `${template.content}\n\n${template.hashtags.map(tag => `#${tag}`).join(' ')}`;
    navigator.clipboard.writeText(fullComment);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTimeAgo = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      instagram: '📸',
      facebook: '📘',
      tiktok: '🎵'
    };
    return icons[platform] || '📱';
  };

  const totalTemplates = templates.length;
  const activeTemplates = templates.filter(t => t.enabled).length;
  const totalUsage = templates.reduce((sum, t) => sum + t.usageCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-sf-gold" />
            First Comment Auto-Poster
          </h1>
          <p className="text-muted-foreground mt-1">
            Keep captions clean, drop hashtags in first comment - the Instagram growth hack
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sf-black/40 border border-sf-gold/20">
            <Switch
              checked={autoPostEnabled}
              onCheckedChange={setAutoPostEnabled}
              className="data-[state=checked]:bg-sf-gold"
            />
            <span className="text-sm font-medium text-foreground">
              Auto-post {autoPostEnabled ? 'ON' : 'OFF'}
            </span>
          </div>

          <Button onClick={() => setIsCreating(true)} className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-4 stagger-1 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Templates</p>
              <p className="text-2xl font-bold text-sfs-gold">{totalTemplates}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-2 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active Templates</p>
              <p className="text-2xl font-bold text-green-500">{activeTemplates}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-3 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sf-gold/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Usage</p>
              <p className="text-2xl font-bold text-sfs-gold">{totalUsage}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="sfs-flow-card bg-blue-500/5 border-blue-500/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-500 mb-1">How It Works</h4>
            <p className="text-sm text-muted-foreground">
              When you publish a post, the system automatically posts a comment with your chosen template
              after the specified delay. This keeps your caption clean while still leveraging hashtags for reach.
              Links work great in comments too!
            </p>
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, idx) => (
          <Card
            key={template.id}
            className={cn(
              'sfs-flow-card hover-elevate transition-all',
              template.enabled && 'border-sf-gold/40',
              `stagger-${(idx % 6) + 1} fade-in-up`
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{template.name}</h3>
                  {template.enabled && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-xs font-medium flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge text-xs">
                    {getPlatformIcon(template.platform)} {template.platform}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {template.delay}s delay
                  </span>
                </div>
              </div>

              <Switch
                checked={template.enabled}
                onCheckedChange={() => toggleTemplate(template.id)}
                className="data-[state=checked]:bg-sf-gold"
              />
            </div>

            {/* Content Preview */}
            <div className="mb-4 p-3 rounded-lg bg-sf-black/40 border border-sf-gold/10">
              <p className="text-sm text-foreground mb-3">{template.content}</p>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {template.hashtags.slice(0, 6).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-sf-gold/10 text-sf-gold border border-sf-gold/20"
                  >
                    #{tag}
                  </span>
                ))}
                {template.hashtags.length > 6 && (
                  <span className="text-xs px-2 py-0.5 text-muted-foreground">
                    +{template.hashtags.length - 6} more
                  </span>
                )}
              </div>

              {/* Links */}
              {template.links.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-blue-500">
                  <LinkIcon className="w-3 h-3" />
                  {template.links.length} link{template.links.length > 1 ? 's' : ''} included
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-sf-gold/10">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Hashtags</p>
                <p className="text-sm font-bold text-sfs-gold flex items-center gap-1">
                  <Hash className="w-3 h-3" />
                  {template.hashtags.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Used</p>
                <p className="text-sm font-bold text-sfs-gold flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {template.usageCount}x
                </p>
              </div>
            </div>

            {/* Last Used */}
            {template.lastUsed && (
              <p className="text-xs text-muted-foreground mb-3">
                Last used: {formatTimeAgo(template.lastUsed)}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => copyTemplate(template)}
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
                    Copy
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedTemplate(template)}
                className="border-sf-gold/20 hover:border-sf-gold/40"
              >
                <Edit className="w-4 h-4" />
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
      {templates.length === 0 && (
        <Card className="sfs-glass-card p-12 text-center">
          <MessageSquare className="w-16 h-16 text-sf-gold/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No templates yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Create your first comment template to get started with this powerful growth hack
          </p>
          <Button onClick={() => setIsCreating(true)} className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Template
          </Button>
        </Card>
      )}

      {/* Create/Edit Form */}
      {(isCreating || selectedTemplate) && (
        <Card className="sfs-glass-card">
          <h3 className="text-lg font-semibold text-sfs-gold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {isCreating ? 'Create New Template' : 'Edit Template'}
          </h3>
          <TemplateForm
            template={selectedTemplate}
            onSave={() => {
              setIsCreating(false);
              setSelectedTemplate(null);
            }}
            onCancel={() => {
              setIsCreating(false);
              setSelectedTemplate(null);
            }}
          />
        </Card>
      )}

      {/* Pro Tips */}
      <Card className="sfs-flow-card bg-sf-gold/5 border-sf-gold/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sf-gold mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sfs-gold mb-1">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keep captions clean and focused on storytelling, drop hashtags in first comment</li>
              <li>• Use 3-5 second delay to ensure comment posts after the main post publishes</li>
              <li>• Mix high-volume and niche hashtags for maximum reach</li>
              <li>• Include CTAs in your first comment to drive engagement</li>
              <li>• Links are clickable in Instagram comments - perfect for blog posts!</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* How It Helps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
            <Eye className="w-6 h-6 text-purple-500" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Cleaner Look</h4>
          <p className="text-sm text-muted-foreground">
            Keep your captions clean and professional without hashtag clutter
          </p>
        </Card>

        <Card className="glass-card p-4">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Same Reach</h4>
          <p className="text-sm text-muted-foreground">
            Hashtags in first comment work just as well as in captions
          </p>
        </Card>

        <Card className="glass-card p-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
            <Zap className="w-6 h-6 text-blue-500" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">Save Time</h4>
          <p className="text-sm text-muted-foreground">
            Automate the process and never forget to post your first comment
          </p>
        </Card>
      </div>
    </div>
  );
}

function TemplateForm({
  template,
  onSave,
  onCancel
}: {
  template: FirstCommentTemplate | null;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(template?.name || '');
  const [content, setContent] = useState(template?.content || '');
  const [hashtags, setHashtags] = useState(template?.hashtags.join(', ') || '');
  const [links, setLinks] = useState(template?.links.join('\n') || '');
  const [platform, setPlatform] = useState(template?.platform || 'instagram');
  const [delay, setDelay] = useState(template?.delay || 5);

  const handleSave = () => {
    // In production, this would call an API
    console.log('Saving template:', {
      name,
      content,
      hashtags: hashtags.split(',').map(h => h.trim()),
      links: links.split('\n').filter(l => l.trim()),
      platform,
      delay
    });
    onSave();
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
            placeholder="e.g., Product Launch"
            className="bg-sf-black/40 border-sf-gold/20 text-foreground"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="w-full h-10 px-3 rounded-md bg-sf-black/40 border border-sf-gold/20 text-foreground"
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Comment Content
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your first comment here..."
          className="min-h-[100px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Hashtags (comma-separated, without #)
        </label>
        <Textarea
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="trending, viral, newpost, instagram, etc."
          className="min-h-[80px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {hashtags.split(',').filter(h => h.trim()).length} hashtags
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Links (one per line)
        </label>
        <Textarea
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="https://example.com/link1&#10;https://example.com/link2"
          className="min-h-[60px] bg-sf-black/40 border-sf-gold/20 text-foreground resize-none"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Delay (seconds)
        </label>
        <Input
          type="number"
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value))}
          min={1}
          max={30}
          className="bg-sf-black/40 border-sf-gold/20 text-foreground"
        />
        <p className="text-xs text-muted-foreground mt-1">
          How long to wait after posting before commenting (1-30 seconds)
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1 border-sf-gold/20"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={!name || !content}
          className="flex-1 btn-gold"
        >
          <Check className="w-4 h-4 mr-2" />
          {template ? 'Update' : 'Create'} Template
        </Button>
      </div>
    </div>
  );
}
