import React from "react";

export default function Details({ totalTask, completedTask }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "1.2rem",
        padding: "20px 10px 0 10px",
      }}
    >
      <div>Total Task : {totalTask} </div>
      <div>Complete Task : {completedTask}</div>
    </div>
  );
}
