import { configureStore } from "@reduxjs/toolkit";
import usersReducers from "../slices/users/usersSlices"

const store = configureStore({
    reducer: {
        user: usersReducers,
    },
});

export default store;