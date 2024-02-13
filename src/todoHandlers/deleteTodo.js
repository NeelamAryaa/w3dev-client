import { BASE_URL } from "../config/config";
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("error while deleting todo");
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
