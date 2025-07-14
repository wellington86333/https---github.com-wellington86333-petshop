// src/ai/flows/suggest-deals.ts
'use server';
/**
 * @fileOverview A flow that suggests deals based on a text prompt describing user interests.
 *
 * - suggestDealsFromPrompt - A function that handles the deal suggestion process.
 * - SuggestDealsFromPromptInput - The input type for the suggestDealsFromPrompt function.
 * - SuggestDealsFromPromptOutput - The return type for the suggestDealsFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDealsFromPromptInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the user interests.'),
  deals: z.string().describe('A JSON string of available deals.'),
});
export type SuggestDealsFromPromptInput = z.infer<typeof SuggestDealsFromPromptInputSchema>;

const SuggestDealsFromPromptOutputSchema = z.array(z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link: z.string(),
})).describe('An array of deals relevant to the user prompt.');
export type SuggestDealsFromPromptOutput = z.infer<typeof SuggestDealsFromPromptOutputSchema>;

export async function suggestDealsFromPrompt(input: SuggestDealsFromPromptInput): Promise<SuggestDealsFromPromptOutput> {
  return suggestDealsFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDealsFromPrompt',
  input: {
    schema: SuggestDealsFromPromptInputSchema,
  },
  output: {
    schema: SuggestDealsFromPromptOutputSchema,
  },
  prompt: `You are an AI assistant specializing in suggesting deals based on user interests.

  The user is interested in: {{{prompt}}}

  Here are the available deals in JSON format:
  {{{deals}}}

  Suggest deals that are most relevant to the user's interest. Return the deals in JSON array format.
  Each element of the array should have fields title, description, image, and link.
  Only return deals from the above list.
`,
});

const suggestDealsFromPromptFlow = ai.defineFlow(
  {
    name: 'suggestDealsFromPromptFlow',
    inputSchema: SuggestDealsFromPromptInputSchema,
    outputSchema: SuggestDealsFromPromptOutputSchema,
  },
  async input => {
    try {
      // Attempt to parse the deals string into a JSON object.
      JSON.parse(input.deals);
    } catch (e: any) {
      throw new Error("Deals must be a valid JSON string.");
    }

    const {output} = await prompt(input);
    return output!;
  }
);
