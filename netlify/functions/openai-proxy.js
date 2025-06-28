import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  try {
    const body = await request.json();
    const prompt = `Write a LinkedIn post about ${body.topic} in the ${body.industry} industry with a ${body.tone} tone. End with: ${body.cta}`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 280,
    });

    return Response.json({ content: chat.choices[0].message.content.trim() });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
