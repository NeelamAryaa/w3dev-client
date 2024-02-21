import React from "react";

function Button({ children, onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled ? "disableBtn" : ""} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
