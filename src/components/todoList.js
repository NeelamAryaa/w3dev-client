import React, { useContext, useEffect } from "react";
import Todo from "./todo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllTodos } from "../todoHandlers/fetchAllTodos";
import Details from "./details";
// import { TodoContext } from "../context/todoContext";

function TodoList() {
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodos,
  });

  if (isLoading) return "Loading...";

  if (isError) {
    console.log(error);
    return "An error has occurred";
  }

  // const completedTask = todos.filter((todo) => todo.completed).length;
  const completedTask = todos.filter((todo) => todo.isCompleted).length;

  console.log("todosss", todos);
  return (
    <>
      <Details totalTask={todos.length} completedTask={completedTask} />
      <ul className="todo-list">
        {todos &&
          todos.map((todo, idx) => (
            // <Todo key={todo._id} todo={todo} idx={idx} />
            <Todo key={todo.id} todo={todo} idx={idx} />
          ))}
      </ul>
    </>
  );
}

export default TodoList;
