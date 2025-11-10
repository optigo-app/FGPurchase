import { createSlice } from "@reduxjs/toolkit";

const homeObject = {
    isSaveAndNext:false,
    isJobCustomize:false,
    selectButtonValue:'',
    homefilterObject:{},
    multiPartPayFlag:false,
    mountModal:false,
    issuedMaterialModal:false,
    addSubtag:false,
    uploadImage:[],
    subTagUploadImages:[],
    selectedTabValue:'',
    showImgListPopUp:false,
    payByBank:false,
    payByCash:false
}

const HomeSlice = createSlice({
    name:'home',
    initialState:homeObject,
    reducers:{
        handleSelectedTabValue: (state, action) => {
            state.selectedTabValue = action.payload;
        },
        handleUploadImageList: (state, action) => {
            state.uploadImage = action.payload;
        },
        handleSubTagUploadImageList: (state, action) => {
            state.subTagUploadImages = action.payload;
        },
        handleShowImgListPopUp: (state, action) => {
            state.showImgListPopUp = action.payload;
        },
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
        },
        handleaddSubtagFlag:(state, action) => {
            state.addSubtag = action.payload;
        },
        handlePayByCash:(state, action) => {
            state.payByCash = action?.payload;
        },
        handlePayByBank:(state, action) => {
            state.payByBank = action?.payload;
        },
    }
})

export const { 
    handleSelectedTabValue,
    handleShowImgListPopUp, 
    handleUploadImageList,
    handleSubTagUploadImageList, 
    handleSaveAndNextFlag, 
    handleCustomizeJobFlag, 
    handleSave, 
    handleSelectedButton, 
    handleMultiPartPayFlag, 
    handleMountModal, 
    handleIssuedMaterialModal, 
    handleaddSubtagFlag,
    handlePayByBank,
    handlePayByCash
 } = HomeSlice?.actions;
export default HomeSlice.reducer;