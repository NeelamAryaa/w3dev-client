import React from "react";

function Button({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? "disableBtn" : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
