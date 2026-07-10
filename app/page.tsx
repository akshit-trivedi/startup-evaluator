"use client";
import { useState, useEffect } from "react";
import { useObject } from "@ai-sdk/react";
import { evaluationSchema } from "./api/evaluate/schema";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [authError, setAuthError] = useState(false);
  const [geminiKey, setGeminiKey] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { object, submit, isLoading, error } = useObject({
    api: "/api/evaluate",
    schema: evaluationSchema,
    onFinish: ({ object }) => {
      // If the stream finishes but the object is empty, the API key failed mid-stream
      if (!object || !object.executiveSummary) {
        setAuthError(true);
      }
    },
    onError: () => {
      setAuthError(true);
    }
  });

  // Automatically set theme based on time of day (6 PM to 6 AM = Dark Mode)
  useEffect(() => {
    setMounted(true);
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false); // Reset error state on new attempt
    submit({ idea, geminiKey: geminiKey.trim() });
  };

  // Prevent hydration mismatch by not rendering until the client checks the time
  if (!mounted) return null;

  // Dynamic Theme Variables
  const themeBg = isDark ? "bg-slate-900/40 border-slate-800/80" : "bg-white/60 border-slate-200 shadow-xl";
  const cardBg = isDark ? "bg-slate-900/60 border-slate-800" : "bg-white/90 border-slate-200 shadow-lg";
  const inputBg = isDark ? "bg-slate-950/40 border-slate-700/60 text-slate-100 placeholder-slate-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400";
  const textMuted = isDark ? "text-slate-400" : "text-slate-500";
  const textBase = isDark ? "text-slate-200" : "text-slate-700";
  const textHeading = isDark ? "text-white" : "text-slate-900";
  const innerCardBg = isDark ? "bg-slate-950/40 border-slate-800/50" : "bg-slate-50 border-slate-200";

  return (
    <main className={`relative min-h-screen transition-colors duration-700 p-8 font-sans pb-24 overflow-x-hidden ${isDark ? 'bg-slate-950 text-slate-50 selection:bg-blue-500/30' : 'bg-slate-50 text-slate-900 selection:bg-blue-200'}`}>
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg ${
          isDark ? 'bg-slate-800/80 text-yellow-400 border border-slate-700' : 'bg-white/80 text-slate-800 border border-slate-200'
        }`}
        title="Toggle Theme"
      >
        {isDark ? '☀️' : '🌙'}
      </button>

      {/* Dynamic Background Patterns */}
      <div className={`absolute inset-0 z-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none transition-opacity duration-700 ${
        isDark
          ? 'bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] opacity-100'
          : 'bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] opacity-60'
      }`} />
      
      {/* Ambient Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
            Startup Idea VC Evaluator
          </h1>
          <p className={`${textMuted} text-lg font-medium transition-colors duration-500`}>
            Evidence over confidence. Real VC decision quality.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className={`${themeBg} backdrop-blur-xl border p-8 rounded-3xl transition-colors duration-500 space-y-6`}>
          <div className="space-y-2">
            <div className="flex justify-between items-end mb-2">
              <label className={`text-sm font-semibold ${textBase} ml-2`}>The Pitch</label>
              <button 
                type="button" 
                onClick={() => setIdea("We are building an AI-powered automated scheduling assistant for dental clinics. Dentists lose 15% of daily revenue to no-shows. Our tool integrates with their existing calendar, calls patients via natural voice AI to confirm or reschedule, and charges a flat $199/month. We have 3 clinics in beta right now.")}
                className="text-xs text-blue-500 hover:text-blue-400 transition-colors mr-2 font-medium"
              >
                Auto-fill example pitch ✨
              </button>
            </div>
            <textarea
              className={`w-full p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all min-h-[140px] border ${inputBg}`}
              placeholder="Describe your startup (Include available evidence, metrics, or unique insights)..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${textBase} ml-2`}>API Key (OpenAI or Gemini)</label>
            <input
              type="password"
              className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all border ${inputBg}`}
              placeholder="sk-... or AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              required
            />
            <p className={`text-xs ${textMuted} mt-2 ml-2 flex items-center gap-1`}>
  <span>🔒</span> Your key is never stored or logged. It is sent directly to the LLM provider.
</p>
          </div>
{/* Error Banner */}
          {(error || authError) && (
            <div className="p-4 bg-red-950/30 border border-red-900/50 rounded-xl text-red-400 text-sm font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <span className="text-xl">⚠️</span>
              <p>
                Authentication Failed: Please ensure you entered a valid, active API key with available credits.
              </p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold text-lg 
                       transition-all duration-300 transform 
                       hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(79,70,229,0.4)] hover:cursor-pointer 
                       active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <span className="animate-pulse">Running VC Diagnostics...</span>
              ) : (
                <>
                  Generate Investment Memo
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </>
              )}
            </span>
          </button>
        </form>

        {/* Dashboard UI */}
        {(object || isLoading) && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Executive Summary Card */}
            <div className={`${cardBg} backdrop-blur-md border p-8 rounded-3xl transition-colors duration-500 grid grid-cols-1 md:grid-cols-4 gap-8`}>
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-xs uppercase font-bold text-blue-500 tracking-widest mb-6">Executive Summary</h2>
                <div className="flex gap-12">
                  <div>
                    <p className={`text-sm ${textMuted} font-medium mb-1`}>Score</p>
                    <p className={`text-6xl font-black ${textHeading}`}>{object?.executiveSummary?.overallScore || "--"}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${textMuted} font-medium mb-1`}>AI Confidence</p>
                    <p className={`text-6xl font-black ${textHeading}`}>{object?.executiveSummary?.confidenceScore || "--"}<span className={`text-3xl ${textMuted}`}>%</span></p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col justify-center space-y-4">
                <div className={`${innerCardBg} p-4 rounded-xl border transition-colors duration-500`}>
                  <p className={`text-xs ${textMuted} uppercase tracking-wider mb-1`}>VC Verdict</p>
                  <p className="font-bold text-xl text-emerald-500">{object?.executiveSummary?.investmentVerdict || "Analyzing..."}</p>
                </div>
                <div className={`${innerCardBg} p-4 rounded-xl border transition-colors duration-500`}>
                  <p className={`text-xs ${textMuted} uppercase tracking-wider mb-1`}>PM Verdict</p>
                  <p className="font-bold text-xl text-blue-500">{object?.executiveSummary?.productVerdict || "Analyzing..."}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Investment Memo */}
              <div className={`${cardBg} backdrop-blur-md border p-8 rounded-3xl transition-colors duration-500`}>
                <h3 className={`font-bold text-xl ${textHeading} mb-4 flex items-center gap-2`}>
                  <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
                  Investment Memo
                </h3>
                <p className={`font-semibold ${textBase} text-lg leading-relaxed`}>{object?.investmentMemo?.oneLineSummary}</p>
                <p className={`text-md ${textMuted} mt-6 italic border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-300'} pl-4`}>"{object?.investmentMemo?.ifIWereThePartner}"</p>
                
                <div className="mt-8 grid grid-cols-1 gap-6">
                  <div className={`${isDark ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-200'} border p-5 rounded-2xl transition-colors duration-500`}>
                    <h4 className="text-xs uppercase font-bold text-emerald-500 tracking-wider mb-3">Why It Could Be Big</h4>
                    <ul className={`text-sm ${textBase} space-y-2`}>
                      {object?.investmentMemo?.whyItCouldBeBig?.map((item, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">•</span> {item}</li>)}
                    </ul>
                  </div>
                  <div className={`${isDark ? 'bg-rose-950/20 border-rose-900/30' : 'bg-rose-50 border-rose-200'} border p-5 rounded-2xl transition-colors duration-500`}>
                    <h4 className="text-xs uppercase font-bold text-rose-500 tracking-wider mb-3">Why It Might Fail</h4>
                    <ul className={`text-sm ${textBase} space-y-2`}>
                      {object?.investmentMemo?.whyItMightFail?.map((item, i) => <li key={i} className="flex gap-2"><span className="text-rose-500">•</span> {item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              {/* PM Recommendations & Assumptions */}
              <div className="space-y-8">
                <div className={`${cardBg} backdrop-blur-md border p-8 rounded-3xl transition-colors duration-500`}>
                  <h3 className={`font-bold text-xl ${textHeading} mb-6 flex items-center gap-2`}>
                    <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
                    PM Execution Plan
                  </h3>
                  <div className="space-y-4">
                    <div className={`${innerCardBg} p-4 rounded-xl border transition-colors duration-500`}>
                      <p className={`text-xs ${textMuted} uppercase tracking-wider mb-1`}>Next Priority</p>
                      <p className={`text-sm font-medium ${textBase}`}>{object?.executiveSummary?.highestPriorityNextStep}</p>
                    </div>
                    <div className={`${innerCardBg} p-4 rounded-xl border transition-colors duration-500`}>
                      <p className={`text-xs ${textMuted} uppercase tracking-wider mb-1`}>Suggested MVP</p>
                      <p className={`text-sm font-medium ${textBase}`}>{object?.pmRecommendations?.suggestedMVP}</p>
                    </div>
                    <div className={`${innerCardBg} p-4 rounded-xl border transition-colors duration-500`}>
                      <p className={`text-xs ${textMuted} uppercase tracking-wider mb-1`}>Success Metrics</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {object?.pmRecommendations?.successMetrics?.map((metric, i) => (
                          <span key={i} className={`${isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200'} border px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-500`}>
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${cardBg} backdrop-blur-md border p-8 rounded-3xl overflow-hidden transition-colors duration-500`}>
                  <h3 className={`font-bold text-xl ${textHeading} mb-6 flex items-center gap-2`}>
                    <span className="w-2 h-6 bg-amber-500 rounded-full"></span>
                    Critical Assumptions
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} ${textMuted}`}>
                          <th className="px-2 py-3 font-semibold">Assumption</th>
                          <th className="px-2 py-3 font-semibold">Confidence</th>
                          <th className="px-2 py-3 font-semibold">Risk</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800/40' : 'divide-slate-100'}`}>
  {object?.criticalAssumptions?.map((item, i) => (
    <tr key={i} className={`${isDark ? 'hover:bg-slate-800/20' : 'hover:bg-slate-50'} transition-colors`}>
      <td className={`px-2 py-4 ${textBase} font-medium`}>{item?.assumption || "..."}</td>
      <td className={`px-2 py-4 ${textMuted}`}>{item?.confidence || "..."}</td>
      <td className="px-2 py-4">
        {item?.riskLevel && (
          <span className={`px-2 py-1 rounded-md text-xs font-bold ${
            item?.riskLevel === 'High' ? (isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-700') :
            item?.riskLevel === 'Medium' ? (isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700') :
            (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700')
          }`}>
            {item?.riskLevel}
          </span>
        )}
      </td>
    </tr>
  ))}
</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}