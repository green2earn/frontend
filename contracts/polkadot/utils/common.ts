export type AddressType = {
	testnet: string;
	mainnet: string;
};

// export enum CHAIN_ID {
// 	TESTNET = 338,
// 	MAINNET = 25,
// }

export default function getChainIdFromEnv(): string {
	if (process.env.NEXT_PUBLIC_NETWORK_POLKADOT) {
		return process.env.NEXT_PUBLIC_NETWORK_POLKADOT;
	} else {
		return "testnet";
	}
}

// export const getRPC = () => {
// 	if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
// 		return process.env.NEXT_PUBLIC_RPC_MAINNET;
// 	return process.env.NEXT_PUBLIC_RPC_TESTNET;
// };

export const SMART_ADDRESS = {
	GREEN_SHOP: {
		testnet: "5DBtSxH8VTzrN4xpcGxb8gKCnuPdFhvEGsiweULteAKtbAj3",
		mainnet: "",
	},
	GREEN_LAUNCHER: {
		testnet: "0x675f0C051509941BFC94eED759e35102bdc01d93",
		mainnet: "",
	},
	GREEN_TOKEN: {
		testnet: "5GhZXmM6CAQXjhKuKrLjhxteFf8k3JmE9YA3dwd5iiJSvzrj",
		mainnet: "",
	},
	GREEN_NFT: {
		testnet: "5DxH4yhewgDzahrqCxT28j5qGeCjAsXUcM1BSiYZbPiT4pa7",
		mainnet: "",
	},
};
