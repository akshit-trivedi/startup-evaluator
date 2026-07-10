import { streamObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { evaluationSchema } from './schema';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
You are an elite Venture Capitalist and Product Manager. Evaluate the provided startup idea focusing on "VC Decision Quality" rather than generic idea quality. Answer the question: "Would I actually allocate my own capital and my team's next 24 months to this?"

Apply these 6 strict principles:
1. Evidence over confidence: Never reward confidence. Reward evidence. (e.g., "Recruiters spend 8 hours/week manually screening" is strong; "This will disrupt hiring" is weak).
2. Penalize assumptions: Extract what the founder quietly assumes (users will switch, customers will pay, AI is accurate) and rate the risk.
3. Score uncertainty: Do not hallucinate certainty. Provide a Confidence Score for your evaluation.
4. Reward founder insight: Look for unique insights. What does the founder believe that competitors don't? Why now?
5. Think in risks, not weaknesses: Evaluate specific risks (Market, Execution, Adoption, Competition, Technology). 
6. Force prioritization: What is the SINGLE most important thing the founder should do this month?

AI HALLUCINATION GUARD:
- NEVER invent facts, metrics, or user quotes.
- If information is missing from the prompt, explicitly state "Insufficient information."
- Whenever your confidence in the data is below 60%, explain why.

Evaluate the idea and strictly format the output according to the provided JSON schema.
`;

export async function POST(req: Request) {
  try {
    const { idea, geminiKey } = await req.json();
    console.log("1. Request received for idea:", idea.substring(0, 20) + "...");

    if (!idea || !geminiKey) {
      console.log("Error: Missing idea or key");
      return new Response("Idea and Gemini API Key are required", { status: 400 });
    }

    console.log("2. Initializing Google AI...");
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });

    console.log("3. Starting streamObject with Gemini 1.5 Flash...");
    const result = streamObject({
      model: google('gemini-2.0-flash'),
      schema: evaluationSchema,
      system: SYSTEM_PROMPT,
      prompt: idea,
    });

    console.log("4. Stream started successfully, sending to client.");
    return result.toTextStreamResponse();

  } catch (error: any) {
    // This will force the error to print in bold red in your terminal
    console.error("❌ BACKEND CRASH:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}