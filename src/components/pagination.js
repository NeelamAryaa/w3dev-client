import React from "react";
// import { initialState, reducer } from "../reducer/reducer";
import Button from "./button";

function Pagination({ state, dispatch, totalPage }) {
  return (
    <div>
      <Button
        // className="mx-4"
        onClick={() => dispatch({ type: "previous" })}
        disabled={state.page === 1}
      >
        Previous
      </Button>

      {/* <i class="bi bi-arrow-left"></i> */}

      {/* <i class="bi bi-arrow-right"></i>  */}
      <Button
        onClick={() => dispatch({ type: "next" })}
        disabled={totalPage === state.page}
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
