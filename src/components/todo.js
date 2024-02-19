import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

import Button from "./button";
import { markTodoComplete } from "../todoHandlers/markTodoComplete";
import { deleteTodo } from "../todoHandlers/deleteTodo";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoContext } from "../context/todoContext";

function Todo({ todo, idx }) {
  const { setIsUpdate, setNewTask, setId } = useContext(TodoContext);
  const queryClient = useQueryClient();

  const notify = (msg) => toast(msg);

  const { mutate: completeTodoMutation, isPending: completing } = useMutation({
    mutationFn: markTodoComplete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      notify("🎉 Todo Completed Successfully! ");
    },
    onError: (error) => {
      // console.error("Error completing todo:", error);
      notify("😔 Opps! Error While Completing Todo. ");
    },
  });

  const { mutate: deleteTodoMutation, isPending: deleting } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      notify("🎉 Todo Deleted Successfully! ");
    },
    onError: (error) => {
      // console.error("Error deleting todo:", error);
      notify("😔 Opps! Error While Deleting Todo. ");
    },
  });
  const handleCompleteTodo = (id) => {
    completeTodoMutation(id);
  };

  const handleDeleteTodo = (id) => {
    deleteTodoMutation(id);
  };

  const handleEditTodo = (id, task) => {
    setNewTask(task);
    setId(id);
    setIsUpdate(true);
  };
  // console.log("todo");

  return (
    <>
      <Toaster position="top-right" />

      <li className={`${todo.isCompleted ? "completed" : ""}`}>
        <div className={`todo-item `}>{idx + 1 + ") " + todo.task}</div>
        <div className="todo-btn">
          {!todo.isCompleted && (
            <>
              {/* <Button onClick={() => handleEditTodo(todo._id, todo.task)}> */}
              <Button onClick={() => handleEditTodo(todo.id, todo.task)}>
                Edit
              </Button>
              <Button
                // onClick={() => handleCompleteTodo(todo._id)}
                onClick={() => handleCompleteTodo(todo.id)}
                disabled={completing}
              >
                {completing ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Complete"
                )}
              </Button>
            </>
          )}

          <Button
            // onClick={() => handleDeleteTodo(todo._id)}
            onClick={() => handleDeleteTodo(todo.id)}
            disabled={deleting}
          >
            {deleting ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </li>
    </>
  );
}

export default Todo;
