import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import dataReducer from "./databaseSlice"

const store = configureStore({
    reducer: {
        authReducer,
        dataReducer,
    }
})

export default store