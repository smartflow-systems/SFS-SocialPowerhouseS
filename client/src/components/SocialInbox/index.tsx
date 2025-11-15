/**
 * Social Inbox - Unified message management across all platforms
 * Beautiful SFS-themed inbox with real-time updates
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  MessageCircle,
  Send,
  Star,
  Archive,
  Trash2,
  Search,
  Filter,
  Check,
  Clock,
  Heart,
  Reply,
  MoreVertical,
  AtSign,
  Hash,
  Smile,
  Paperclip
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin';
  type: 'dm' | 'comment' | 'mention';
  from: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  read: boolean;
  starred: boolean;
  replied: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
  postPreview?: string;
}

export default function SocialInbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock messages - will be replaced with real API
  const mockMessages: Message[] = [
    {
      id: '1',
      platform: 'instagram',
      type: 'dm',
      from: {
        name: 'Sarah Johnson',
        username: '@sarahj',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      content: 'Hey! Love your recent post about social media strategies. Can you share more tips?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      starred: false,
      replied: false,
      sentiment: 'positive'
    },
    {
      id: '2',
      platform: 'facebook',
      type: 'comment',
      from: {
        name: 'Mike Chen',
        username: 'mikechen',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      content: 'This is exactly what I needed! Thank you for sharing 🙌',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true,
      starred: true,
      replied: true,
      sentiment: 'positive',
      postPreview: 'How to grow your Instagram following organically...'
    },
    {
      id: '3',
      platform: 'twitter',
      type: 'mention',
      from: {
        name: 'Emily Davis',
        username: '@emilymarketer',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: '@yourhandle Your content strategy workshop was amazing! When is the next one?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      starred: false,
      replied: false,
      sentiment: 'positive'
    },
    {
      id: '4',
      platform: 'linkedin',
      type: 'dm',
      from: {
        name: 'David Rodriguez',
        username: 'davidrodriguez',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      content: 'Interested in discussing a potential collaboration. Are you available for a call this week?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      starred: true,
      replied: false,
      sentiment: 'neutral'
    },
    {
      id: '5',
      platform: 'instagram',
      type: 'comment',
      from: {
        name: 'Jessica Lee',
        username: '@jessicalee',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      content: 'Could you do a tutorial on this? Would love to learn more! 💡',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true,
      starred: false,
      replied: true,
      sentiment: 'positive',
      postPreview: '5 essential tools for content creators...'
    },
    {
      id: '6',
      platform: 'facebook',
      type: 'dm',
      from: {
        name: 'Tom Anderson',
        username: 'tomanderson',
        avatar: 'https://i.pravatar.cc/150?img=6'
      },
      content: 'Quick question about your pricing. Do you offer team plans?',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      starred: false,
      replied: false,
      sentiment: 'neutral'
    }
  ];

  const filteredMessages = mockMessages.filter(msg => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'unread' && !msg.read) ||
      (filter === 'starred' && msg.starred);

    const matchesSearch =
      searchQuery === '' ||
      msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.from.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = mockMessages.filter(m => !m.read).length;
  const starredCount = mockMessages.filter(m => m.starred).length;

  const getPlatformIcon = (platform: string) => {
    const icons = {
      instagram: '📸',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼'
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dm': return <MessageCircle className="w-4 h-4" />;
      case 'comment': return <MessageCircle className="w-4 h-4" />;
      case 'mention': return <AtSign className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gold-gradient">Social Inbox</h1>
          <p className="text-muted-foreground mt-1">
            Manage all your messages in one place 💬
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-sf-gold/20">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button className="btn-gold">
            <Check className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sf-gold/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-sf-gold" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Messages</p>
              <p className="text-lg font-bold text-sf-gold">{mockMessages.length}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Unread</p>
              <p className="text-lg font-bold text-orange-500">{unreadCount}</p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Starred</p>
              <p className="text-lg font-bold text-yellow-500">{starredCount}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Inbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <Card className="sfs-glass-card h-[700px] flex flex-col">
            {/* Search & Filter */}
            <div className="p-4 border-b border-sf-gold/10 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages..."
                  className="pl-10 bg-sf-black/40 border-sf-gold/20"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    filter === 'all'
                      ? 'bg-sf-gold/20 text-sf-gold'
                      : 'bg-sf-brown/10 text-muted-foreground hover:bg-sf-brown/20'
                  )}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    filter === 'unread'
                      ? 'bg-sf-gold/20 text-sf-gold'
                      : 'bg-sf-brown/10 text-muted-foreground hover:bg-sf-brown/20'
                  )}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('starred')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    filter === 'starred'
                      ? 'bg-sf-gold/20 text-sf-gold'
                      : 'bg-sf-brown/10 text-muted-foreground hover:bg-sf-brown/20'
                  )}
                >
                  <Star className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message, idx) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={cn(
                    'p-4 border-b border-sf-gold/5 cursor-pointer transition-colors hover:bg-sf-gold/5',
                    selectedMessage?.id === message.id && 'bg-sf-gold/10',
                    !message.read && 'bg-sf-brown/5',
                    `stagger-${(idx % 6) + 1} fade-in-up`
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <img
                        src={message.from.avatar}
                        alt={message.from.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="absolute -bottom-1 -right-1 text-base">
                        {getPlatformIcon(message.platform)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">
                            {message.from.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {message.from.username}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-foreground line-clamp-2 mb-2">
                        {message.content}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-2">
                        <div className={cn('text-xs px-2 py-0.5 rounded', getSentimentColor(message.sentiment))}>
                          {getTypeIcon(message.type)}
                        </div>
                        {!message.read && (
                          <span className="w-2 h-2 rounded-full bg-sf-gold"></span>
                        )}
                        {message.starred && (
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        )}
                        {message.replied && (
                          <Reply className="w-3 h-3 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="sfs-flow-card h-[700px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-sf-gold/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedMessage.from.avatar}
                      alt={selectedMessage.from.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{selectedMessage.from.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedMessage.from.username} • {getPlatformIcon(selectedMessage.platform)} {selectedMessage.platform}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Star className={cn(
                        'w-4 h-4',
                        selectedMessage.starred && 'fill-yellow-500 text-yellow-500'
                      )} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {selectedMessage.postPreview && (
                  <div className="mt-3 p-3 rounded-lg bg-sf-brown/10 border border-sf-gold/10">
                    <p className="text-xs text-muted-foreground mb-1">Commented on:</p>
                    <p className="text-sm text-foreground">{selectedMessage.postPreview}</p>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {/* Original Message */}
                  <div className="bg-sf-brown/10 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-muted-foreground">
                        {selectedMessage.timestamp.toLocaleString()}
                      </span>
                      <span className={cn('text-xs px-2 py-1 rounded-full', getSentimentColor(selectedMessage.sentiment))}>
                        {selectedMessage.sentiment}
                      </span>
                    </div>
                    <p className="text-foreground">{selectedMessage.content}</p>
                  </div>

                  {/* Previous Replies (Mock) */}
                  {selectedMessage.replied && (
                    <div className="ml-8 bg-sf-gold/5 rounded-lg p-4 border-l-2 border-sf-gold">
                      <p className="text-xs text-muted-foreground mb-2">You replied:</p>
                      <p className="text-sm text-foreground">
                        Thanks for your message! I'll get back to you shortly with more details.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Box */}
              <div className="p-4 border-t border-sf-gold/10">
                <div className="space-y-3">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    className="min-h-[100px] bg-sf-black/40 border-sf-gold/20 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Hash className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button className="btn-gold" disabled={!replyText.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="sfs-flow-card h-[700px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a message</h3>
                <p className="text-muted-foreground">
                  Choose a conversation to view and reply
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
