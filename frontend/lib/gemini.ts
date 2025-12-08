import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Using gemini-1.5-pro for better rate limits (flash-exp has very low free tier quota)
console.log("Initializing Gemini Model: gemini-1.5-pro");
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

