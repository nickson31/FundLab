import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Using gemini-2.5-pro (latest model)
console.log("Initializing Gemini Model: gemini-2.5-pro");
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

