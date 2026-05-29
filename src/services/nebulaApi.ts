import type { Satellite } from "../types/satellite";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function queryNebulaAI(
  history: Message[],
  sats: Satellite[]
): Promise<string> {
  const systemPrompt = `You are the NEBULA AI Predictive Engine — an advanced aerospace AI aboard the PROJECT NEBULA autonomous orbital monitoring platform, year 2084.

Current fleet status:
${sats.map(s => `- ${s.name} (${s.id}): ${s.status}, Battery ${s.battery}%, Signal ${s.signal}%, Alt ${s.alt}km`).join("\n")}

You speak with technical precision. Use aerospace terminology. Keep responses focused, max 4 paragraphs.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: history,
    }),
  });

  if (!res.ok) throw new Error("API request failed");

  const data = await res.json();
  return data.content?.[0]?.text ?? "TRANSMISSION ERROR — AI ENGINE RECONNECTING";
}