import React, { useState } from 'react';
import { Habit } from '../types';
import { generateHabitAdvice } from '../services/geminiService';
import { Bot, Sparkles, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface AICoachProps {
  habits: Habit[];
}

interface AIAnalysis {
  status: string;
  powerHabit: { name: string; count: number };
  growthOpportunity: { name: string; count: number };
  tips: string[];
}

export const AICoach: React.FC<AICoachProps> = ({ habits }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateHabitAdvice(habits);
      setAnalysis(result);
    } catch (err) {
      setError("Failed to generate insights. Ensure API Key is configured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Sparkles className="text-yellow-400" />
            Me Supreme AI Coach
          </h2>
          <p className="text-indigo-200 mb-8 max-w-xl">
            Leverage Gemini 3 to analyze your habit patterns, identify weak spots, and generate actionable "Supreme" advice to optimize your routine.
          </p>
          
          {!analysis && !loading && (
            <button 
              onClick={handleAnalyze}
              className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2 group"
            >
              <Bot size={20} />
              Generate Analysis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          
          {loading && (
            <div className="flex items-center gap-3 text-indigo-200">
              <Loader2 className="animate-spin" /> Analyzing your discipline patterns...
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 flex items-center gap-2 mb-6">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {analysis && (
        <div className="space-y-6 animate-fade-in">
          {/* Status Banner */}
          <div className="bg-white p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Supreme Status</h3>
            <p className="text-xl font-medium text-slate-800 leading-relaxed">
              "{analysis.status}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Power Habit */}
            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
              <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles size={16} /> Power Habit
              </h3>
              <div className="text-2xl font-bold text-slate-800 mb-1">{analysis.powerHabit.name}</div>
              <p className="text-emerald-700 text-sm">Your strongest routine.</p>
            </div>

            {/* Growth Opportunity */}
            <div className="bg-rose-50 p-6 rounded-xl border border-rose-100">
              <h3 className="text-sm font-bold text-rose-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertCircle size={16} /> Growth Opportunity
              </h3>
              <div className="text-2xl font-bold text-slate-800 mb-1">{analysis.growthOpportunity.name}</div>
              <p className="text-rose-700 text-sm">Needs more attention.</p>
            </div>
          </div>

          {/* Actionable Tips */}
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Actionable Directives</h3>
            <div className="space-y-4">
              {analysis.tips.map((tip, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-slate-700 pt-1">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};