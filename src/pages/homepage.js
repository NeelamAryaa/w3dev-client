import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import InputBox from "../components/inputBox";
import Details from "../components/details";
import TodoList from "../components/todoList";
import { BASE_URL } from "../config/config";
import { useQuery } from "@tanstack/react-query";

function Homepage() {
  // dont use useState

  // useEffect(() => {
  //   // dont use fetch usequery
  // }, []);

  // const handleEditTodo = (id) => {
  //   setId(id);
  //   setIsUpdate(true);
  //   const toBeupdate = todos.filter((todo) => todo._id === id)[0].task;
  //   console.log(toBeupdate);
  //   setNewTask(toBeupdate);
  // };

  // console.log("new task ", newTask);

  // const todoCompleted = todos.filter((todo) => todo.completed).length;
  // // console.log(todoCompleted);
  return (
    <div className="App">
      <Header />
      {/* <main> */}
      <InputBox />
      {/* <Details /> */}
      <TodoList />
      {/* </main> */}
      <Footer />
    </div>
  );
}

export default Homepage;
