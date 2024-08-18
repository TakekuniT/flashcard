import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import dotenv from 'dotenv';

dotenv.config();

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards on the given topic or content. Follow these guides:
Front: Pose a clear question, term, or prompt. Ensure it encourages active recall and relates directly to the answer.

Back: Provide a concise answer or explanation, with examples or hints if helpful. Keep it simple and focused.

Design: Use readable fonts, clear layouts, and highlight key points. Consistency across all flashcards is key.

Variety: Mix question types (e.g., multiple-choice, true/false) and include visuals if they aid understanding.

Customization: Tailor content to the user’s needs, focusing on areas that need improvement or are likely to be tested.

Feedback: Encourage regular review and self-assessment to reinforce learning.

Generation: Only Generate 10 flashcards.

Only Generate 10 flashcards.

Return in the following JSON format:
{
    "flashcards": [{
        "front": str,
        "back": str,
    }]
}
`

export async function POST(req){
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const data = await req.text();

    const completion = await groq.chat.completions.create({
        messages: [
          {role: 'system', content: systemPrompt},
          {role: 'user', content: data},
        ],
        model: "llama3-8b-8192",
        response_format: {type: 'json_object'}
      });

      const flashcards = JSON.parse(completion.choices[0].messages.content);
      return NextResponse.json(flashcards.flashcards);
    
 
}