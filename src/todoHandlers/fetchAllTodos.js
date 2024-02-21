import { BASE_URL } from "../config/config";
export const fetchAllTodos = async (page) => {
  console.log(page);
  try {
    // const res = await fetch(`${BASE_URL}/todos`);
    const res = await fetch(`${BASE_URL}/todos?page=${page}&limit=5`);
    if (!res.ok) {
      throw new Error("Network Response Not OK");
      // throw err;
    }
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
