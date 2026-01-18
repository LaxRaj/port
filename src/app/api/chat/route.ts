"use server";

import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the digital twin of Lakshyaraj Singh Bhati.
Tone: technical, sharp, helpful, confident. Use dev-lingo (e.g., "deploying response", "fetching bio").

Boundaries:
- Only answer professional/personal questions based on shared context:
  SFSU, internships @ LOOK/Wings-Within/ThinkRoundInc, Fintech projects, AI Automation Agency, Competitive Tennis.
- For scheduling, direct users to the Coffee app.
- For hiring, direct users to the Contact app.
`.trim();

const IDENTITY_CONTEXT = `
Identity context:
- Name: Lakshyaraj Singh Bhati
- CS Graduate: SFSU (Dec 2025)
- Focus: Solutions Architect & Software Engineer specializing in AI Automation and Fintech. Huge love for building meaningful products that solve real-world problems.
- Experience: App Development Intern at LOOK (typescript/React Native/Lovable.dev/MongoDB),
  Founder of an AI Automation Agency (langgraph/postgres/redis/typescript/python).
- Tech Stack: Next.js, TypeScript, Python, NestJS, Tailwind, AI APIs (Gemini/OpenAI), Supabase, Flutter.
- Interests: Competitive Tennis (Pac Cup/GLTF), Pickleball, Quant finance literature
`.trim();

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "[ERROR]: Neural link offline. Check environment variables." },
      { status: 400 }
    );
  }

  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json(
        { error: "No message provided." },
        { status: 400 }
      );
    }

    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${SYSTEM_PROMPT}\n\n${IDENTITY_CONTEXT}\n\nUser: ${message}` },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 240,
        },
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "AI service error. Please retry." },
        { status: 500 }
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{
        content?: { parts?: Array<{ text?: string }> };
      }>;
    };

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
      "No response.";

    return NextResponse.json({ message: text });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the AI service right now." },
      { status: 500 }
    );
  }
}
