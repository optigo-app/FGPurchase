import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './slices/HomeSlice';
import fgpReducer from './slices/FgpSlice';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        fgp:fgpReducer,
    }
})