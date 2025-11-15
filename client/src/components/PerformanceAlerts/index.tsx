import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Settings,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Sparkles,
  Filter,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'viral' | 'milestone' | 'trending' | 'spike' | 'warning';
  severity: 'info' | 'success' | 'warning' | 'critical';
  title: string;
  message: string;
  platform: string;
  postId: string;
  postPreview: string;
  metrics: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
    engagementRate?: number;
  };
  timestamp: Date;
  read: boolean;
  actionable: boolean;
}

export default function PerformanceAlerts() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [showRead, setShowRead] = useState(false);

  // Mock data - in production, this would come from API/WebSocket
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'viral',
      severity: 'critical',
      title: '🔥 VIRAL ALERT!',
      message: 'Your post is going viral! Engagement is 450% above average',
      platform: 'instagram',
      postId: 'post_123',
      postPreview: 'Just launched our new product line! ✨ Which color is your favorite? 👇',
      metrics: {
        likes: 12450,
        comments: 892,
        shares: 567,
        views: 45000,
        engagementRate: 27.6
      },
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      actionable: true
    },
    {
      id: '2',
      type: 'milestone',
      severity: 'success',
      title: '🎉 Milestone Reached!',
      message: 'Your post just hit 10,000 likes!',
      platform: 'facebook',
      postId: 'post_124',
      postPreview: 'Behind the scenes of our latest campaign 📸 Swipe to see more!',
      metrics: {
        likes: 10234,
        comments: 456,
        shares: 234,
        engagementRate: 8.9
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
      actionable: true
    },
    {
      id: '3',
      type: 'spike',
      severity: 'info',
      title: '📈 Engagement Spike',
      message: 'Engagement increased by 280% in the last hour',
      platform: 'twitter',
      postId: 'post_125',
      postPreview: 'Hot take: [Your controversial but engaging tweet]',
      metrics: {
        likes: 3450,
        comments: 789,
        shares: 1234,
        engagementRate: 15.2
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionable: true
    },
    {
      id: '4',
      type: 'trending',
      severity: 'success',
      title: '🌟 Trending Content',
      message: 'Your post is trending in the #marketing hashtag',
      platform: 'linkedin',
      postId: 'post_126',
      postPreview: '5 strategies that helped us 10x our engagement rate 💡',
      metrics: {
        likes: 2890,
        comments: 234,
        shares: 456,
        engagementRate: 12.4
      },
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
      actionable: true
    },
    {
      id: '5',
      type: 'warning',
      severity: 'warning',
      title: '⚠️ Low Engagement',
      message: 'Post engagement is 65% below your average',
      platform: 'instagram',
      postId: 'post_127',
      postPreview: 'Check out our latest blog post! Link in bio.',
      metrics: {
        likes: 234,
        comments: 12,
        shares: 5,
        engagementRate: 1.8
      },
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      actionable: true
    },
    {
      id: '6',
      type: 'milestone',
      severity: 'success',
      title: '🎯 Engagement Goal Reached',
      message: 'You hit your weekly engagement goal of 50K interactions!',
      platform: 'all',
      postId: '',
      postPreview: '',
      metrics: {
        likes: 35000,
        comments: 8900,
        shares: 6100,
        engagementRate: 9.8
      },
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
      actionable: false
    },
    {
      id: '7',
      type: 'viral',
      severity: 'critical',
      title: '💥 Explosive Growth!',
      message: 'Your Reel is trending! 890% growth in the last 2 hours',
      platform: 'instagram',
      postId: 'post_128',
      postPreview: 'POV: When the marketing team nails it 😎 #trending',
      metrics: {
        likes: 23400,
        comments: 1234,
        shares: 890,
        views: 156000,
        engagementRate: 16.3
      },
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      read: false,
      actionable: true
    },
    {
      id: '8',
      type: 'spike',
      severity: 'info',
      title: '🚀 Shares Surging',
      message: 'Your post is being shared at 5x the normal rate',
      platform: 'linkedin',
      postId: 'post_129',
      postPreview: 'The future of AI in marketing: Our predictions for 2024',
      metrics: {
        likes: 1890,
        comments: 345,
        shares: 1567,
        engagementRate: 11.2
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true,
      actionable: true
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    viral: true,
    milestones: true,
    trending: true,
    spikes: true,
    warnings: true,
    emailNotifications: false,
    pushNotifications: true
  });

  const filters = [
    { value: 'all', label: 'All Alerts', icon: Bell },
    { value: 'viral', label: 'Viral', icon: Zap },
    { value: 'milestone', label: 'Milestones', icon: Target },
    { value: 'trending', label: 'Trending', icon: TrendingUp },
    { value: 'spike', label: 'Spikes', icon: TrendingUp },
    { value: 'warning', label: 'Warnings', icon: AlertTriangle }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = selectedFilter === 'all' || alert.type === selectedFilter;
    const matchesRead = showRead || !alert.read;
    return matchesFilter && matchesRead;
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(a =>
      a.id === alertId ? { ...a, read: true } : a
    ));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId));
  };

  const getAlertIcon = (type: string, severity: string) => {
    if (type === 'viral') return <Zap className="w-5 h-5" />;
    if (type === 'milestone') return <Target className="w-5 h-5" />;
    if (type === 'trending') return <TrendingUp className="w-5 h-5" />;
    if (type === 'spike') return <TrendingUp className="w-5 h-5" />;
    if (type === 'warning') return <AlertTriangle className="w-5 h-5" />;
    return <Info className="w-5 h-5" />;
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'from-red-500 to-orange-500';
      case 'success':
        return 'from-green-500 to-emerald-500';
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient flex items-center gap-3">
            <Bell className="w-8 h-8 text-sf-gold" />
            Performance Alerts
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-red-500 text-white text-sm font-bold">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time notifications for viral content and performance milestones
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            size="sm"
            className="border-sf-gold/20 hover:border-sf-gold/40"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-card p-4 stagger-1 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Viral Posts</p>
              <p className="text-xl font-bold text-red-500">
                {alerts.filter(a => a.type === 'viral').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-2 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Milestones</p>
              <p className="text-xl font-bold text-green-500">
                {alerts.filter(a => a.type === 'milestone').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-3 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Trending</p>
              <p className="text-xl font-bold text-blue-500">
                {alerts.filter(a => a.type === 'trending').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4 stagger-4 fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Warnings</p>
              <p className="text-xl font-bold text-yellow-500">
                {alerts.filter(a => a.type === 'warning').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => {
            const Icon = filter.icon;
            const count = filter.value === 'all'
              ? alerts.length
              : alerts.filter(a => a.type === filter.value).length;

            return (
              <Button
                key={filter.value}
                variant={selectedFilter === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter.value)}
                className={cn(
                  'whitespace-nowrap',
                  selectedFilter === filter.value && 'btn-gold'
                )}
              >
                <Icon className="w-4 h-4 mr-1" />
                {filter.label}
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-sf-gold/20 text-xs">
                  {count}
                </span>
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={showRead}
            onCheckedChange={setShowRead}
            className="data-[state=checked]:bg-sf-gold"
          />
          <span className="text-sm text-muted-foreground">Show read</span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <Card className="sfs-glass-card p-12 text-center">
            <Bell className="w-16 h-16 text-sf-gold/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No alerts to show
            </h3>
            <p className="text-muted-foreground">
              {showRead
                ? selectedFilter === 'all'
                  ? "You're all caught up!"
                  : `No ${selectedFilter} alerts found`
                : 'All alerts have been read'}
            </p>
          </Card>
        ) : (
          filteredAlerts.map((alert, idx) => (
            <Card
              key={alert.id}
              className={cn(
                'sfs-flow-card hover-elevate transition-all',
                !alert.read && 'border-sf-gold/40 bg-sf-gold/5',
                `stagger-${(idx % 6) + 1} fade-in-up`
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                    'bg-gradient-to-br text-white',
                    getAlertColor(alert.severity)
                  )}
                >
                  {getAlertIcon(alert.type, alert.severity)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          'font-semibold',
                          !alert.read ? 'text-sfs-gold' : 'text-foreground'
                        )}>
                          {alert.title}
                        </h3>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-sf-gold animate-pulse"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Post Preview */}
                  {alert.postPreview && (
                    <div className="p-3 rounded-lg bg-sf-black/40 border border-sf-gold/10 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs">
                          {getPlatformIcon(alert.platform)} {alert.platform}
                        </span>
                      </div>
                      <p className="text-sm text-foreground line-clamp-2">
                        {alert.postPreview}
                      </p>
                    </div>
                  )}

                  {/* Metrics */}
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    {alert.metrics.likes !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-bold text-foreground">
                          {alert.metrics.likes > 1000
                            ? `${(alert.metrics.likes / 1000).toFixed(1)}K`
                            : alert.metrics.likes}
                        </span>
                      </div>
                    )}
                    {alert.metrics.comments !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-bold text-foreground">
                          {alert.metrics.comments}
                        </span>
                      </div>
                    )}
                    {alert.metrics.shares !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-foreground">
                          {alert.metrics.shares}
                        </span>
                      </div>
                    )}
                    {alert.metrics.views !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-bold text-foreground">
                          {alert.metrics.views > 1000
                            ? `${(alert.metrics.views / 1000).toFixed(1)}K`
                            : alert.metrics.views}
                        </span>
                      </div>
                    )}
                    {alert.metrics.engagementRate !== undefined && (
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-sf-gold" />
                        <span className="text-sm font-bold text-sfs-gold">
                          {alert.metrics.engagementRate}% engagement
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {alert.actionable && alert.postId && (
                      <Button
                        size="sm"
                        className="btn-gold"
                      >
                        View Post
                      </Button>
                    )}
                    {!alert.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(alert.id)}
                        className="border-sf-gold/20 hover:border-sf-gold/40"
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Notification Settings */}
      <Card className="sfs-flow-card">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-sf-gold" />
          <h3 className="font-semibold text-sfs-gold">Notification Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Viral Posts</p>
              <p className="text-xs text-muted-foreground">
                Get notified when posts go viral
              </p>
            </div>
            <Switch
              checked={notificationSettings.viral}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, viral: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Milestones</p>
              <p className="text-xs text-muted-foreground">
                Celebrate when you hit goals
              </p>
            </div>
            <Switch
              checked={notificationSettings.milestones}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, milestones: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Trending Content</p>
              <p className="text-xs text-muted-foreground">
                Know when you're trending
              </p>
            </div>
            <Switch
              checked={notificationSettings.trending}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, trending: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Engagement Spikes</p>
              <p className="text-xs text-muted-foreground">
                Track sudden engagement changes
              </p>
            </div>
            <Switch
              checked={notificationSettings.spikes}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, spikes: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Performance Warnings</p>
              <p className="text-xs text-muted-foreground">
                Get alerts for low engagement
              </p>
            </div>
            <Switch
              checked={notificationSettings.warnings}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, warnings: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-sf-black/40">
            <div>
              <p className="font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive push notifications
              </p>
            </div>
            <Switch
              checked={notificationSettings.pushNotifications}
              onCheckedChange={(checked) =>
                setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
              }
              className="data-[state=checked]:bg-sf-gold"
            />
          </div>
        </div>
      </Card>

      {/* Pro Tip */}
      <Card className="sfs-flow-card bg-sf-gold/5 border-sf-gold/30">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-sf-gold mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-sfs-gold mb-1">Pro Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Act fast on viral posts - engage with comments to boost reach even more</li>
              <li>• Study your trending content to understand what resonates with your audience</li>
              <li>• Use low engagement warnings to optimize future content</li>
              <li>• Set custom thresholds for milestones based on your goals</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
