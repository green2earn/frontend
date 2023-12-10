import { ethers } from "ethers";
import { BaseInterface, Erc20 } from "./interfaces";
import { getErc20Abi } from "./utils/getAbis";
import { getGreenLauncherAddress } from "./utils/getAddress";

export default class Erc20Contract extends Erc20 {
	constructor(provider: ethers.providers.Web3Provider, addressToken: string) {
		super(provider, addressToken, getErc20Abi());
	}
}
