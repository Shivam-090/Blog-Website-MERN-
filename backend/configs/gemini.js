import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
                role: "user",
                parts: [{ text: prompt }]
            }]
        });
        return response.candidates[0].content.parts[0].text;
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate content');
    }
}

export default main;