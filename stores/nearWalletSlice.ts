import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Wallet } from "@/utils/near-wallet";
import { stat } from "fs";

type WalletState = {
	wallet: Wallet | null;
	// green_shop: Wallet | null;
	// green_token: Wallet | null;
	// vesting_contract: Wallet | null;
	isLoading: boolean;
};

const initialState: WalletState = {
	wallet: null,
	// green_shop: null,
	// green_token: null,
	// vesting_contract: null,
	// },
	isLoading: true,
};

export const initWallet = createAsyncThunk(
	"wallet/init",
	async ({ contractId, network }: { contractId: any[]; network: any }) => {
		const wallet_ft_launcher_factory = new Wallet({
			createAccessKeyFor: contractId[0],
			network,
		});
		// const wallet_green_shop = new Wallet({
		// 	createAccessKeyFor: contractId[1],
		// 	network,
		// });
		// const wallet_green_token = new Wallet({
		// 	createAccessKeyFor: contractId[2],
		// 	network,
		// });
		// const wallet_vesting_contract = new Wallet({
		// 	createAccessKeyFor: contractId[3],
		// 	network,
		// });

		await wallet_ft_launcher_factory.startUp().catch((e) => {
			console.error("Wallet start up failed", e);
		});
		// await wallet_green_shop.startUp().catch((e) => {
		// 	console.error("Wallet start up failed", e);
		// });
		// await wallet_green_token.startUp().catch((e) => {
		// 	console.error("Wallet start up failed", e);
		// });
		// await wallet_vesting_contract.startUp().catch((e) => {
		// 	console.error("Wallet start up failed", e);
		// });
		// return {
		return wallet_ft_launcher_factory;
		// green_shop: wallet_green_shop,
		// green_token: wallet_green_token,
		// vesting_contract: wallet_vesting_contract,
		// };
	}
);

export const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		logout: (state) => {
			// state.wallet = {
			// 	ft_launcher_factory: null,
			// 	green_shop: null,
			// 	green_token: null,
			// 	vesting_contract: null,
			// };
			state.wallet = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(initWallet.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(initWallet.fulfilled, (state, action) => {
			state.wallet = action.payload;
			// if (!state.wallet.ft_launcher_factory) {
			// 	state.wallet.ft_launcher_factory =
			// 		action.payload.ft_launcher_factory;
			// }
			// if (!state.wallet.green_shop) {
			// 	state.wallet.green_shop = action.payload.green_shop;
			// }
			// if (!state.wallet.green_token) {
			// 	state.wallet.green_token = action.payload.green_token;
			// }
			// if (!state.wallet.vesting_contract) {
			// 	state.wallet.vesting_contract = action.payload.vesting_contract;
			// }

			state.isLoading = false;
		});
		builder.addCase(initWallet.rejected, (state) => {
			// state.wallet = {
			// 	ft_launcher_factory: null,
			// 	green_shop: null,
			// 	green_token: null,
			// 	vesting_contract: null,
			// };
			state.wallet = null;
		});
	},
});

export const { logout } = walletSlice.actions;
export default walletSlice.reducer;

