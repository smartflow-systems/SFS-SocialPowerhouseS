/**
 * Competitor Analysis - Track and analyze competitor performance
 * Beautiful SFS-themed competitive intelligence dashboard
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  X,
  Search,
  Filter,
  BarChart3,
  Calendar,
  Target,
  Zap,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Competitor {
  id: string;
  name: string;
  username: string;
  platform: string;
  avatar: string;
  followers: number;
  followersGrowth: number;
  avgEngagement: number;
  engagementRate: number;
  postsPerWeek: number;
  topHashtags: string[];
  lastChecked: Date;
  status: 'active' | 'inactive';
}

export default function CompetitorAnalysis() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock competitors data
  const mockCompetitors: Competitor[] = [
    {
      id: '1',
      name: 'Digital Marketing Pro',
      username: '@digitalmarketingpro',
      platform: 'instagram',
      avatar: 'https://i.pravatar.cc/150?img=10',
      followers: 125000,
      followersGrowth: 15.2,
      avgEngagement: 8500,
      engagementRate: 6.8,
      postsPerWeek: 7,
      topHashtags: ['#digitalmarketing', '#socialmedia', '#marketing'],
      lastChecked: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      name: 'Social Media Guru',
      username: '@socialmediaguru',
      platform: 'linkedin',
      avatar: 'https://i.pravatar.cc/150?img=11',
      followers: 89000,
      followersGrowth: 12.5,
      avgEngagement: 3200,
      engagementRate: 3.6,
      postsPerWeek: 5,
      topHashtags: ['#linkedin', '#B2B', '#contentmarketing'],
      lastChecked: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '3',
      name: 'Content Creator Hub',
      username: '@contentcreatorhub',
      platform: 'twitter',
      avatar: 'https://i.pravatar.cc/150?img=12',
      followers: 67000,
      followersGrowth: -2.3,
      avgEngagement: 1800,
      engagementRate: 2.7,
      postsPerWeek: 12,
      topHashtags: ['#contentcreation', '#creators', '#socialmedia'],
      lastChecked: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'active'
    },
    {
      id: '4',
      name: 'Brand Strategy Co',
      username: '@brandstrategyco',
      platform: 'facebook',
      avatar: 'https://i.pravatar.cc/150?img=13',
      followers: 54000,
      followersGrowth: 8.7,
      avgEngagement: 2100,
      engagementRate: 3.9,
      postsPerWeek: 4,
      topHashtags: ['#branding', '#strategy', '#business'],
      lastChecked: new Date(Date.now() - 8 * 60 * 60 * 1000),
      status: 'active'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      instagram: '📸',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼',
      tiktok: '🎵',
      youtube: '📺'
    };
    return icons[platform] || '📱';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient">Competitor Analysis</h1>
          <p className="text-muted-foreground mt-1">
            Track and analyze your competition 🎯
          </p>
        </div>
        <Button className="btn-gold pulse-on-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tracked</p>
              <p className="text-lg font-bold text-sf-gold">{mockCompetitors.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Growth</p>
              <p className="text-lg font-bold text-green-500">
                +{(mockCompetitors.reduce((sum, c) => sum + c.followersGrowth, 0) / mockCompetitors.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Engagement</p>
              <p className="text-lg font-bold text-sf-gold">4.2%</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Posts/Week</p>
              <p className="text-lg font-bold text-sf-gold">
                {(mockCompetitors.reduce((sum, c) => sum + c.postsPerWeek, 0) / mockCompetitors.length).toFixed(1)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompetitors.map((competitor, idx) => (
          <Card
            key={competitor.id}
            className={cn(
              'sfs-glass-card hover-elevate cursor-pointer transition-all',
              selectedCompetitor?.id === competitor.id && 'ring-2 ring-sf-gold',
              `stagger-${(idx % 6) + 1} fade-in-up`
            )}
            onClick={() => setSelectedCompetitor(competitor)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={competitor.avatar}
                    alt={competitor.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 text-lg">
                    {getPlatformIcon(competitor.platform)}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{competitor.name}</p>
                  <p className="text-xs text-muted-foreground">{competitor.username}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="text-red-500">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Followers</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-sf-gold">{formatNumber(competitor.followers)}</p>
                  <div className="flex items-center gap-1">
                    {competitor.followersGrowth >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={cn(
                      'text-xs font-medium',
                      competitor.followersGrowth >= 0 ? 'text-green-500' : 'text-red-500'
                    )}>
                      {competitor.followersGrowth >= 0 ? '+' : ''}{competitor.followersGrowth}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span>Engagement</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-sf-gold">{formatNumber(competitor.avgEngagement)}</p>
                  <p className="text-xs text-muted-foreground">{competitor.engagementRate}% rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Posts/Week</span>
                </div>
                <p className="text-sm font-bold text-foreground">{competitor.postsPerWeek}</p>
              </div>
            </div>

            {/* Top Hashtags */}
            <div className="mt-4 pt-4 border-t border-sf-gold/10">
              <p className="text-xs text-muted-foreground mb-2">Top Hashtags:</p>
              <div className="flex flex-wrap gap-1">
                {competitor.topHashtags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-sf-gold/10 text-sf-gold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Last checked: {formatTime(competitor.lastChecked)}</span>
              <Button size="sm" variant="ghost">
                <Eye className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        ))}

        {/* Add Competitor Card */}
        <Card className="sfs-glass-card border-2 border-dashed border-sf-gold/20 hover:border-sf-gold/40 cursor-pointer transition-colors stagger-4 fade-in-up">
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 rounded-full bg-sf-gold/10 flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-sf-gold" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Add Competitor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Track another competitor's performance
            </p>
            <Button className="btn-gold" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add New
            </Button>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
      {selectedCompetitor && (
        <Card className="sfs-flow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-sfs-gold flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Detailed Comparison: {selectedCompetitor.name}
            </h2>
            <Button variant="ghost" size="sm" onClick={() => setSelectedCompetitor(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Engagement Metrics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Engagement Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-foreground">Likes</span>
                    </div>
                    <span className="text-sm font-bold text-sf-gold">6,500</span>
                  </div>
                  <div className="w-full bg-sf-brown/20 rounded-full h-2">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-foreground">Comments</span>
                    </div>
                    <span className="text-sm font-bold text-sf-gold">1,200</span>
                  </div>
                  <div className="w-full bg-sf-brown/20 rounded-full h-2">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-foreground">Shares</span>
                    </div>
                    <span className="text-sm font-bold text-sf-gold">800</span>
                  </div>
                  <div className="w-full bg-sf-brown/20 rounded-full h-2">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Posting Times */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Best Posting Times</h3>
              <div className="space-y-2">
                {['Mon 9AM', 'Wed 2PM', 'Fri 7PM'].map((time, idx) => (
                  <div key={time} className="flex items-center justify-between p-2 rounded-lg bg-sf-brown/10">
                    <span className="text-sm text-foreground">{time}</span>
                    <span className="text-xs text-muted-foreground">{15 - idx * 3}% of posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Content Performance</h3>
              <div className="space-y-2">
                {[
                  { type: 'Videos', percentage: 45 },
                  { type: 'Images', percentage: 35 },
                  { type: 'Carousels', percentage: 20 }
                ].map(item => (
                  <div key={item.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{item.type}</span>
                      <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-sf-brown/20 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-sf-gold to-sf-gold-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="mt-6 p-4 rounded-lg bg-sf-gold/5 border border-sf-gold/20">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-sf-gold mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-sf-gold mb-1">Competitive Insight</p>
                <p className="text-sm text-muted-foreground">
                  {selectedCompetitor.name} posts {selectedCompetitor.postsPerWeek} times per week,
                  {selectedCompetitor.postsPerWeek > 5 ? ' which is above' : ' which is below'} the industry average.
                  Their engagement rate of {selectedCompetitor.engagementRate}% is
                  {selectedCompetitor.engagementRate > 4 ? ' strong' : ' average'} for {selectedCompetitor.platform}.
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
