import { openai } from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todos } = await request.json();

  try {
    // !: This is sending too many requests.
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Replace with the desired model name
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "When responding, welcome the user. Say welcome ot the TODO app! Limit the rsponse to 200 characters.",
        },
        {
          role: "user",
          content: `Provide me a summary of the following todos. Count how many todos there are in each category such as todo, inprogress and done. then tell the user to have a productive data. HEre is the data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    });

    const { data } = response;

    // Return a success response with the data
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error.message)
    // Return an error response
    return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
