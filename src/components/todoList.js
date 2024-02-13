import React, { useContext, useEffect } from "react";
import Todo from "./todo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos } from "../todoHandlers/fetchAllTodos";
// import { TodoContext } from "../context/todoContext";

function TodoList() {
  const {
    isFetching,
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodos,
  });
  // if (isFetching) return "Loading...";
  if (isLoading) return "Loading...";

  if (isError) {
    console.log(error);
    return "An error has occurred";
  }

  console.log("todosss", todos);
  return (
    <ul className="todo-list">
      {todos &&
        todos.map((todo, idx) => <Todo key={todo._id} todo={todo} idx={idx} />)}
    </ul>
  );
}

export default TodoList;
