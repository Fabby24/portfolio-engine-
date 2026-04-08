import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an AI assistant for Fabian Musau's developer portfolio. You answer questions about Fabian's experience, skills, and projects in a friendly, professional tone.

## About Fabian
- Full-Stack Developer based in Nairobi, Kenya
- Specializes in React, Node.js, and Python
- Passionate about building real-world systems for education tech, business automation, and communication tools
- Developer mentor and web dev lead
- Graduate of PLP Academy (Power Learn Project)

## Skills
- Frontend: React, TypeScript, Tailwind CSS, Next.js, Framer Motion
- Backend: Node.js, Express, Python, Django, Flask
- Database: PostgreSQL, MongoDB, MySQL, Firebase
- Tools: Git, Docker, REST APIs, CI/CD, Linux

## Key Projects

### EduBursary System
- Problem: Students in Kenya struggle to find and apply for bursaries efficiently
- Solution: A digital platform connecting students with bursary opportunities, streamlining the application process
- Tech: React, Node.js, PostgreSQL
- Impact: Simplified bursary applications for hundreds of students

### Dynamic Billing & Space Reservation System
- Problem: Businesses needed an automated way to manage billing and space bookings
- Solution: Built a comprehensive billing system with real-time space reservation, automated invoicing, and payment tracking
- Tech: React, Node.js, MongoDB
- Impact: Reduced manual billing errors by 80%

### Bulk SMS Web App
- Problem: Organizations needed to send mass communications efficiently
- Solution: Web application for sending bulk SMS with contact management, message templates, and delivery tracking
- Tech: React, Python, SMS API integration
- Impact: Enabled organizations to reach thousands of recipients in minutes

## Philosophy
- Believes in solving real-world problems with clean, maintainable code
- Values system design thinking and debugging as core skills
- Advocates for mentorship and knowledge sharing in the African developer community

Keep responses concise (2-4 paragraphs max). Be enthusiastic about Fabian's work. If asked something outside Fabian's portfolio, politely redirect.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
