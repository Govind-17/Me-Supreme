import { GoogleGenAI } from "@google/genai";
import { Habit } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateHabitAdvice = async (habits: Habit[]) => {
  try {
    const ai = getAiClient();
    
    // Prepare a summary of the user's habits for the prompt
    const habitSummary = habits.map(h => ({
      name: h.name,
      goal: h.monthlyGoal,
      completedCount: h.completedDates.length,
      category: h.category,
      successRate: Math.round((h.completedDates.length / Math.max(1, h.monthlyGoal)) * 100) + '%'
    }));

    const prompt = `
      You are an expert habit coach named "Me Supreme Coach". 
      Analyze the following habit tracking data for the user.
      
      Data: ${JSON.stringify(habitSummary, null, 2)}
      
      Please provide:
      1. A brief "Supreme Status" assessment of their overall discipline (Motivating but honest).
      2. Identify the "Power Habit" (the one they are doing best at).
      3. Identify the "Growth Opportunity" (the one they are struggling with).
      4. Three specific, actionable, 1-sentence tips to improve their consistency based on this specific data.
      
      Format the response as JSON with keys: "status", "powerHabit", "growthOpportunity", "tips" (array of strings).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    } else {
      throw new Error("No response from AI");
    }
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
};