import { createSlice } from "@reduxjs/toolkit";
const FgpSlice = createSlice({
    name:'fgp',
    initialState:{
        MoreJobDetails:false,
        PopUpJobDetails:false,
        mode:''
    },
    reducers:{
        handleMoreJobDetails: (state, action) => {
            state.MoreJobDetails = action.payload;
        },
        handlePopUpJobDetails: (state, action) => {
            state.PopUpJobDetails = action.payload;
        },
        handleModeChange: (state, action) => {
            state.mode = action.payload;
        }
    },
})
export const { handleMoreJobDetails, handlePopUpJobDetails, handleModeChange } = FgpSlice.actions;
export default FgpSlice.reducer;