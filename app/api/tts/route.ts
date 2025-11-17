import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // TODO: Integrate dengan Piper TTS backend
    // Untuk sekarang, return placeholder URL
    // Di production, ini akan call TTS service dan return audio URL
    
    // Simulasi: generate audio URL dari TTS service
    const audioUrl = `/api/tts/generate?text=${encodeURIComponent(text)}`;

    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}

