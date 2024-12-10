import { createSlice } from "@reduxjs/toolkit";

const homeObject = {
    isSaveAndNext:false,
    isJobCustomize:false,
    selectButtonValue:'',
    homefilterObject:{},
    multiPartPayFlag:false,
    mountModal:false,
    issuedMaterialModal:false
}

const HomeSlice = createSlice({
    name:'home',
    initialState:homeObject,
    reducers:{
        handleSaveAndNextFlag: (state, action) => {
            state.isSaveAndNext = action.payload;
        },
        handleCustomizeJobFlag: (state, action) => {
            state.isJobCustomize = action.payload;
        },
        handleSave: (state, action) => {
            state.homefilterObject = action.payload;
        },
        handleSelectedButton:(state, action) => {
            state.selectButtonValue = action.payload;
        },
        handleMultiPartPayFlag:(state, action) => {
            state.multiPartPayFlag = action.payload;
        },
        handleMountModal:(state, action) => {
            state.mountModal = action.payload;
        },
        handleIssuedMaterialModal:(state, action) => {
            state.issuedMaterialModal = action.payload;
        }
    }
})

export const { handleSaveAndNextFlag, handleCustomizeJobFlag, handleSave, handleSelectedButton, handleMultiPartPayFlag, handleMountModal, handleIssuedMaterialModal } = HomeSlice?.actions;
export default HomeSlice.reducer;