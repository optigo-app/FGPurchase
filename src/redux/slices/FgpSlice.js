import { createSlice } from "@reduxjs/toolkit";
const FgpSlice = createSlice({
    name:'fgp',
    initialState:{
        MoreJobDetails:false,
        PopUpJobDetails:false
    },
    reducers:{
        handleMoreJobDetails: (state, action) => {
            state.MoreJobDetails = action.payload;
        },
        handlePopUpJobDetails: (state, action) => {
            state.PopUpJobDetails = action.payload;
        },
    },
})
export const { handleMoreJobDetails, handlePopUpJobDetails } = FgpSlice.actions;
export default FgpSlice.reducer;