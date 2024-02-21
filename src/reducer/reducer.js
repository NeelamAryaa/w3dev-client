// import React, { useReducer } from "react";
export const initialState = {
  page: 1,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "previous":
      if (state.page === 1) {
        return { page: 1 };
      } else return { page: state.page - 1 };
    case "next":
      return { page: state.page + 1 };
    default:
      return state;
  }
};
