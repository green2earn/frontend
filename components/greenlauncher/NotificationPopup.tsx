declare let window: any;
import { setShowInformationPopup } from "@/stores/greenLauncherSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import React, { useState } from "react";
import GreenLauncherContract from "@/contracts/ethereum/GreenLauncherContract";
import { toast } from "react-toastify";

interface typeNotificationPopup {
	// content: string;
}

export default function NotificationPopup({}: typeNotificationPopup) {
	const { api, accounts } = useAppSelector(
		(state: RootState) => state.polkadotApi
	);
	// const { web3Provider, walletAddress } = useAppSelector(
	// 	(state) => state.etherWallet
	// );
	const dispatch = useAppDispatch();
	const { contentInformationPopup } = useAppSelector(
		(state: RootState) => state.greenLauncher
	);
	const [loading, setLoading] = useState<boolean>(false);
	const function_deposit_token = async (required_deposit: string) => {
		setLoading(true);
		// await wallet?.callMethod({
		// 	contractId: process.env
		// 		.NEXT_PUBLIC_SMART_CONTRACT_FT_LAUNCHER_FACTORY as string,
		// 	method: "storage_deposit",
		// 	deposit: `${required_deposit}`,
		// 	walletCallbackUrl: "",
		// });
		setLoading(false);
	};
	const function_create_token = async (
		total_construction_cost: string,
		title: string,
		code: string,
		id: number
	) => {
		setLoading(true);
		// if (!web3Provider || !walletAddress) return;
		// const greenLauncherContract = new GreenLauncherContract(web3Provider);
		// console.log("greenLauncherContract", greenLauncherContract);
		// const res = await greenLauncherContract.createToken(
		// 	title,
		// 	code,
		// 	18,
		// 	parseInt(total_construction_cost),
		// 	walletAddress
		// );
		// console.log("res", res);
		if (api?.isReady) {
			const extensionDapp = require("@polkadot/extension-dapp");
			const injector = await extensionDapp.web3FromSource(
				accounts[0].meta.source
			);
			const createTokenTransaction = api.tx.greenLauncher.createToken(
				id,
				title,
				code,
				18,
				total_construction_cost
			);
			await createTokenTransaction.signAndSend(accounts[0].address, {
				signer: injector.signer,
			});
			toast.success("Minted token successfully");
		}
		setLoading(false);
		dispatch(setShowInformationPopup(false));
	};

	return (
		<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[1000] flex justify-center items-center">
			<div className="w-1/3 h-1/3 bg-white flex justify-center items-center flex-col rounded-[20px]">
				{loading ? (
					<img
						src="/assets/images/Loading.gif"
						alt=""
						className="w-[100px]"
					/>
				) : (
					<>
						<img
							src="/assets/images/infomation_icon.png"
							alt=""
							className="w-1/5"
						/>
						<div className="my-[10px] text-center mx-[10px]">
							{contentInformationPopup?.type === "warm_deposit"
								? "You have to deposit a mount of token to make a project"
								: contentInformationPopup?.type ===
								  "create_token"
								? "The process of evaluating the practical project has been completed. Do you want to generate tokens for this project?"
								: ""}
						</div>
						<div className="flex flex-row mt-[10px]">
							<button
								onClick={() =>
									contentInformationPopup &&
									contentInformationPopup.data
										.total_construction_cost &&
									contentInformationPopup.data.title &&
									contentInformationPopup.data.code &&
									contentInformationPopup.data.id &&
									function_create_token(
										contentInformationPopup.data
											.total_construction_cost,
										contentInformationPopup.data.title,
										contentInformationPopup.data.code,
										contentInformationPopup.data.id
									)
								}
								className="mr-2 px-6 py-1 bg-green-500 rounded-full justify-center items-center text-white font-semibold text-[18px] hover:border-[1px] hover:border-green-500 hover:bg-white hover:text-green-500"
							>
								Yes
							</button>
							<button
								onClick={() =>
									dispatch(setShowInformationPopup(false))
								}
								className="ml-2 px-6 py-1 rounded-full hover:border-[1px] hover:border-red-600 hover:bg-white hover:text-red-600 justify-center items-center bg-red-500"
							>
								No
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
