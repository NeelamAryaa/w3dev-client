import React, { useReducer, useEffect } from "react";
import Todo from "./todo";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTodos } from "../todoHandlers/fetchAllTodos";
import Details from "./details";
import Pagination from "./pagination";
import { initialState, reducer } from "../reducer/reducer";

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, isError, error, refetch, data } = useQuery({
    queryKey: ["todos", state.page],
    queryFn: () => {
      return fetchAllTodos(state.page);
    },
  });

  useEffect(() => {
    if (state.page) {
      refetch();
    }
  }, [state.page, refetch]);

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
    return (
      <div className="m-5">
        <p>Error: {error.message}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  // const completedTask = todos.filter((todo) => todo.completed).length;
  // const completedTask = data.todo?.filter((todo) => todo.isCompleted).length;

  return (
    <>
      <Details totalTask={data.totalTodo} completedTask={data.completedTodo} />
      <ul className="todo-list">
        {data.todo &&
          data.todo.map((todo, idx) => (
            // <Todo key={todo._id} todo={todo} idx={idx} />
            <Todo key={todo.id} todo={todo} idx={(state.page - 1) * 5 + idx} />
          ))}
      </ul>
      <Pagination
        state={state}
        dispatch={dispatch}
        totalPage={data.totalPages}
      />
    </>
  );
}

export default TodoList;
