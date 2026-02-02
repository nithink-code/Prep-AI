import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const openai = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(request: Request) {
  const { type, role, amount, level, techstack, userid } = await request.json();
  try {
    const { object } = await generateObject({
      model: openai("openai/gpt-oss-120b"),
      schema: z.object({
        questions: z.array(z.string()),
      }),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3`,
    });
    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: object.questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };
    await db.collection("interviews").add(interview);
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return Response.json(
    { success: true, message: "Welcome to VAPI Generate API" },
    { status: 200 },
  );
}
