
'use client';

import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { getAISuggestions } from '@/app/actions';
import type { Deal } from '@/lib/types';
import { DealList } from './DealList';

export function AIPrompt() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Deal[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    setIsDialogOpen(true);

    try {
      const suggestions = await getAISuggestions(prompt);
      setResults(suggestions);
    } catch (err) {
      setError('An error occurred while fetching suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'gifts for dad'"
          className="bg-background/80"
          aria-label="AI Deal Finder Prompt"
        />
        <Button type="submit" disabled={loading || !prompt.trim()} variant="default">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          <span className="sr-only sm:not-sr-only sm:ml-2">Find</span>
        </Button>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[80vw] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              AI-Powered Suggestions
            </DialogTitle>
            <DialogDescription>
              Based on your prompt: "{prompt}"
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-4 -mr-4">
            {loading && (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
              </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {results && (
              <>
                {results.length > 0 ? (
                  <DealList deals={results} />
                ) : (
                  <p className="text-center text-muted-foreground py-16">
                    No matching deals found. Try a different search!
                  </p>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
