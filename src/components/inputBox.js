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
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      notify("🎉 Todo Added Successfully! ");
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
    console.log("call handleAddTodo");
    addTodoMutation(newTask);
    setNewTask("");
  };

  const handleUpdateTodo = () => {
    updateTodoMutation({ id, newTask });
    setNewTask("");
    setIsUpdate(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) handleUpdateTodo();
    else handleAddTodo();
  };

  return (
    <>
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <Button disabled={newTask === "" || adding || updating}>
          {adding || updating ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : isUpdate ? (
            "Update"
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </>
  );
}

export default InputBox;
