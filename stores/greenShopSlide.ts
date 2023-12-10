import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GreenMapState = {
	clickButtonBuy: boolean;
};

const initialState: GreenMapState = {
	clickButtonBuy: false,
};

export const greenShopSlice = createSlice({
	name: "greenShopSlice",
	initialState,
	reducers: {
		setClickButtonBuy: (state, action: PayloadAction<boolean>) => {
			state.clickButtonBuy = action.payload;
		},
	},
});

export const { setClickButtonBuy } = greenShopSlice.actions;
export default greenShopSlice.reducer;
