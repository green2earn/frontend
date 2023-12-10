import Image from "next/image";
import { useState } from "react";
import SetUpSolarSystem from "./SetUpSolarSystem";
import truncate from "@/utils";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import {
	setContentInformationPopup,
	setShowInformationPopup,
	setToggleIsEdited,
} from "@/stores/greenLauncherSlice";
import { IMarker } from "@/models/common";
import GreenLauncherContract from "@/contracts/ethereum/GreenLauncherContract";
import GreenTokenContract from "@/contracts/ethereum/GreenTokenContract";

interface Iprops {
	setDisplayProject: React.Dispatch<React.SetStateAction<boolean>>;
	displayProject: boolean;
	setDraw: React.Dispatch<React.SetStateAction<boolean>>;
	setSetupSolar: React.Dispatch<React.SetStateAction<boolean>>;
	setUpSolar: boolean;
	showResults: boolean;
	setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
	setAddedMaker: React.Dispatch<React.SetStateAction<IMarker | undefined>>;
	addedMarker?: IMarker;
}

const CreateGreenLauncherProject = (props: Iprops) => {
	const { api } = useAppSelector((state: RootState) => state.polkadotApi);
	const { wallet } = useAppSelector((state: RootState) => state.nearWallet);
	const { web3Provider, walletAddress } = useAppSelector(
		(state) => state.etherWallet
	);
	const [displayDropdown, setDisplayDropdown] = useState<boolean>(false);
	const [showProject, setShowProject] = useState(false);
	const dispatch = useAppDispatch();
	return (
		<>
			{props.setUpSolar ? (
				<SetUpSolarSystem
					setUpSolar={props.setUpSolar}
					setDraw={props.setDraw}
					setSetUpSolar={props.setSetupSolar}
					showResults={props.showResults}
					setShowResults={props.setShowResults}
					setDisplayProject={props.setDisplayProject}
					setAddedMaker={props.setAddedMaker}
					addedMarker={props.addedMarker}
				/>
			) : (
				<div
					className={` h-full ${
						props.displayProject ? "open1" : "close1"
					} overflow-scroll scrollbar-hide `}
				>
					<div
						onClick={() => props.setDisplayProject(false)}
						className="h-[50px] px-5 mt-[20px] relative  flex-center "
					>
						<Image
							className="cursor-pointer"
							src="/assets/images/next 2.png"
							alt=""
							width={30}
							height={30}
						/>
						<h5 className="text-[#09A507] text-[24px] absolute left-1/2 translate-x-[-50%]  font-[500] leading-[50px]  font-[SVN-Product Sans]">
							My project
						</h5>
					</div>
					<div className="h-[1px] w-full bg-[#525252] mt-2"></div>
					<div>
						<div>
							<div className="my-7  px-3 flex-center justify-between border-b-[1px]">
								<div className="flex-center ">
									<Image
										src="/assets/images/Icon base color.png"
										width={32}
										height={32}
										alt=""
									/>
									<span className="text-[14px] ml-2">
										Solar System
									</span>
								</div>
								<svg
									onClick={() => setShowProject(!showProject)}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</div>
							{showProject && (
								<div>
									<ul className="px-[30px] w-full ">
										<li className="my-3 border-b-[1px] w-full flex-center justify-between">
											<p className="text-[14px]">
												{truncate(
													"29 - 31 Bui Thi Xuan St, Ben Thanh Ward, District 1, Ho Chi Minh City, 848, Vietnam",
													50
												)}
											</p>
											<div className="flex-center">
												<Image
													className="cursor-pointer"
													src="/assets/images/Edit Location.png"
													width={34}
													height={34}
													alt=""
												/>
												<Image
													className="cursor-pointer ml-2"
													src="/assets/images/Trash.png"
													width={34}
													height={34}
													alt=""
												/>
											</div>
										</li>
										<li className="my-3 border-b-[1px] w-full flex-center justify-between">
											<p className="text-[14px]">
												{truncate(
													"29 - 31 Bui Thi Xuan St, Ben Thanh Ward, District 1, Ho Chi Minh City, 848, Vietnam",
													50
												)}
											</p>
											<div className="flex-center">
												<Image
													className="cursor-pointer"
													src="/assets/images/Edit Location.png"
													width={34}
													height={34}
													alt=""
												/>
												<Image
													className="cursor-pointer ml-2"
													src="/assets/images/Trash.png"
													width={34}
													height={34}
													alt=""
												/>
											</div>
										</li>
									</ul>
								</div>
							)}
						</div>
						<div className="my-7 px-3 flex-center justify-between border-b-[1px]">
							<div className="flex-center">
								<Image
									src="/assets/images/Icon base color (1).png"
									width={32}
									height={32}
									alt=""
								/>
								<span className="text-[14px] ml-2">
									Wind Turbines
								</span>
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6 cursor-pointer"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
					</div>
					<div className="w-full height-launcher flex-center justify-center ">
						<div className="h-full w-full flex-center flex-col mt-[30px]">
							<Image
								src="/assets/images/greenlauncher.png"
								width={132}
								height={132}
								alt=""
							/>
							<h5 className="text-[18px] mt-2 mb-7 ">
								Make a new project
							</h5>
							<div className="w-[244px] h-[40px] relative flex-center  border rounded-sm text-white  ">
								<p
									className={`w-[204px] h-full ${
										displayDropdown
											? "bg-btn"
											: "bg-convert"
									} text-center leading-[40px]`}
								>
									Create
								</p>
								<div
									onClick={async () => {
										if (!api) return;
										const balanceOf =
											await api.query.system.accout(
												walletAddress
											);
										console.log(
											"balanceOf",
											balanceOf.toHuman()
										);
										// if (balanceOf.toHuman() > 0) {
										// 	setDisplayDropdown(
										// 		!displayDropdown
										// 	);
										// } else {
										// 	dispatch(
										// 		setShowInformationPopup(true)
										// 	);
										// 	dispatch(
										// 		setContentInformationPopup({
										// 			type: "warm_deposit",
										// 			data: {
										// 				required_deposit: "50",
										// 			},
										// 		})
										// 	);
										// }
									}}
									className="w-[40px] flex-center cursor-pointer justify-center"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-5 h-5 text-[#323232]"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
								</div>
								<div
									className={`absolute top-[39px] ${
										displayDropdown
											? "displayDropdown"
											: "notDisplayDropdown"
									} px-4 bg-[#303235] w-full py-4`}
								>
									<div
										onClick={() => {
											props.setSetupSolar(true),
												setDisplayDropdown(false);
											dispatch(setToggleIsEdited(false));
										}}
										className=" flex-center cursor-pointer border-b-[1px] text-white "
									>
										<Image
											src="/assets/images/Icon base color.png"
											width={32}
											height={32}
											alt=""
										/>
										<span className="ml-3">
											Setup Solar System
										</span>
									</div>
									<div className=" flex-center cursor-pointer border-b-[1px] mt-[10px] text-white ">
										<Image
											src="/assets/images/Icon base color (1).png"
											width={32}
											height={32}
											alt=""
										/>
										<span className="ml-3">
											Setup Wind Turbine
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CreateGreenLauncherProject;
