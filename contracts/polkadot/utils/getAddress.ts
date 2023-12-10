import getChainIdFromEnv, { AddressType, SMART_ADDRESS } from "./common";

const getAddress = (address: AddressType) => {
	const CHAIN_NETWORK = getChainIdFromEnv() as keyof AddressType;
	return address[CHAIN_NETWORK];
};

export const getGreenShopAddress = () => getAddress(SMART_ADDRESS.GREEN_SHOP);
export const getGreenLauncherAddress = () =>
	getAddress(SMART_ADDRESS.GREEN_LAUNCHER);
export const getGreenTokenAddress = () => getAddress(SMART_ADDRESS.GREEN_TOKEN);
export const getGreenNftAddress = () => getAddress(SMART_ADDRESS.GREEN_NFT);
