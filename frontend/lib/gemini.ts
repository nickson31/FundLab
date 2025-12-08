import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Using gemini-2.0-flash-exp for faster responses and to avoid 404
console.log("Initializing Gemini Model: gemini-2.0-flash-exp");
export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

