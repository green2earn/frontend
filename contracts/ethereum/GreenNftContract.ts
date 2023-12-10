import { ethers } from "ethers";
import { Erc721 } from "./interfaces";
import { getGreenNftAbi } from "./utils/getAbis";
import { getGreenNftAddress } from "./utils/getAddress";
import { getRPC } from "./utils/common";

export default class GreenNftContract extends Erc721 {
	constructor(provider?: ethers.providers.Web3Provider) {
		const rpcProvider = new ethers.providers.JsonRpcProvider(getRPC());
		super(provider || rpcProvider, getGreenNftAddress(), getGreenNftAbi());
		if (!provider) {
			this._contract = new ethers.Contract(
				this._contractAddress,
				this._abis,
				rpcProvider
			);
		}
	}

	async ownerNFTs(address: string, balanceOf: number): Promise<Array<any>> {
		let res = await this._contract.ownerNFTs(address, balanceOf);
		return res;
	}

	async tokenURI(id: number): Promise<string> {
		let res = await this._contract.tokenURI(id);
		return res;
	}
}
