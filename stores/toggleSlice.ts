import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ToggleState = {
	isSelected: number;
	toggleAddProduct: boolean;
	toggleAddProject: boolean;
	popupLogin: boolean;
	popupSignup: boolean;
	popupWalletState:boolean
};

const initialState: ToggleState = {
	isSelected: 1,
	toggleAddProduct: false,
	toggleAddProject: false,
	popupLogin: false,
	popupSignup: false,
	popupWalletState:false
};

export const toggleSlice = createSlice({
	name: "select",
	initialState,
	reducers: {
		selectAction: (state, action: PayloadAction<number>) => {
			state.isSelected = action.payload;
		},
		toggleCreateProductPage: (state) => {
			state.toggleAddProduct = !state.toggleAddProduct;
		},
		toggleAddProjectPage: (state) => {
			state.toggleAddProject = !state.toggleAddProject;
		},
		popuploginPage: (state) => {
			state.popupLogin = !state.popupLogin;
		},
		popupsignupPage: (state) => {
			state.popupSignup = !state.popupSignup;
		},
		popupWallet: (state,action:PayloadAction<boolean>) => {
			state.popupWalletState = !state.popupWalletState;
		},
	},
});

export const {
	selectAction,
	toggleCreateProductPage,
	toggleAddProjectPage,
	popuploginPage,
	popupsignupPage,
	popupWallet
} = toggleSlice.actions;
export default toggleSlice.reducer;
