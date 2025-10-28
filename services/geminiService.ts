
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, Task, Priority, TaskStatus } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const wiselySystemInstruction = `You are Wisely, a friendly, intelligent, and slightly witty AI productivity assistant for the app Productiwise. Your role is to be a mentor, data analyst, and accountability partner.
- Your personality is encouraging and insightful.
- When users ask for help, provide clear, actionable advice.
- When asked to add a task, you MUST use the 'addTask' tool. Do not create tasks in plain text.
- For general conversation, be helpful and concise.
- Your tagline is "Plan Wisely. Act Productively."
`;

export async function getWiselyResponse(history: ChatMessage[]): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: wiselySystemInstruction,
      },
      history: history.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
    });

    const lastMessage = history[history.length - 1];
    const response = await chat.sendMessage({ message: lastMessage.text });
    return response.text;
  } catch (error) {
    console.error("Error getting Wisely response:", error);
    return "I seem to be having trouble connecting. Please try again later.";
  }
}

export async function extractTaskFromText(text: string): Promise<Partial<Task> | null> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Extract the task details from this text: "${text}". The user might not provide all details. Make reasonable assumptions for missing information, like setting a deadline for tomorrow if not specified.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: 'The main goal of the task.' },
                        description: { type: Type.STRING, description: 'A brief description of the task.' },
                        deadline: { type: Type.STRING, description: 'The due date in YYYY-MM-DD format.' },
                        priority: { type: Type.STRING, description: 'Priority level: Low, Medium, or High.' },
                    }
                }
            }
        });
        const jsonText = response.text.trim();
        const taskData = JSON.parse(jsonText);

        return {
            ...taskData,
            status: TaskStatus.Todo,
            tags: ['AI-generated'],
        };

    } catch (error) {
        console.error("Error extracting task:", error);
        return null;
    }
}


export async function getTextFromImage(base64Image: string, mimeType: string): Promise<string> {
    try {
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "Extract the handwritten or printed text from this image of a sticky note. Format it clearly."
        };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error getting text from image:", error);
        return "Sorry, I couldn't read the text from that image. Please try again.";
    }
}
