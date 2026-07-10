import { z } from "zod";

export const evaluationSchema = z.object({
  executiveSummary: z.object({
    overallScore: z.number().describe("Score 0-100"),
    confidenceScore: z.number().describe("Confidence in this evaluation 0-100%"),
    investmentVerdict: z.enum(["Strong Invest", "Invest", "Needs Validation", "Pass"]),
    productVerdict: z.enum(["Build immediately", "Prototype first", "Customer discovery first", "Run validation experiments", "Don't build yet"]),
    primaryStrength: z.string(),
    biggestRisk: z.string(),
    highestPriorityNextStep: z.string(),
  }),
  criticalAssumptions: z.array(z.object({
    assumption: z.string(),
    confidence: z.enum(["Low", "Medium", "High"]),
    riskLevel: z.enum(["Low", "Medium", "High"]),
  })).describe("Implicit things the founder is assuming to be true"),
  investmentMemo: z.object({
    oneLineSummary: z.string(),
    whyItCouldBeBig: z.array(z.string()).length(3),
    whyItMightFail: z.array(z.string()).length(3),
    unknowns: z.array(z.string()),
    ifIWereThePartner: z.string().describe("One paragraph synthesizing the VC perspective"),
  }),
  pmRecommendations: z.object({
    suggestedMVP: z.string(),
    successMetrics: z.array(z.string()),
    biggestUnknown: z.string(),
  })
});