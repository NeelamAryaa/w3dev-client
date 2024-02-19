import { BASE_URL } from "../config/config";

export const addNewTodo = async (task) => {
  console.log("call addnewtodo");
  try {
    const newTask = task.trim();

    if (newTask === "") {
      throw Error("Task Should Not Be Empty!");
    }
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    });

    if (!response.ok) {
      throw Error("Failed to add todo", response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
