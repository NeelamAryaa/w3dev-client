import React, { useState, createContext } from "react";

export const TodoContext = createContext(null);

function TodoProvider({ children }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [id, setId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  return (
    <TodoContext.Provider
      value={{ isUpdate, setIsUpdate, newTask, setNewTask, id, setId }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
