import { BASE_URL } from "../config/config";
export const fetchAllTodos = async () => {
  try {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
