import { NextRequest, NextResponse } from "next/server";

async function openaiTTS(text: string, apiKey: string): Promise<ArrayBuffer> {
  const res = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "tts-1-hd",   // higher quality model
      voice: "nova",        // warm, calm, natural female — ideal for meditation
      input: text,
      speed: 0.9,           // slightly slower for meditative pacing
    }),
  });
  if (!res.ok) throw new Error(`OpenAI TTS ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

async function elevenLabsTTS(text: string, apiKey: string): Promise<ArrayBuffer> {
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel — warm, calm
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_turbo_v2_5",
        voice_settings: { stability: 0.75, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true },
      }),
    }
  );
  if (!res.ok) throw new Error(`ElevenLabs TTS ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

function isConfigured(val: string | undefined) {
  return val && !val.startsWith("your_");
}

export async function POST(req: NextRequest) {
  const { text } = await req.json() as { text: string };
  if (!text?.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  const elevenKey = process.env.ELEVENLABS_API_KEY;

  // Try OpenAI first (slightly cheaper, very natural)
  if (isConfigured(openaiKey)) {
    try {
      const audio = await openaiTTS(text, openaiKey!);
      return new NextResponse(audio, {
        headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=86400" },
      });
    } catch (err) {
      console.error("OpenAI TTS failed:", err);
      // fall through to ElevenLabs
    }
  }

  // Try ElevenLabs second
  if (isConfigured(elevenKey)) {
    try {
      const audio = await elevenLabsTTS(text, elevenKey!);
      return new NextResponse(audio, {
        headers: { "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=86400" },
      });
    } catch (err) {
      console.error("ElevenLabs TTS failed:", err);
    }
  }

  // Neither configured — signal client to use Web Speech fallback
  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}
