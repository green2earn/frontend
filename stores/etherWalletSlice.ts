import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";

type WalletState = {
	walletAddress: string;
	web3Provider?: ethers.providers.Web3Provider;
	isLoading: boolean;
};

const initialState: WalletState = {
	walletAddress: "",
	isLoading: true,
};

export const walletSlice = createSlice({
	name: "etherWallet",
	initialState,
	reducers: {
		setWeb3Provider: (
			state,
			action: PayloadAction<ethers.providers.Web3Provider>
		) => {
			state.web3Provider = action.payload;
		},
		setWalletInfo: (state, action: PayloadAction<string>) => {
			state.walletAddress = action.payload;
		},
	},
});

export const { setWeb3Provider, setWalletInfo } = walletSlice.actions;
export default walletSlice.reducer;
