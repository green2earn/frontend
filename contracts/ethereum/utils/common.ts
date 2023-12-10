export type AddressType = {
	338: string;
	25: string;
};

export enum CHAIN_ID {
	TESTNET = 338,
	MAINNET = 25,
}

export default function getChainIdFromEnv(): number {
	const env = process.env.NEXT_PUBLIC_CHAIN_ID;
	if (!env) {
		return 338;
	}
	return parseInt(env);
}

export const getRPC = () => {
	if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
		return process.env.NEXT_PUBLIC_RPC_MAINNET;
	return process.env.NEXT_PUBLIC_RPC_TESTNET;
};

export const SMART_ADDRESS = {
	GREEN_SHOP: { 338: "0x675f0C051509941BFC94eED759e35102bdc01d93", 25: "" },
	GREEN_LAUNCHER: {
		338: "0x02dA1F2Dab05feB34CF17A4661456a6B54cb15bF",
		25: "",
	},
	GREEN_TOKEN: {
		338: "0xdd139fb9a2a4320385c75ecde07a3101b224377e",
		25: "",
	},
	GREEN_NFT: {
		338: "0x0eC90B7937c55de910373588b939dFaBA40A31bc",
		25: "",
	},
};
