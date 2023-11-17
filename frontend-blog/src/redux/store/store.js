import { configureStore } from "@reduxjs/toolkit";
//import usersSlices from "../slices/users/usersSlices";
import { useReducer } from "react";
 


const store = configureStore({
    reducers: {
        users: useReducer,
    },
});


export default store;