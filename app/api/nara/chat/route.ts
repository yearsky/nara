import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { messages, context } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Prepare system message dengan context
    const systemMessage = {
      role: "system",
      content: context || "Kamu adalah Nara, AI companion yang membantu belajar budaya Indonesia.",
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openRouterApiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Nara.ai",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenRouter error:", error);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const message = data.choices[0]?.message?.content || "Maaf, saya tidak bisa merespons saat ini.";

    // Estimate credits used (1 credit per request untuk sekarang)
    const creditsUsed = 1;

    return NextResponse.json({ message, creditsUsed });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

