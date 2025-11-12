import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import GlassCard from '@/components/Glass/GlassCard';
import GoldenButton from '@/components/Glass/GoldenButton';
import ToneSelector from '@/components/AI/ToneSelector';
import PlatformSelector from '@/components/AI/PlatformSelector';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Copy, Download, Share2, Wand2, CalendarPlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const { toast } = useToast();

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Missing prompt',
        description: 'Please enter a content brief or idea',
        variant: 'destructive',
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: 'No platforms selected',
        description: 'Please select at least one platform',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          tone: selectedTone,
          platforms: selectedPlatforms,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error for missing API key
        if (response.status === 503) {
          toast({
            title: 'OpenAI API Key Required',
            description: data.message || 'Please configure your OpenAI API key in .env file',
            variant: 'destructive',
          });

          // Show helpful message in the content area
          setGeneratedContent('⚠️ OpenAI API Key Not Configured\n\nTo enable AI content generation:\n\n1. Get your API key from https://platform.openai.com/api-keys\n2. Add it to your .env file:\n   OPENAI_API_KEY=sk-your-key-here\n3. Restart the server\n\nOnce configured, you\'ll be able to generate AI-powered content for all your social media platforms!');
          return;
        }

        throw new Error(data.message || 'Failed to generate content');
      }

      setGeneratedContent(data.content || '');

      toast({
        title: 'Content generated!',
        description: 'Your AI content is ready',
      });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: 'Generation failed',
        description: error.message || 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard',
    });
  };

  const handleSaveToCalendar = async () => {
    if (!scheduleDate || !scheduleTime) {
      toast({
        title: 'Missing schedule info',
        description: 'Please select a date and time',
        variant: 'destructive',
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: 'No platforms selected',
        description: 'Please select at least one platform',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsSaving(true);

      const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`);

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          content: generatedContent,
          platforms: selectedPlatforms,
          scheduledAt: scheduledAt.toISOString(),
          status: 'scheduled',
          aiGenerated: true,
          tone: selectedTone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save to calendar');
      }

      toast({
        title: 'Saved to Calendar!',
        description: 'Your AI-generated post has been scheduled',
      });

      setIsScheduleOpen(false);
      setScheduleDate('');
      setScheduleTime('');
    } catch (error: any) {
      toast({
        title: 'Failed to save',
        description: error.message || 'Could not save post to calendar',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-sfs-gold mb-2 flex items-center gap-2">
            <Sparkles className="w-8 h-8" />
            AI Content Studio
          </h1>
          <p className="text-sfs-beige/60">
            Generate engaging social media content with AI in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-sfs-gold mb-4">Content Brief</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt" className="text-sfs-beige">
                    What do you want to post about?
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder="Example: Write a post about the benefits of morning meditation for busy professionals..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="mt-2 min-h-32 bg-sfs-brown/20 border-sfs-gold/20 text-sfs-beige placeholder:text-sfs-beige/40"
                  />
                  <p className="text-xs text-sfs-beige/40 mt-1">
                    {prompt.length} characters
                  </p>
                </div>

                <ToneSelector
                  selectedTone={selectedTone}
                  onToneChange={setSelectedTone}
                />

                <PlatformSelector
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                />

                <GoldenButton
                  className="w-full"
                  onClick={handleGenerate}
                  loading={isGenerating}
                  disabled={isGenerating}
                >
                  <Wand2 className="w-5 h-5" />
                  {isGenerating ? 'Generating...' : 'Generate Content'}
                </GoldenButton>
              </div>
            </GlassCard>

            {/* Advanced Options */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-sfs-gold mb-4">Advanced Options</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="keywords" className="text-sfs-beige">
                    Keywords (comma-separated)
                  </Label>
                  <Input
                    id="keywords"
                    placeholder="meditation, wellness, productivity"
                    className="mt-2 bg-sfs-brown/20 border-sfs-gold/20 text-sfs-beige"
                  />
                </div>

                <div>
                  <Label htmlFor="cta" className="text-sfs-beige">
                    Call to Action
                  </Label>
                  <Input
                    id="cta"
                    placeholder="Learn more, Sign up, Shop now..."
                    className="mt-2 bg-sfs-brown/20 border-sfs-gold/20 text-sfs-beige"
                  />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-sfs-gold">Generated Content</h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsScheduleOpen(true)}
                      className="p-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                      title="Save to Calendar"
                    >
                      <CalendarPlus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-sfs-gold/20 hover:bg-sfs-gold/30 text-sfs-gold transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-sfs-gold/20 hover:bg-sfs-gold/30 text-sfs-gold transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-sfs-gold/20 hover:bg-sfs-gold/30 text-sfs-gold transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-sfs-brown/20">
                  <TabsTrigger value="preview" className="data-[state=active]:bg-sfs-gold/20 data-[state=active]:text-sfs-gold">
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="html" className="data-[state=active]:bg-sfs-gold/20 data-[state=active]:text-sfs-gold">
                    HTML
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-96 p-4 rounded-lg bg-sfs-brown/10 border border-sfs-gold/10">
                    {generatedContent ? (
                      <div className="whitespace-pre-wrap text-sfs-beige">
                        {generatedContent}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sfs-beige/40">
                        Generated content will appear here
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="html" className="mt-4">
                  <div className="min-h-96 p-4 rounded-lg bg-sfs-brown/10 border border-sfs-gold/10 font-mono text-sm">
                    {generatedContent ? (
                      <pre className="text-sfs-beige/80">
                        {`<div>\n  ${generatedContent.replace(/\n/g, '\n  ')}\n</div>`}
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-sfs-beige/40">
                        HTML code will appear here
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </GlassCard>

            {/* Variations */}
            {generatedContent && (
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-sfs-gold mb-3">Variations</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-sfs-gold/20 hover:border-sfs-gold/40 hover:bg-sfs-gold/5 cursor-pointer transition-colors"
                    >
                      <p className="text-sm text-sfs-beige/80">
                        Variation {i} - Click to load
                      </p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle>Schedule Post to Calendar</DialogTitle>
              <DialogDescription>
                Choose when to publish this AI-generated content
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-date">Date</Label>
                  <Input
                    type="date"
                    id="schedule-date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="schedule-time">Time</Label>
                  <Input
                    type="time"
                    id="schedule-time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Platforms (selected in AI Studio)</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedPlatforms.map((platform) => (
                    <div
                      key={platform}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm border border-primary/30"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <Button
                  onClick={handleSaveToCalendar}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-4 h-4 mr-2" />
                      Save to Calendar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsScheduleOpen(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
