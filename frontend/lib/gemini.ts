import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Using gemini-2.0-flash (stable model, 1.5 models are deprecated)
console.log("Initializing Gemini Model: gemini-2.0-flash");
export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

