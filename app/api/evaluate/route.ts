import { streamObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { evaluationSchema } from './schema';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are an elite Venture Capitalist and Product Manager. Evaluate the provided startup idea focusing on "VC Decision Quality" rather than generic idea quality. Answer the question: "Would I actually allocate my own capital and my team's next 24 months to this?"

Apply these 6 strict principles:
1. Evidence over confidence.
2. Penalize assumptions.
3. Score uncertainty.
4. Reward founder insight.
5. Think in risks, not weaknesses.
6. Force prioritization.

AI HALLUCINATION GUARD:
- NEVER invent facts, metrics, or user quotes.
- If information is missing from the prompt, explicitly state "Insufficient information."
- Whenever your confidence in the data is below 60%, explain why.

Evaluate the idea and strictly format the output according to the provided JSON schema.
`;

export async function POST(req: Request) {
  try {
    const { idea, geminiKey } = await req.json();

    if (!idea || !geminiKey) {
      return new Response("Idea and API Key are required", { status: 400 });
    }

    let result;

    // Smart Detection: Check if the key belongs to OpenAI or Gemini
    if (geminiKey.startsWith('sk-')) {
      // Reviewer provided an OpenAI Key
      const openai = createOpenAI({ apiKey: geminiKey });
      result = streamObject({
        model: openai('gpt-4o-mini'),
        schema: evaluationSchema,
        system: SYSTEM_PROMPT,
        prompt: idea,
      });
    } else {
      // Reviewer provided a Gemini Key
      const google = createGoogleGenerativeAI({ apiKey: geminiKey });
      result = streamObject({
        model: google('gemini-2.0-flash'),
        schema: evaluationSchema,
        system: SYSTEM_PROMPT,
        prompt: idea,
      });
    }

    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error("❌ BACKEND CRASH:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}