import { formatTodoForAI } from "./formatTodoForAI";

export const fetchSuggestion = async (board: Board) => {
  const todos = formatTodoForAI(board);

  const res = await fetch("/api/generatesummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTdata = await res.json();

  return GPTdata.choices[0].message.content;
};
