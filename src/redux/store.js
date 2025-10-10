import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './slices/HomeSlice';
import fgpReducer from './slices/FgpSlice';
import stockPurchaseReducer from './slices/StockPurchaseSlice';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
    reducer: {
        home: homeReducer,
        fgp:fgpReducer,
        stockPurchase: stockPurchaseReducer,
        job: jobReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
      devTools: process.env.NODE_ENV !== 'production',
    });