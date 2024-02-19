import { BASE_URL } from "../config/config";

export const markTodoComplete = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: true }),
    });

    if (!response.ok) throw new Error("error while marking todo complete");

    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};
