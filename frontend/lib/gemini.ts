import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Using gemini-1.5-flash for faster responses
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

