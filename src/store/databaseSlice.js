import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
}

const databaseSlice = createSlice({
    name: "database",
    initialState,
    reducers: {
        add: (state, action) => {
            // console.log(action.payload);
            state.data.push(action.payload)
            // console.log(state);
            localStorage.setItem("data", JSON.stringify(state))
        },
        remove: (state, action) => {
            // console.log(state)
            if(state.data.length !== 0){
                state.data = state.data.filter((data) => data.$id !== action.payload)
            }
            localStorage.setItem("data", JSON.stringify(state))
        },
        update: (state, action) => {
            if(action.payload){
                console.log(action.payload);
                state.data = state.data.map((data) => data.featuredImage === action.payload.featuredImage ? action.payload : data)
                localStorage.setItem("data", JSON.stringify(state))
            }
        },
        getItem : (state, action) => {
            // console.log(action.payload);
            if(action.payload.data){
                state.data = action.payload.data
            }
            // console.log(state);
        }
    }
})

export const {add, remove, getItem, update} = databaseSlice.actions;

export default databaseSlice.reducer