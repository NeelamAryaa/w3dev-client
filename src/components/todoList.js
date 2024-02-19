import React from "react";
import Todo from "./todo";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTodos } from "../todoHandlers/fetchAllTodos";
import Details from "./details";

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

  // if (isLoading) return "Loading...";
  if (isLoading)
    return (
      <div
        className="d-flex
      justify-content-center
      align-items-center"
        style={{ height: "400px" }}
      >
        <span
          className="spinner-border spinner-border-lg"
          role="status"
          aria-hidden="true"
        ></span>
      </div>
    );

  if (isError) {
    return "An error has occurred";
  }

  // const completedTask = todos.filter((todo) => todo.completed).length;
  const completedTask = todos.filter((todo) => todo.isCompleted).length;
  console.log("todo-list");
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
