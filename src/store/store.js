import {configureStore} from "@reduxjs/toolkit";
import counterSliceReducer from "./counter";
import todoSliceReducer from "./todos";
import updateTodoSlice from "./UpdateTodo";

export default configureStore({
  reducer: {
    counterSlice: counterSliceReducer,
    todoSlice: todoSliceReducer,
    updateSlice: updateTodoSlice,
  },
});
