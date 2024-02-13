import { BASE_URL } from "../config/config";

export const markTodoComplete = async (id) => {
  console.log(id);
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("error while marking todo complete");

    const updatedTodo = await response.json();

    return updatedTodo;
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
