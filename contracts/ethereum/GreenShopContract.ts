import { ethers } from "ethers";
import { BaseInterface } from "./interfaces";
import { getRPC } from "./utils/common";
import { getGreenShopAbi } from "./utils/getAbis";
import { getGreenShopAddress } from "./utils/getAddress";

export default class GreenShopContract extends BaseInterface {
	constructor(provider?: ethers.providers.Web3Provider) {
		const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
		super(
			provider || rpcProvider,
			getGreenShopAddress(),
			getGreenShopAbi()
		);
		if (!provider) {
			this._contract = new ethers.Contract(
				this._contractAddress,
				this._abis,
				rpcProvider
			);
		}
	}

	async mintToken(
		to: string,
		media: string,
		amount: number
	): Promise<boolean> {
		let rate = await this._contract.mint_token(
			to,
			media,
			this._numberToEth(amount)
			// amount
		);
		return rate;
	}

	// async getBnbRate(): Promise<number> {
	// 	let rate = await this._contract.BNB_rate();
	// 	return this._toNumber(rate);
	// }

	// async getUsdtRate(): Promise<number> {
	// 	const rate = await this._contract.USDT_rate();
	// 	return this._toNumber(rate);
	// }

	// async buyTokenByBNB(amount: number) {
	// 	const rate = await this.getBnbRate();
	// 	const tx: TransactionResponse = await this._contract.buyTokenByBNB({
	// 		...this._option,
	// 		value: this._numberToEth(amount / rate),
	// 	});
	// 	return this._handleTransactionResponse(tx);
	// }

	// async buyTokenByUSDT(amount: number) {
	// 	const rate = await this.getUsdtRate();
	// 	const test = amount / rate;
	// 	const tx: TransactionResponse = await this._contract.buyTokenByUSDT(
	// 		this._numberToEth(amount / rate),
	// 		this._option
	// 	);
	// 	return this._handleTransactionResponse(tx);
	// }
}
