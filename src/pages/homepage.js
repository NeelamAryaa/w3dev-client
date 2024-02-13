import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import InputBox from "../components/inputBox";
import TodoList from "../components/todoList";

function Homepage() {
  return (
    <div className="App">
      <Header />
      <InputBox />
      <TodoList />
      <Footer />
    </div>
  );
}

export default Homepage;
