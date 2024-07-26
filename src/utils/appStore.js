import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import locationReducer from "./locationSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        location: locationReducer,
    }
});

export default store;