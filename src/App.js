import React, { useState } from "react";
import "./App.css";

import Homepage from "./pages/homepage";
import { TodoContext } from "./context/todoContext";

function App() {
  const [isUpdate, setIsUpdate] = useState(false);

  const [newTask, setNewTask] = useState("");

  const [id, setId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  return (
    <TodoContext.Provider
      value={{ isUpdate, setIsUpdate, newTask, setNewTask, id, setId }}
    >
      <Homepage />
    </TodoContext.Provider>
  );
}

export default App;
