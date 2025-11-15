import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface UserPreferences {
  userId: string;
  theme: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
}

// Form validation schema
const preferencesFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  timezone: z.string(),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyReports: z.boolean(),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

export default function Preferences() {
  const { toast } = useToast();

  // Fetch preferences
  const { data: preferencesData, isLoading } = useQuery<{ preferences: UserPreferences }>({
    queryKey: ['/api/settings/preferences'],
  });

  const preferences = preferencesData?.preferences;

  // Initialize form
  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      theme: 'dark',
      timezone: 'UTC',
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
    },
    values: preferences ? {
      theme: preferences.theme as 'light' | 'dark' | 'system',
      timezone: preferences.timezone,
      emailNotifications: preferences.emailNotifications,
      pushNotifications: preferences.pushNotifications,
      weeklyReports: preferences.weeklyReports,
    } : undefined,
  });

  // Update preferences mutation
  const updateMutation = useMutation({
    mutationFn: async (data: PreferencesFormValues) => {
      return await apiRequest('PUT', '/api/settings/preferences', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/settings/preferences'] });
      toast({
        title: 'Preferences saved',
        description: 'Your preferences have been updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to save preferences',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: PreferencesFormValues) => {
    updateMutation.mutate(data);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-preferences">
          <h1 className="text-2xl font-bold text-sfs-gold mb-2 flex items-center gap-2">
            <Settings className="w-8 h-8 text-primary" />
            Preferences
          </h1>
          <p className="text-muted-foreground">
            Customize your experience and app behavior
          </p>
        </div>

        {isLoading ? (
          <Card className="glass-card p-6">
            <div className="text-center py-8 text-muted-foreground" data-testid="loading-preferences">
              Loading preferences...
        {/* Appearance */}
        <Card className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme
                </p>
              </div>
              <select className="px-3 py-2 border border-border rounded-lg bg-background">
                <option>Dark</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </div>
          </Card>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Appearance */}
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Appearance</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Theme</FormLabel>
                          <FormDescription>
                            Choose your preferred theme
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[180px]" data-testid="select-theme">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Language & Region */}
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Language & Region</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Timezone</FormLabel>
                          <FormDescription>
                            Set your local timezone
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-[220px]" data-testid="select-timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="UTC">UTC</SelectItem>
                              <SelectItem value="America/New_York">America/New York</SelectItem>
                              <SelectItem value="America/Los_Angeles">America/Los Angeles</SelectItem>
                              <SelectItem value="Europe/London">Europe/London</SelectItem>
                              <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Show more content in less space
                </p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4">Language & Region</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">
                  Select your preferred language
                </p>
              </div>
              <select className="px-3 py-2 border border-border rounded-lg bg-background">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

              {/* Notifications */}
              <Card className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications via email
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-email-notifications"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pushNotifications"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Push Notifications</FormLabel>
                          <FormDescription>
                            Receive push notifications in your browser
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-push-notifications"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
            <div className="flex items-center justify-between">
              <div>
                <Label>Date Format</Label>
                <p className="text-sm text-muted-foreground">
                  Choose how dates are displayed
                </p>
              </div>
              <select className="px-3 py-2 border border-border rounded-lg bg-background">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Content */}
        <Card className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4">Content Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save Drafts</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save drafts while you work
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>

                  <FormField
                    control={form.control}
                    name="weeklyReports"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Weekly Reports</FormLabel>
                          <FormDescription>
                            Get weekly summaries of your activity
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-testid="switch-weekly-reports"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  data-testid="button-save-preferences"
                >
                  {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </Form>
        )}
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="glass-card p-4">
          <h2 className="text-lg font-semibold mb-4">Privacy & Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add extra security to your account
                </p>
              </div>
              <Button variant="outline">Enable</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Share Analytics</Label>
                <p className="text-sm text-muted-foreground">
                  Help us improve by sharing anonymous usage data
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
