import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import type { Post } from '@shared/schema';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import { useState } from 'react';

export default function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch scheduled posts
  const { data: postsData, isLoading } = useQuery<{ posts: Post[] }>({
    queryKey: ['/api/posts', { status: 'scheduled' }],
  });

  const scheduledPosts = postsData?.posts || [];

  // Get calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Group posts by date
  const postsByDate = scheduledPosts.reduce((acc, post) => {
    if (post.scheduledAt) {
      const dateKey = format(parseISO(post.scheduledAt.toString()), 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(post);
    }
    return acc;
  }, {} as Record<string, Post[]>);

  const getPostsForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    return postsByDate[dateKey] || [];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-scheduler">
              <CalendarIcon className="w-8 h-8 text-primary" />
              Content Scheduler
            </h1>
            <p className="text-muted-foreground">
              View and manage your scheduled posts
            </p>
          </div>
          <Link href="/posts/create">
            <Button className="gap-2" data-testid="button-schedule-post">
              <Plus className="w-4 h-4" />
              Schedule Post
            </Button>
          </Link>
        </div>

        {/* Calendar */}
        <Card className="glass-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                data-testid="button-prev-month"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date())}
                data-testid="button-today"
              >
                Today
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                data-testid="button-next-month"
              >
                Next
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground" data-testid="loading-calendar">
              Loading calendar...
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center font-semibold p-2 text-sm text-muted-foreground">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {daysInMonth.map((day) => {
                const posts = getPostsForDay(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <Card
                    key={day.toString()}
                    className={`min-h-24 p-2 ${isToday ? 'border-primary' : ''} hover-elevate`}
                    data-testid={`calendar-day-${format(day, 'yyyy-MM-dd')}`}
                  >
                    <div className="text-sm font-semibold mb-1">
                      {format(day, 'd')}
                    </div>
                    <div className="space-y-1">
                      {posts.slice(0, 2).map((post) => (
                        <Link
                          key={post.id}
                          href={`/posts/${post.id}`}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs w-full justify-start truncate cursor-pointer"
                            data-testid={`post-badge-${post.id}`}
                          >
                            {format(parseISO(post.scheduledAt!.toString()), 'HH:mm')} {post.content?.substring(0, 15)}...
                          </Badge>
                        </Link>
                      ))}
                      {posts.length > 2 && (
                        <p className="text-xs text-muted-foreground">
                          +{posts.length - 2} more
                        </p>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </Card>

        {/* Upcoming Posts List */}
        <Card className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Posts</h2>
          {scheduledPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="empty-scheduled">
              <CalendarIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No scheduled posts</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scheduledPosts.slice(0, 5).map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover-elevate" data-testid={`upcoming-post-${post.id}`}>
                    <div className="flex-1">
                      <p className="font-medium truncate">{post.content}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.scheduledAt && format(parseISO(post.scheduledAt.toString()), 'MMM d, yyyy • HH:mm')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {post.platforms.map((platform) => (
                        <Badge key={platform} variant="outline">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
