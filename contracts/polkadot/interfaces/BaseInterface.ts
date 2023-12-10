import { useCall, useContract, ChainContract, useTx } from "useink";

export default class BaseInterface {
	_contract: ChainContract | undefined;
	_contractAddress: string;
	_metadata: any;

	constructor(address: string, metadata: any) {
		console.log('address', address)
		console.log('metadata', metadata)
		this._contractAddress = address;
		this._metadata = metadata;
		this._contract = useContract(address, metadata, "aleph-testnet");
	}

	_viewMethod = async (methodName: string, args: any[]) => {
		const transaction = useCall(this._contract, methodName);
		return transaction.send(args);
	};

	_callMethod = async (methodName: string, args: any[]) => {
		const transaction = useTx(this._contract, methodName);
		return transaction.signAndSend(args);
	};
}
