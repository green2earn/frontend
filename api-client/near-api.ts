import { utils } from "near-api-js";

export class RabbitNft {
	contractId: any;
	wallet: any;

	constructor({ contractId, walletToUse }: any) {
		this.contractId = contractId;
		this.wallet = walletToUse;
	}

	async getNftInfo(tokenId: string) {
		return await this.wallet.viewMethod({
			contractId: this.contractId,
			method: "get_nft_info",
			args: { token_id: tokenId },
		});
	}

	async getUserNfts(ownerId: string) {
		return await this.wallet.viewMethod({
			contractId: this.contractId,
			method: "get_tokens_metadata_by_owner",
			args: { owner_id: ownerId },
		});
	}
}
