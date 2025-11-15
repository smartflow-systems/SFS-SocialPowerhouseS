import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Automation() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-automation">
            <Zap className="w-8 h-8 text-primary" />
            Automation
          </h1>
          <p className="text-muted-foreground">
            Automate your social media workflow
          </p>
        </div>

        <Card className="glass-card p-12 text-center">
          <Zap className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Automation Coming Soon</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Automation features will help you streamline repetitive tasks, auto-respond to messages, and recycle high-performing content.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/ai-studio">
              <Button variant="outline" className="gap-2" data-testid="button-try-ai">
                Try AI Studio
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/posts/create">
              <Button className="gap-2" data-testid="button-create-post">
                Create Post
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
