import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            // console.log(state);
            localStorage.setItem("auth", JSON.stringify(state))
        },
        logout: (state) => {
            state.status=false
            state.userData = null
            // console.log(state);
            localStorage.setItem("auth", JSON.stringify(state))
        },
        getauth: (state, action) => {
            // console.log(state);
            if(action.payload){
                state.status=action.payload.status
                state.userData=action.payload.userData
            }
            // console.log(state);
        }
    }
})

export const {login, logout, getauth} = authSlice.actions

export default authSlice.reducer