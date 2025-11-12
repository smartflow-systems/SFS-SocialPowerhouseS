import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Loader2, Plus, Sparkles, Trash2, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import type { AITemplate } from '@shared/schema';

export default function ContentLibrary() {
  const [search, setSearch] = useState('');
  const { toast} = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  const { data, isLoading } = useQuery<{ templates: AITemplate[] }>({
    queryKey: ['/api/templates'],
    queryFn: async () => {
      const res = await fetch('/api/templates', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch templates');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (templateId: string) => {
      await apiRequest('DELETE', `/api/templates/${templateId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/templates'] });
      toast({
        title: 'Template deleted',
        description: 'Template has been removed from your library',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete template',
        variant: 'destructive',
      });
    },
  });

  const templates = data?.templates || [];
  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(search.toLowerCase()) ||
    template.prompt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2" data-testid="heading-content-library">
              <FileText className="w-8 h-8 text-primary" />
              Template Library
            </h1>
            <p className="text-muted-foreground">
              Your saved AI content templates
            </p>
          </div>
          <Button onClick={() => navigate('/ai-studio')} className="gap-2" data-testid="button-create-template">
            <Plus className="w-4 h-4" />
            Create Template
          </Button>
        </div>

        <Card className="glass-card p-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-templates"
            />
          </div>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredTemplates.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {search ? 'No templates found' : 'No templates yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {search ? 'Try a different search term' : 'Create your first AI content template'}
            </p>
            {!search && (
              <Button onClick={() => navigate('/ai-studio')} data-testid="button-create-first-template">
                Create Template
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="glass-card p-6" data-testid={`card-template-${template.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {template.isPublic && (
                      <span title="Public template">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteMutation.mutate(template.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${template.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="font-semibold mb-2" data-testid={`text-template-name-${template.id}`}>{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {template.prompt}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {template.tone}
                  </Badge>
                  {template.category && (
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/ai-studio?template=${template.id}`)}
                    data-testid={`button-use-${template.id}`}
                  >
                    Use Template
                  </Button>
                </div>

                {template.usageCount !== null && template.usageCount > 0 && (
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    Used {template.usageCount} times
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
