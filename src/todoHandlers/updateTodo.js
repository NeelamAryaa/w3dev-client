import { BASE_URL } from "../config/config";

export const updateTodo = async ({ id, newTask }) => {
  console.log(id, newTask);
  try {
    const response = await fetch(`${BASE_URL}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: newTask }),
    });

    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
