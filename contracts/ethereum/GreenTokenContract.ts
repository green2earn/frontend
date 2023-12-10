import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import { getGreenTokenAbi } from "./utils/getAbis";
import { getGreenTokenAddress } from "./utils/getAddress";

export default class GreenTokenContract extends Erc20 {
	constructor(provider: ethers.providers.Web3Provider) {
		super(provider, getGreenTokenAddress(), getGreenTokenAbi());
	}
}
