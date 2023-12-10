import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import { getRPC } from "./utils/common";
import { getGreenLauncherAbi } from "./utils/getAbis";
import { getGreenLauncherAddress } from "./utils/getAddress";

export default class GreenLauncherContract extends BaseInterface {
	constructor(provider?: ethers.providers.Web3Provider) {
		const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
		super(
			provider || rpcProvider,
			getGreenLauncherAddress(),
			getGreenLauncherAbi()
		);
		if (!provider) {
			this._contract = new ethers.Contract(
				this._contractAddress,
				this._abis,
				rpcProvider
			);
		}
	}

	async createToken(
		name: string,
		symbol: string,
		decimals: number,
		totalSupply: number,
		owner: string
	): Promise<string> {
		let res = await this._contract.createToken(
			name,
			symbol,
			decimals,
			totalSupply,
			owner
		);
		return res;
	}
	async getTokens(): Promise<string[]> {
		let res = await this._contract.getTokens();
		return res;
	}
	async getProjectsByOwner(address: string): Promise<string[]> {
		let res = await this._contract.getProjectsByOwner(address);
		return res;
	}
}
