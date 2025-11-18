import { NextRequest, NextResponse } from 'next/server';

/**
 * Speech-to-Text API endpoint
 * Converts audio blob to text using OpenAI Whisper API
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const language = formData.get('language') as string || 'id'; // Default to Indonesian

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      // Fallback: Return a placeholder response
      // In production, you should use a proper STT service
      console.warn('OPENAI_API_KEY not configured. Using placeholder response.');
      return NextResponse.json({
        text: '[Audio transcription unavailable - please configure OPENAI_API_KEY]',
        language: language,
        duration: 0,
        method: 'placeholder',
      });
    }

    // Call OpenAI Whisper API
    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile);
    whisperFormData.append('model', 'whisper-1');
    whisperFormData.append('language', language);
    whisperFormData.append('response_format', 'json');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Whisper API error:', errorData);

      return NextResponse.json(
        {
          error: 'Failed to transcribe audio',
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      text: data.text,
      language: data.language || language,
      duration: data.duration || 0,
      method: 'whisper',
    });

  } catch (error) {
    console.error('Speech-to-text error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process audio',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to check if STT is configured
 */
export async function GET() {
  const isConfigured = !!process.env.OPENAI_API_KEY;

  return NextResponse.json({
    configured: isConfigured,
    provider: isConfigured ? 'openai-whisper' : 'none',
    supportedLanguages: ['id', 'en', 'jv', 'su'], // Indonesian, English, Javanese, Sundanese
  });
}
