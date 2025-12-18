
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCareerAdvice = async (skills: string[], interests: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a senior Navy career counselor, suggest the best branch for a candidate with these skills: ${skills.join(', ')} and these interests: ${interests}. 
      Return the response in a structured format: 
      1. Recommended Branch (from Surface, Submarine, Aviation, Special Ops, Engineering, Medical)
      2. Reasoning
      3. A motivational 'call to action'. 
      Be professional, patriotic, and concise.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The Admiral is currently unavailable. Please try again later.";
  }
};
