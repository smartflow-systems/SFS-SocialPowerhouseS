import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Plus, MoreVertical, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  SiFacebook, 
  SiInstagram, 
  SiX, 
  SiLinkedin, 
  SiTiktok, 
  SiYoutube, 
  SiPinterest 
} from 'react-icons/si';

interface SocialAccount {
  id: string;
  platform: string;
  accountName: string;
  accountId: string;
  isActive: boolean;
  createdAt: Date;
}

const platformIcons: Record<string, any> = {
  facebook: SiFacebook,
  instagram: SiInstagram,
  twitter: SiX,
  linkedin: SiLinkedin,
  tiktok: SiTiktok,
  youtube: SiYoutube,
  pinterest: SiPinterest,
};

const platformColors: Record<string, string> = {
  facebook: 'text-blue-600',
  instagram: 'text-pink-600',
  twitter: 'text-sky-500',
  linkedin: 'text-blue-700',
  tiktok: 'text-black dark:text-white',
  youtube: 'text-red-600',
  pinterest: 'text-red-700',
};

export default function SocialAccounts() {
  const { toast } = useToast();
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [platform, setPlatform] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountId, setAccountId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  // Fetch social accounts
  const { data: accountsData, isLoading } = useQuery<{ accounts: SocialAccount[] }>({
    queryKey: ['/api/social-accounts'],
  });

  const accounts = accountsData?.accounts || [];

  // Connect account mutation
  const connectMutation = useMutation({
    mutationFn: async (data: { platform: string; accountName: string; accountId: string; accessToken: string }) => {
      return await apiRequest('POST', '/api/social-accounts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-accounts'] });
      toast({
        title: 'Account connected',
        description: 'Social account has been connected successfully',
      });
      setConnectDialogOpen(false);
      setPlatform('');
      setAccountName('');
      setAccountId('');
      setAccessToken('');
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to connect account',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async (data: { id: string; isActive: boolean }) => {
      return await apiRequest('PATCH', `/api/social-accounts/${data.id}`, { isActive: data.isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-accounts'] });
      toast({
        title: 'Account updated',
        description: 'Account status has been updated',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to update account',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  // Disconnect account mutation
  const disconnectMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest('DELETE', `/api/social-accounts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-accounts'] });
      toast({
        title: 'Account disconnected',
        description: 'Social account has been disconnected successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to disconnect account',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    },
  });

  const handleConnect = () => {
    if (!platform || !accountName || !accountId || !accessToken) {
      toast({
        title: 'Validation error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    connectMutation.mutate({ platform, accountName, accountId, accessToken });
  };

  const getPlatformIcon = (platformName: string) => {
    const Icon = platformIcons[platformName.toLowerCase()];
    return Icon ? <Icon className={`w-6 h-6 ${platformColors[platformName.toLowerCase()]}`} /> : <Globe className="w-6 h-6" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-social-accounts">
              <Globe className="w-8 h-8 text-primary" />
              Social Accounts
            </h1>
            <p className="text-muted-foreground">
              Connect and manage your social media accounts
            </p>
          </div>
          
          <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-testid="button-connect-account">
                <Plus className="w-4 h-4" />
                Connect Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Connect Social Account</DialogTitle>
                <DialogDescription>
                  Connect a new social media account to your workspace
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger id="platform" data-testid="select-platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="pinterest">Pinterest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    placeholder="@username or Page Name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    data-testid="input-account-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountId">Account ID</Label>
                  <Input
                    id="accountId"
                    placeholder="Platform-specific ID"
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    data-testid="input-account-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accessToken">Access Token</Label>
                  <Input
                    id="accessToken"
                    type="password"
                    placeholder="OAuth access token"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    data-testid="input-access-token"
                  />
                  <p className="text-xs text-muted-foreground">
                    Note: OAuth integration coming soon. For now, enter tokens manually.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConnectDialogOpen(false)}
                  data-testid="button-cancel-connect"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConnect}
                  disabled={connectMutation.isPending}
                  data-testid="button-save-connect"
                >
                  {connectMutation.isPending ? 'Connecting...' : 'Connect Account'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Accounts List */}
        <Card className="glass-card p-6">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="loading-accounts">
              Loading social accounts...
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground" data-testid="empty-accounts">
              <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-semibold mb-2">No social accounts connected</p>
              <p className="text-sm">Connect your first account to start posting across platforms</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card
                  key={account.id}
                  className="p-4 hover-elevate"
                  data-testid={`account-${account.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getPlatformIcon(account.platform)}
                      <div>
                        <p className="font-semibold capitalize" data-testid={`account-platform-${account.id}`}>
                          {account.platform}
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid={`account-name-${account.id}`}>
                          {account.accountName}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-account-actions-${account.id}`}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toggleActiveMutation.mutate({ id: account.id, isActive: !account.isActive })}
                          data-testid={`action-toggle-${account.id}`}
                        >
                          {account.isActive ? (
                            <>
                              <ToggleLeft className="w-4 h-4 mr-2" />
                              Disable
                            </>
                          ) : (
                            <>
                              <ToggleRight className="w-4 h-4 mr-2" />
                              Enable
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => disconnectMutation.mutate(account.id)}
                          className="text-destructive"
                          data-testid={`action-disconnect-${account.id}`}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Disconnect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge variant={account.isActive ? 'default' : 'outline'} data-testid={`account-status-${account.id}`}>
                    {account.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
