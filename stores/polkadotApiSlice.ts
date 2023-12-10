import { getGreenShopMetadata } from "@/contracts/polkadot/utils/getMetadata";
import { ApiPromise } from "@polkadot/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChainContract, useContract } from "useink";
import metdata from "@/contracts/polkadot/metadatas/greenshop.json";

type polkadotApiState = {
	api: ApiPromise | null;
	accounts: any[];
	greenShopContract: ChainContract | undefined;
};
// const greenShopContract = useContract(
// 	"5DBtSxH8VTzrN4xpcGxb8gKCnuPdFhvEGsiweULteAKtbAj3",
// 	metdata,
// 	"aleph-testnet"
// );
const initialState: polkadotApiState = {
	api: null,
	accounts: [],
	greenShopContract: undefined,
};

export const polkadotApiSlice = createSlice({
	name: "polkadotApiSlice",
	initialState,
	reducers: {
		setpolkadotApi: (state, action: PayloadAction<ApiPromise>) => {
			state.api = action.payload;
		},
		setAccountsPolkadot: (state, action: PayloadAction<any[]>) => {
			state.accounts = action.payload;
		},
		setGreenShopContract: (state, action: PayloadAction<ChainContract>) => {
			state.greenShopContract = action.payload;
		},
	},
});

export const { setpolkadotApi, setAccountsPolkadot, setGreenShopContract } =
	polkadotApiSlice.actions;
export default polkadotApiSlice.reducer;
