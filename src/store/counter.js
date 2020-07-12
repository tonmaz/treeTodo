import {createSlice} from "@reduxjs/toolkit";

const initialState = "hi";

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        add: (state) => state + 1,
        minus: (state) => state - 1,
        addByNum: (state, action) => {
            return state + Number(action.payload);
        },
    },
    // extraReducers: {
    //     // Add reducers for additional action types here, and handle loading state as needed
    //     [addAsync.fulfilled]: (state, action) => {
    //         // Add user to the state array
    //         console.log(action.payload)
    //         return   action.payload
    //     }
    // }
});

// export const addAsync = amount => dispatch => {
//     setTimeout(() => {
//         dispatch(add(amount));
//     }, 1000);
// };

export const {add, minus, addByNum} = counterSlice.actions;

export default counterSlice.reducer;
