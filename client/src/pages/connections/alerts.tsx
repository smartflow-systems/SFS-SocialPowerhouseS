import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-alerts">
            <Bell className="w-8 h-8 text-primary" />
            Alerts
          </h1>
          <p className="text-muted-foreground">
            Manage your notifications and alerts
          </p>
        </div>

        <Card className="glass-card p-12 text-center">
          <Bell className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Alerts Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get notified about important events like scheduled post publishing, engagement milestones, and team activity.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/settings/preferences">
              <Button variant="outline" className="gap-2" data-testid="button-manage-notifications">
                Manage Notifications
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/analytics">
              <Button className="gap-2" data-testid="button-view-analytics">
                View Analytics
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
