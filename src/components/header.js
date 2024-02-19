import React, { memo } from "react";

function Header() {
  console.log("header");
  return (
    <header>
      <h1 style={{ fontWeight: "bold" }}>ToDo App</h1>
    </header>
  );
}

export default Header;
