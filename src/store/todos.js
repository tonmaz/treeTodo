import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";

export const getTodos = createAsyncThunk(
    "getTodos",

    async () => {
      const response = await API.graphql(graphqlOperation(queries.listTodos));
      return response.data.listTodos.items;
    }
);

export const submitTodo = createAsyncThunk(
    "todo/create",

    async (todo) => {
      const todoDetails = {
        task: todo,
        completed: false,
      };
      const response = await API.graphql(
          graphqlOperation(mutations.createTodo, {input: todoDetails})
      );
      return response.data.createTodo;
    }
);

export const updateTask = createAsyncThunk(
    "todo/update",

    async (todo) => {
      const todoDetails = {
        id: todo.task.id,
        task: todo.todo,
      };
      const response = await API.graphql(
          graphqlOperation(mutations.updateTodo, {input: todoDetails})
      );
      return response.data.updateTodo;
    }
);

export const completeTodo = createAsyncThunk(
    "todo/toggle",

    async (todo) => {
      const todoDetails = {
        id: todo.id,
        completed: !todo.completed,
      };
      const response = await API.graphql(
          graphqlOperation(mutations.updateTodo, {input: todoDetails})
      );
      return response.data.updateTodo;
    }
);

export const deleteTask = createAsyncThunk(
    "todo/delete",

    async (id) => {
      const todoDetails = {
        id: id,
      };
      const response = await API.graphql(
          graphqlOperation(mutations.deleteTodo, {input: todoDetails})
      );
      return response.data.deleteTodo;
    }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {entities: [], loading: "idle"},
  reducers: {},
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loading = "loading...";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.loading = "idle";
    },
    [getTodos.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    },

    [submitTodo.pending]: (state, action) => {
      state.loading = "loading...";
    },
    [submitTodo.fulfilled]: (state, action) => {
      state.entities.push(action.payload);
      state.loading = "idle";
    },
    [submitTodo.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    },

    [updateTask.pending]: (state, action) => {
      state.loading = "loading...";
    },
    [updateTask.fulfilled]: (state, action) => {
      const todo = state.entities.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
      }
      state.loading = "idle";
    },

    [updateTask.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    },

    [completeTodo.pending]: (state, action) => {
      state.loading = "loading...";
    },
    [completeTodo.fulfilled]: (state, action) => {
      console.log(action.payload);
      const toggle = state.entities.find(
          (todo) => todo.id === action.payload.id
      );
      console.log(toggle);
      if (toggle) {
        toggle.completed = action.payload.completed;
      }
      state.loading = "idle";
    },
    [completeTodo.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    },

    [deleteTask.pending]: (state, action) => {
      state.loading = "loading...";
    },
    [deleteTask.fulfilled]: (state, action) => {
      console.log(action.payload);
      const deleted = state.entities.find(
          (todo) => todo.id === action.payload.id
      );
      if (deleted) {
        state.entities.splice(deleted, 1);
      }
      state.loading = "idle";
    },
    [deleteTask.rejected]: (state, action) => {
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    },
  },
});

//
// export const submitTodo = todo => async dispatch => {
//     try {
//         const todoDetails = {
//             task: todo,
//             completed: false
//         }
//         const response = await API.graphql(graphqlOperation(mutations.createTodo, {input: todoDetails}));
//         const newTodo = response.data.createTodo
//         dispatch(addTodo(newTodo))
//
//     } catch (err) {
//         // dispatch(getTodosFailure(err))
//         console.log("failed", err)
//     }
// }

export default todoSlice.reducer;
