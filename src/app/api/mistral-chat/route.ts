import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    const apiKey = process.env.MISTRAL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "Mistral API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI assistant for Sloth, an AI-powered web development platform. You have knowledge about:

PLATFORM INFORMATION:
- Sloth is an AI-powered platform that helps users create web applications through natural language descriptions
- Users can build apps like Netflix clones, admin dashboards, kanban boards, file managers, YouTube clones, store pages, Airbnb clones, and Spotify clones
- The platform uses AI to generate complete, functional code using modern frameworks like React, Next.js, and Tailwind CSS
- Features include live code editor, instant preview, project management, and code export

SUBSCRIPTION PLANS (BDT prices for Bangladesh users):
- Basic: ৳599/month ($4.99 USD) - 50K tokens, ideal for hobbyists
- Starter: ৳1199/month ($9.99 USD) - 120K tokens, for professionals
- Pro: ৳2399/month ($19.99 USD) - 2.5M tokens, most popular, includes access to Anthropic models (Claude)
- Unlimited: ৳5999/month ($49.99 USD) - Unlimited tokens, for power users and teams

FEATURES:
- Free tier: Access to Gemini models
- Pro tier: Access to Anthropic models (Claude)
- All plans include unlimited projects, code export, and 24/7 support
- Live development environment with instant preview
- Secure hosting with 99.9% uptime guarantee
- Project management and version control

HOW TO USE:
1. Describe your app idea in natural language
2. AI generates complete, production-ready code
3. Edit and customize using the live code editor
4. Deploy or export your code

FOUNDERS:
- Initially founded by Mahatir Ahmed Tusher

SOURCE CODE:
- Available on GitHub: https://github.com/Mahatir-Ahmed-Tusher/Sloth
- Open source project with community contributions welcome

Be helpful, friendly, and provide accurate information about Sloth. If asked about technical details not covered above, provide general guidance about web development best practices.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mistral API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in Mistral chat:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}