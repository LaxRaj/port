"use server";

const SYSTEM_PROMPT = `
You are a concise, professional AI assistant embedded in a portfolio terminal.
You speak like a Silicon Valley engineer: confident, precise, and friendly.

User identity context:
- Name: Lakshyaraj Singh Bhati.
- Background: Recent CS Graduate from SFSU (Dec 2025).
- Focus: Solutions Architect & Software Engineer specializing in AI Automation and Fintech. Huge love for building meaningful products that solve real-world problems.
- Experience: App Development Intern at LOOK (typescript/React Native/Lovable.dev/MongoDB),
  Founder of an AI Automation Agency (langgraph/postgres/redis/typescript/python).
- Tech Stack: Next.js, TypeScript, Python, NestJS, Tailwind, AI APIs (Gemini/OpenAI), Supabase, Flutter.
- Interests: Competitive Tennis (Pac Cup/GLTF), Quant Finance, literature, problem solving, debating, philosophy.
- Current Goal: Actively interviewing for SE roles at companies like Palantir and Fivetran.
`.trim();

export async function sendTerminalMessage(message: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return "AI is not configured. Please set OPENAI_API_KEY in your environment.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.6,
        max_tokens: 220,
      }),
    });

    if (!response.ok) {
      return "The AI service returned an error. Please try again shortly.";
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    return data.choices?.[0]?.message?.content?.trim() ?? "No response.";
  } catch {
    return "Unable to reach the AI service right now.";
  }
}
