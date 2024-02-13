import { BASE_URL } from "../config/config";

export const addNewTodo = async (newTask) => {
  try {
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
    console.log(data);
    return data;
  } catch (error) {
    throw Error("Error adding todo:", error);
  }
};
