import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newOrder: null,
};

const StockPurchaseSlice = createSlice({
  name: 'stockPurchase',
  initialState,
  reducers: {
    saveNewOrder: (state, action) => {
      state.newOrder = action.payload;
    },
    productDetails: (state, action) => {
      state.productDetails = action.payload;
    }
  },
});

export const { saveNewOrder, productDetails } = StockPurchaseSlice.actions;
export default StockPurchaseSlice.reducer;
