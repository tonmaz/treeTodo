import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API, graphqlOperation} from "aws-amplify";
import {listTodos} from "../graphql/queries";
import {createTodo, deleteTodo, updateTodo} from "../graphql/mutations";

function Api(typePre, gql, dat) {
  return createAsyncThunk(typePre, async (input) => {
    const response = await API.graphql(graphqlOperation(gql, {input}));
    console.log(response);
    return response.data[dat];
  });
}

export const submitTodo = Api("todo/create", createTodo, "createTodo");

export const updateTask = Api("todo/update", updateTodo, "updateTodo");

export const completeTodo = Api("todo/toggle", updateTodo, "updateTodo");

export const deleteTask = Api("todo/delete", deleteTodo, "deleteTodo");

export const getTodos = Api("getTodos", listTodos, "listTodos");

function rejected() {
  return (state, action) => {
    if (action.payload) {
      state.error = action.payload.errorMessage;
    } else {
      state.error = action.error;
    }
  };
}

function pending() {
  return (state, action) => {
    state.loading = "loading...";
  };
}

const todoSlice = createSlice({
  name: "todo",
  initialState: {entities: [], loading: "idle"},
  reducers: {},

  extraReducers: {
    // list todos
    [getTodos.pending]: pending(),
    [getTodos.fulfilled]: (state, action) => {
      state.entities = action.payload.items;
      console.log(action);
      state.loading = "idle";
    },
    [getTodos.rejected]: rejected(),

    // submit todos
    [submitTodo.pending]: pending(),
    [submitTodo.fulfilled]: (state, action) => {
      state.entities.push(action.payload);
      state.loading = "idle";
    },
    [submitTodo.rejected]: rejected(),

    // upddate todos
    [updateTask.pending]: pending(),
    [updateTask.fulfilled]: (state, action) => {
      const todo = state.entities.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.task = action.payload.task;
      }
      state.loading = "idle";
    },
    [updateTask.rejected]: rejected(),

    // toggle todos
    [completeTodo.pending]: pending(),
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
    [completeTodo.rejected]: rejected(),

    // delete todos
    [deleteTask.pending]: pending(),
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
    [deleteTask.rejected]: rejected(),
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
