import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Button from "./button";
import { TodoContext } from "../context/todoContext";
import { updateTodo } from "../todoHandlers/updateTodo";
import { addNewTodo } from "../todoHandlers/addNewTodo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function InputBox() {
  const { isUpdate, setIsUpdate, newTask, setNewTask, id } =
    useContext(TodoContext);

  const notify = (msg) => toast(msg);

  const queryClient = useQueryClient();
  const { mutate: addTodoMutation, isPending: adding } = useMutation({
    mutationFn: addNewTodo,
    onSuccess: () => {
      console.log("why2times");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      notify("🎉 Todo Added Successfully!");

      setNewTask("");
    },
    onError: (error) => {
      // console.error("Error adding todo:", error.message);
      notify("😔 " + error.message || "😔 Opps! Error While Adding Todo.");
    },
  });

  const { mutate: updateTodoMutation, isPending: updating } = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      notify("🎉 Todo Updated Successfully! ");
    },
    onError: (error) => {
      // console.error("Error updating todo:", error);
      notify("😔 Opps! Error While Updating Todo. ");
    },
  });

  const handleAddTodo = () => {
    addTodoMutation(newTask);
  };

  const handleUpdateTodo = () => {
    updateTodoMutation({ id, newTask });
    setNewTask("");
    setIsUpdate(false);
  };

  console.log("inputbox");
  return (
    <>
      <Toaster position="top-right" />

      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        {isUpdate ? (
          <Button
            disabled={newTask === "" || updating}
            onClick={handleUpdateTodo}
          >
            {updating ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Update"
            )}
          </Button>
        ) : (
          <Button disabled={newTask === "" || adding} onClick={handleAddTodo}>
            {adding ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Add"
            )}
          </Button>
        )}
      </div>
    </>
  );
}

export default InputBox;
