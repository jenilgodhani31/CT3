import { configureStore } from "@reduxjs/toolkit";
import userData from "./slice";

const store = configureStore({
    reducer:{
        user:userData.reducer,
    }
});
export default store;