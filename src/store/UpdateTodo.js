import {createSlice} from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "updateTodo",
  initialState: {},
  reducers: {
    updateTodo: (state, action) => {
      const task = action.payload;

      return {...state, ...task};
    },

    clearTodo: (state, action) => {
      return {task: ""};
    },
  },
});

export const {updateTodo, clearTodo} = updateSlice.actions;

export default updateSlice.reducer;
