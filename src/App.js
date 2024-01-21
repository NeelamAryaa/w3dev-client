// client/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      const data = await response.json();

      setTodos([...todos, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleEditTodo = (id) => {
    setId(id);
    setIsUpdate(true);
    const toBeupdate = todos.filter((todo) => todo._id === id)[0].task;
    console.log(toBeupdate);
    setNewTask(toBeupdate);
  };

  const handleUpdateTodo = async (id) => {
    try {
      console.log(newTask);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        }
      );

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
    setIsUpdate(false);
    setNewTask("");
    setId(null);
  };

  const handleCompleteTodo = async (id) => {
    try {
      // const task = todos.filter((todo) => todo._id === id)[0].task;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }), // Assuming you're marking the task as completed on update
        }
      );

      const updatedTodo = await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === updatedTodo._id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  console.log("new task ", newTask);

  const todoCompleted = todos.filter((todo) => todo.completed).length;
  // console.log(todoCompleted);
  return (
    <div className="App">
      <header>
        <h1>ToDo App</h1>
      </header>
      <main>
        <div>
          <input
            type="text"
            placeholder="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          {isUpdate ? (
            <button
              disabled={newTask === ""}
              className={newTask === "" ? "disableBtn" : ""}
              onClick={() => handleUpdateTodo(id)}
            >
              Update
            </button>
          ) : (
            <button
              disabled={newTask === ""}
              className={newTask === "" ? "disableBtn" : ""}
              onClick={handleAddTodo}
            >
              Add
            </button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.2rem",
            padding: "20px 10px 0 10px",
          }}
        >
          <div>Total Tasks : {todos.length}</div>
          <div>Completed : {todoCompleted}</div>
        </div>
        <ul>
          {todos.map((todo, idx) => (
            <li
              key={todo._id}
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 50%, 80%)`,
              }}
            >
              <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
                {idx + 1 + ") " + todo.task}
              </div>
              <div className="todo-btn">
                {!todo.completed ? (
                  <button
                    disabled={id === todo._id}
                    onClick={() => handleEditTodo(todo._id)}
                    className={`${id === todo._id ? "disableBtn" : ""}`}
                  >
                    Edit
                  </button>
                ) : null}

                <button onClick={() => handleDeleteTodo(todo._id)}>
                  Delete
                </button>
                {!todo.completed ? (
                  <button onClick={() => handleCompleteTodo(todo._id)}>
                    Complete
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Created with ❤️ by Neelam</p>
      </footer>
    </div>
  );
}

export default App;
