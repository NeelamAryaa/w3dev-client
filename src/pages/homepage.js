import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import InputBox from "../components/inputBox";
import TodoList from "../components/todoList";
import TodoProvider from "../context/todoContext";

function Homepage() {
  console.log("homepage");
  return (
    <div className="App">
      <Header />
      <TodoProvider>
        <InputBox />
        <TodoList />
      </TodoProvider>
      <Footer />
    </div>
  );
}

export default Homepage;
