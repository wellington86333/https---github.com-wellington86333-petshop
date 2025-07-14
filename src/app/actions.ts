
'use server';

import { suggestDealsFromPrompt } from '@/ai/flows/suggest-deals';
import { deals } from '@/lib/deals';
import type { Deal } from '@/lib/types';
import type { SuggestDealsFromPromptOutput } from '@/ai/flows/suggest-deals';

export async function getAISuggestions(prompt: string): Promise<Deal[]> {
  if (!prompt) {
    return [];
  }

  // The AI flow expects a specific format, let's just pass what it needs
  const dealsForAI = deals.map(({ title, description, image, link }) => ({
    title,
    description,
    image,
    link,
  }));

  try {
    const suggestedDeals: SuggestDealsFromPromptOutput = await suggestDealsFromPrompt({
      prompt,
      deals: JSON.stringify(dealsForAI),
    });

    if (!suggestedDeals || suggestedDeals.length === 0) {
      return [];
    }
    
    // Match the AI output with our original deal objects to retain all data like id, category, etc.
    // Matching by title is a reasonable assumption here.
    const suggestedDealTitles = new Set(suggestedDeals.map(d => d.title));
    const fullDealObjects = deals.filter(d => suggestedDealTitles.has(d.title));

    return fullDealObjects;
  } catch (error) {
    console.error("Error getting AI suggestions:", error);
    // Return empty array or throw a more specific error for the client to handle
    return [];
  }
}
