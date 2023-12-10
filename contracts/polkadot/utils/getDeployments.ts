import { alephzeroTestnet, SubstrateDeployment } from "@scio-labs/use-inkathon";
import {
	getGreenShopMetadata,
	getGreenNftMetadata,
	getGreenTokenMetadata,
} from "@/contracts/polkadot/utils/getMetadata";
import {
	getGreenNftAddress,
	getGreenShopAddress,
	getGreenTokenAddress,
} from "@/contracts/polkadot/utils/getAddress";
export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
	return [
		{
			contractId: "greenShopContract",
			networkId: alephzeroTestnet.network,
			abi: getGreenShopMetadata(),
			address: getGreenShopAddress(),
		},
		{
			contractId: "greenTokenContract",
			networkId: alephzeroTestnet.network,
			abi: getGreenTokenMetadata(),
			address: getGreenTokenAddress(),
		},
		{
			contractId: "greenNftContract",
			networkId: alephzeroTestnet.network,
			abi: getGreenNftMetadata(),
			address: getGreenNftAddress(),
		},
	];
};
