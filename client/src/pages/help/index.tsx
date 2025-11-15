import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, Book, MessageCircle, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

export default function Help() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-help">
            <HelpCircle className="w-8 h-8 text-primary" />
            Help & Support
          </h1>
          <p className="text-muted-foreground">
            Get help and learn how to use SFS Social PowerHouse
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card p-6 hover-elevate" data-testid="card-docs">
            <Book className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive guides and API references
            </p>
            <Button variant="outline" className="w-full gap-2" disabled>
              View Docs (Coming Soon)
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Card>

          <Card className="glass-card p-6 hover-elevate" data-testid="card-community">
            <MessageCircle className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community and connect with other users
            </p>
            <Button variant="outline" className="w-full gap-2" disabled>
              Join Community (Coming Soon)
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Card>

          <Card className="glass-card p-6 hover-elevate" data-testid="card-support">
            <Mail className="w-12 h-12 mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get help from our support team
            </p>
            <Button variant="outline" className="w-full gap-2" disabled>
              Contact Us (Coming Soon)
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'How do I connect my social media accounts?',
                a: 'Navigate to Connections > Social Accounts and click "Connect Account". OAuth integration coming soon!',
              },
              {
                q: 'Can I schedule posts in advance?',
                a: 'Yes! Go to Posts > Create Post, compose your content, and select a future date and time.',
              },
              {
                q: 'How does AI content generation work?',
                a: 'Our AI Studio uses advanced AI to generate, optimize, and repurpose content. Try different tones and platforms!',
              },
              {
                q: 'Can I invite team members?',
                a: 'Absolutely! Go to Team Members and invite colleagues with different permission levels.',
              },
            ].map((faq, i) => (
              <div key={i} className="border-b pb-4 last:border-0" data-testid={`faq-${i}`}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <div className="space-y-3">
            <Link href="/connections/social-accounts">
              <Button variant="outline" className="w-full justify-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                Connect your social accounts
              </Button>
            </Link>
            <Link href="/ai-studio">
              <Button variant="outline" className="w-full justify-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                Generate your first AI-powered post
              </Button>
            </Link>
            <Link href="/posts/create">
              <Button variant="outline" className="w-full justify-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                Schedule your content
              </Button>
            </Link>
            <Link href="/analytics">
              <Button variant="outline" className="w-full justify-start gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                Track your performance
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
