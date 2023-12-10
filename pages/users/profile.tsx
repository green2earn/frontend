import Footer from "@/components/home/Footer";
import { MainLayout } from "@/components/layout/MainLayout";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { useEffect, useState } from "react";
import GreenLauncherContract from "@/contracts/ethereum/GreenLauncherContract";
import { getGreenTokenAddress } from "@/contracts/ethereum/utils/getAddress";
import Erc20Contract from "@/contracts/ethereum/Erc20Contract";
import Loading from "@/components/Loading";
import GreenNftContract from "@/contracts/ethereum/GreenNftContract";
import { capitalizeWords } from "@/utils";
import {
	contractQuery,
	decodeOutput,
	useInkathon,
	useRegisteredContract,
} from "@scio-labs/use-inkathon";
import { toast } from "react-toastify";

const UserProfilePage = () => {
	const { contract: GreenTokenContract } =
		useRegisteredContract("greenTokenContract");
	const { contract: GreenNftContract } =
		useRegisteredContract("greenNftContract");
	const [loading, setLoading] = useState<boolean>(false);
	const { api } = useAppSelector((state: RootState) => state.polkadotApi);
	const {
		first_name,
		last_name,
		email,
		role: roleUser,
	} = useAppSelector((state) => state.auth);
	const [tokens, setTokens] = useState<any>([]);
	const [active, setActive] = useState<number>(1);
	const [nft, setNFT] = useState<number>(0);
	const [totalG2e, setTotalG2e] = useState<number>();
	const { api: AlerphZeroApi, activeAccount, activeSigner } = useInkathon();

	const handleActive = (x: number) => {
		setActive(x);
	};

	const getNFTs = async () => {
		// let greenNft: any[] = [];
		// if (!web3Provider || !walletAddress) {
		// 	return;
		// }
		// const greenNftContract = new GreenNftContract(web3Provider);
		// const balanceOf = await greenNftContract.balanceOf(walletAddress);
		// const ownerNfts = await greenNftContract.ownerNFTs(
		// 	walletAddress,
		// 	balanceOf
		// );
		// ownerNfts.forEach(async (ownerNft) => {
		// 	const id = greenNftContract._toNumber(ownerNft);
		// 	const tokenURI = await greenNftContract.tokenURI(id);
		// 	greenNft.push(tokenURI);
		// });
		if (
			!activeAccount ||
			!GreenNftContract ||
			!activeSigner ||
			!AlerphZeroApi
		) {
			toast.error("Wallet not connected. Try again…");
			return;
		}
		const respolkadot = await contractQuery(
			AlerphZeroApi,
			activeAccount.address,
			GreenNftContract,
			"balance_of",
			{},
			[activeAccount.address]
		);
		const { decodedOutput: balanceOfHuman } = decodeOutput(
			respolkadot,
			GreenNftContract,
			"balance_of"
		);
		setNFT(parseInt(balanceOfHuman));
	};
	const getTokensGreenLauncher = async () => {
		// if (!web3Provider || !walletAddress) {
		// 	return;
		// }
		// const greenLauncherContract = new GreenLauncherContract(web3Provider);
		// const res = await greenLauncherContract.getProjectsByOwner(
		// 	walletAddress
		// );
		// if (res.length <= 0) {
		// 	return;
		// }
		// res.forEach(async (tokenAddress: string) => {
		// 	const erc20Contract = new Erc20Contract(web3Provider, tokenAddress);
		// 	const balanceOf = await erc20Contract._contract.balanceOf(
		// 		walletAddress
		// 	);
		// 	const symbol = await erc20Contract._contract.symbol();
		// 	const name = await erc20Contract._contract.name();
		// 	const decimals = await erc20Contract._contract.decimals();
		// 	let temp_tokens = {
		// 		id: tokenAddress,
		// 		balanceOf: `${balanceOf / Math.pow(10, decimals)}`,
		// 		name,
		// 		symbol,
		// 	};
		// 	ret_tokens.push(temp_tokens);
		// 	setTokens((preState: any[]) => [...preState, temp_tokens]);
		// });
		let ret_tokens: any = {};
		const tokens = await api?.query.assets.asset.entries();
		tokens?.forEach(([key, value]) => {
			const assetId = key.args.map((k) => k.toHuman());
			const assetDetails = value.toHuman();
			ret_tokens = { ...ret_tokens, [`${assetId}`]: assetDetails };
		});
		const metadatas = await api?.query.assets.metadata.entries();
		metadatas?.forEach(([key, value]) => {
			const assetId = key.args.map((k) => k.toHuman());
			const assetDetails = value.toHuman();
			let assetData = {
				...ret_tokens[`${assetId}`],
				...Object(assetDetails),
			};
			ret_tokens = { ...ret_tokens, [`${assetId}`]: assetData };
		});
		let token_arr: any[] = Object.values(ret_tokens);
		setTokens(token_arr);
	};
	const getToTalG2e = async () => {
		// if (!web3Provider || !walletAddress) {
		// 	return;
		// }
		// const erc20Contract = new Erc20Contract(
		// 	web3Provider,
		// 	getGreenTokenAddress()
		// );
		// const balanceOf = await erc20Contract._contract.balanceOf(
		// 	walletAddress
		// );
		// const balanceOfHuman = erc20Contract._toNumber(balanceOf);
		console.log("activeAccount", activeAccount);
		console.log("GreenTokenContract", GreenTokenContract);
		console.log("activeSigner", activeSigner);
		console.log("api", api);
		if (
			!activeAccount ||
			!GreenTokenContract ||
			!activeSigner ||
			!AlerphZeroApi
		) {
			toast.error("Wallet not connected. Try again…");
			return;
		}
		const respolkadot = await contractQuery(
			AlerphZeroApi,
			activeAccount.address,
			GreenTokenContract,
			"balance_of",
			{},
			[activeAccount.address]
		);
		const { decodedOutput: balanceOfHuman } = decodeOutput(
			respolkadot,
			GreenTokenContract,
			"balance_of"
		);
		setTotalG2e(parseInt(balanceOfHuman.replaceAll(",", "")));
	};
	const shortenEthAddress = (address: string, chars = 8) => {
		if (address && address.length >= 2 + 2 * chars) {
			return address.slice(0, chars) + "..." + address.slice(-chars);
		}
		return address;
	};

	useEffect(() => {
		getTokensGreenLauncher();
	}, []);
	useEffect(() => {
		console.log("GreenTokenContract", GreenTokenContract);
		console.log("GreenNftContract", GreenNftContract);
		if (GreenTokenContract && GreenNftContract) {
			getToTalG2e();
			getNFTs();
		}
	}, [GreenTokenContract, GreenNftContract]);
	return (
		<div className=" w-screen">
			<div className="w-full  relative lg:h-[342px] background-image_profile"></div>
			<div className="h-[700px] bg-slate-300 relative ">
				<div className="absolute top-[-100px] left-0 right-0 w-full px-[200px] ">
					<div className=" w-full h-[628px] flex-center">
						<div className="w-[392px] h-full mr-[24px] flex-col rounded-[8px] px-[16px] py-[24px] flex-center  bg-white border ">
							<div className="w-[220px] h-[299px] flex-center flex-col">
								<img
									src="/assets/images/avata.png"
									alt=""
									className="rounded-[50%] w-[200px] h-[200px]"
								/>
								<p className="text-[35px]">
									{first_name && last_name
										? capitalizeWords(
												`${first_name} ${last_name}`
										  )
										: "Undefined"}
								</p>
							</div>
							<div className="w-[360px] px-[16px] ">
								<div className="w-full mb-4 h-[50px] border-[1px] border-[#C2C2C2] flex-center rounded-[16px] px-[16px] py-[9px]">
									<img src="/assets/images/VectorUser.png" />
									<p className="ml-[30px]">
										{first_name && last_name
											? capitalizeWords(
													`${first_name} ${last_name}`
											  )
											: "Undefined"}
									</p>
								</div>
								<div className="w-full mb-4 h-[50px] border-[1px] border-[#C2C2C2] flex-center rounded-[16px] px-[16px] py-[9px]">
									<img src="/assets/images/VectorPhone.png" />
									<p className="ml-[30px]">+84 98999999</p>
								</div>
								<div className="w-full mb-4 h-[50px] border-[1px] border-[#C2C2C2] flex-center rounded-[16px] px-[16px] py-[9px]">
									<img src="/assets/images/VectorEmail.png" />
									<p className="ml-[30px]">
										{email ? email : "Undefined"}
									</p>
								</div>
								<div className="w-full mb-4 h-[50px] border-[1px] border-[#C2C2C2] flex-center rounded-[16px] px-[16px] py-[9px]">
									<img
										src="/assets/images/wallet_eth.png"
										className="h-[30px] w-[30px]"
									/>
									<p className="ml-[30px]">
										{activeAccount &&
											`${shortenEthAddress(
												activeAccount?.address
											)} (SubWallet)`}
									</p>
								</div>
							</div>
						</div>
						<div className="w-[864px] h-full  rounded-[8px] bg-white ">
							<div className="flex-center h-[80px] border-b-[1px]">
								<div
									onClick={() => handleActive(1)}
									className={`w-[50%] h-full flex-center cursor-pointer   ${
										active === 1
											? "bg-static text-white"
											: "bg-white text-black"
									} justify-center flex-col border-r-[1px] `}
								>
									<p>Your Token</p>
								</div>
								<div
									onClick={() => handleActive(2)}
									className={`w-[50%] h-full cursor-pointer  ${
										active === 2
											? "bg-static text-white"
											: "bg-white text-black"
									} flex-center justify-center flex-col border-r-[1px] `}
								>
									<p>NFT Green To Earn</p>
									<span className="font-bold">
										Green2Earn
									</span>
								</div>
							</div>
							{active === 1 && (
								<div className="flex-col flex">
									{loading ? (
										<Loading />
									) : (
										<div className="w-full ">
											<h3 className="w-full h-[44px] border-b-[1px] leading-[44px] px-[20px] text-[#151414] ">
												Green Project Token
											</h3>
											<div className="flex flex-wrap">
												{tokens.map((i: any) => (
													<div className="flex-center flex-col justify-center mx-[20px]">
														<img
															src="/assets/images/Logo Final 1.png"
															alt=""
														/>
														<span className="text-[#09A507] text-[16px] font-[600]">
															{i.balanceOf}
														</span>
														<span className="text-[#09A507] text-[16px] font-[600]">
															Token
														</span>
														<span className="text-[#323232] font-semibold text-[16px]">
															{i.name}
														</span>
														<span className="text-[#323232] font-[400] text-[14px]">
															{i.symbol}
														</span>
													</div>
												))}
											</div>
										</div>
									)}
									<div className=" w-full  flex flex-row">
										<h3 className="w-full h-[44px] border-y-[1px] mt-7 leading-[44px] px-[20px] text-[#323232] ">
											Carbon Credit Token (G2E):{" "}
											<span className="text-green-600">
												{totalG2e}
											</span>
										</h3>
									</div>
								</div>
							)}
							{active === 2 && (
								<div className="h-[548px] overflow-y-scroll grid grid-cols-4 grid-rows-3 gap-1 py-7 px-4">
									{/* {nft.map((i: any) => (
										<img
											// key={i.token_id}
											src={i}
											alt=""
											className="w-[143px] h-[143px]  rounded-[8px]"
										/>
									))} */}
									{Array.from(
										{ length: nft },
										(_, index) => index + 1
									).map((i: any) => (
										<img
											// key={i.token_id}
											src="/assets/images/Logo Final 1.png"
											alt=""
											className="w-[143px] h-[143px]  rounded-[8px]"
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default UserProfilePage;
UserProfilePage.Layout = MainLayout;
