import React, { useEffect, useState } from "react";
import Rating from "./Rating";
import { getDetailGreenPoint } from "@/api-client/green-point-api";
import { ResGreenPoint } from "@/models/common";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/stores/store";
import { setIdInfoGP } from "@/stores/greenMapSlice";

interface propInformationGreenPoint {
	id: null | number;
}

export default function InformationGreenPoint() {
	const dispatch = useAppDispatch();
	const { idInfoGP } = useSelector((state: RootState) => state.map);
	const [tab, setTab] = useState<Number>(1);
	const [classTabOverview, setClassTabOverview] = useState<string>(
		"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
	);
	const [classTabReview, setClassTabReview] = useState<string>(
		"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
	);
	const [classTabAbout, setClassTabAbout] = useState<string>(
		"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
	);
	const [loading, setLoading] = useState<boolean>(false);
	const [infoGP, setInfoGP] = useState<ResGreenPoint | null>(null);
	useEffect(() => {
		if (tab === 1) {
			setClassTabOverview(
				"font-bold text-[#09A507] border-b-[3px] border-b-[#09A507] px-[auto] w-1/3 text-center py-[8px] hover:cursor-pointer"
			);
			setClassTabReview(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
			setClassTabAbout(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
		} else if (tab === 2) {
			setClassTabOverview(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
			setClassTabReview(
				"font-bold text-[#09A507] border-b-[3px] border-b-[#09A507] px-[auto] w-1/3 text-center py-[8px] hover:cursor-pointer"
			);
			setClassTabAbout(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
		} else if (tab === 3) {
			setClassTabOverview(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
			setClassTabReview(
				"font-normal text-[#323232] border-b-[2px] border-b-[#C2C2C2] w-1/3 text-center py-[8px] hover:cursor-pointer hover:text-[#09A507]"
			);
			setClassTabAbout(
				"font-bold text-[#09A507] border-b-[3px] border-b-[#09A507] px-[auto] w-1/3 text-center py-[8px] hover:cursor-pointer"
			);
		}
	}, [tab]);
	useEffect(() => {
		const getInfo = async () => {
			setLoading(true);
			if (idInfoGP) {
				const res = await getDetailGreenPoint(idInfoGP);
				if (res.status === 200) {
					res.data && setInfoGP(res.data);
					setLoading(false);
				}
			}
		};
		getInfo();
	}, [idInfoGP]);

	return (
		<>
			{idInfoGP && (
				<div className="animation_infomation_green_point w-[420px] heigh_google_map bg-white flex flex-col hide-scrollbar overflow-y-auto relative">
					<button
						onClick={() => {
							dispatch(setIdInfoGP(null));
						}}
					>
						<img
							src="/assets/images/close_circle.svg"
							alt=""
							className="w-[24px] h-[24px] absolute top-[10px] right-[10px]"
						/>
					</button>
					{!loading ? (
						<>
							{infoGP ? (
								<>
									<img
										src="/assets/images/picture-wind-example.svg"
										alt=""
									/>
									<div className="flex flex-col px-[40px] mt-[24px]">
										<div className="flex flex-row">
											<div className="text-[24px] font-bold mr-[10px]">
												{infoGP.name}
											</div>
											{infoGP.status === "Pending" ? (
												<img
													src="/assets/images/pending_tick.svg"
													alt=""
												/>
											) : infoGP.status === "Verify" ? (
												<img
													src="/assets/images/verify_tick.svg"
													alt=""
												/>
											) : (
												<img
													src="/assets/images/onchain_tick.svg"
													alt=""
												/>
											)}
										</div>
										<div className="text-[14px] font-normal text-[#09A507]">
											{infoGP.category.id === 1
												? "Green Solar"
												: infoGP.category.id === 2
												? "Green Wind"
												: infoGP.category.id === 3
												? "Green Shop"
												: infoGP.category.id === 4
												? "Green Charge"
												: infoGP.category.id === 5
												? "Green Factory"
												: ""}
										</div>
										<div className="flex flex-row mt-[4px]">
											<img
												src="/assets/images/StarFill.svg"
												alt=""
											/>
											<img
												src="/assets/images/StarFill.svg"
												alt=""
											/>
											<img
												src="/assets/images/StarFill.svg"
												alt=""
											/>
											<img
												src="/assets/images/StarNone.svg"
												alt=""
											/>
											<img
												src="/assets/images/StarNone.svg"
												alt=""
											/>
											<div className="ml-[8px]">
												{"(10)"}
											</div>
										</div>
										<div className="flex flex-row mt-[20px] text-[16px]">
											<button
												className={classTabOverview}
												onClick={(
													e: React.MouseEvent<HTMLElement>
												) => {
													setTab(1);
												}}
											>
												<div>Overview</div>
											</button>
											<button
												className={classTabReview}
												onClick={() => {
													setTab(2);
												}}
											>
												<div>Reviews</div>
											</button>
											<button
												className={classTabAbout}
												onClick={() => {
													setTab(3);
												}}
											>
												<div>About</div>
											</button>
										</div>
										{(tab === 1 || tab === 3) && (
											<div className="">
												<div className="text-[16px] font-bold mt-[15px]">
													Infomations
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_person.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														Gordon
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_phone.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														{infoGP.phone_number}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_identification_card.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														#123456789
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_location.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														{infoGP.address}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] mb-[40px] items-center">
													<img
														src="/assets/images/icon_earth.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														{infoGP.website}
													</div>
												</div>
											</div>
										)}
										{(tab === 1 || tab === 3) && (
											<div className="border-b-[2px] border-b-[#C2C2C2]"></div>
										)}
										{(tab === 1 || tab == 3) && (
											<div className="mt-[20px]">
												<div className="text-[16px] font-bold">
													About
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_calendar.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														06/09/2023
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_verify_tick.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														02/09/2023
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_onchain.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														05/09/2023
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_fan.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															Power:
														</span>
														{` ${infoGP.performance} kwh`}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_co2.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															CO2 Emissions
															Reduction:
														</span>
														{` ${infoGP.reduction_co2} kwh`}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src={
															infoGP.category
																.id === 1
																? "/assets/images/icon_solar.svg"
																: infoGP
																		.category
																		.id ===
																  2
																? "/assets/images/icon_location_wind.svg"
																: infoGP
																		.category
																		.id ===
																  3
																? "/assets/images/icon_shop.svg"
																: infoGP
																		.category
																		.id ===
																  4
																? "/assets/images/icon_charge.svg"
																: infoGP
																		.category
																		.id ===
																  5
																? "/assets/images/icon_factory.svg"
																: "/assets/images/icon_marker.svg"
														}
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[16px] font-semibold ml-[16px] text-green-600">
														Brand Logo
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_longtitude.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															Longitude:
														</span>
														{` ${infoGP.longitude}`}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_lattitude.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															Latitude:
														</span>
														{` ${infoGP.latitude}`}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] items-center">
													<img
														src="/assets/images/icon_circle_c02.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															Total CO2 Emissions
															Reduction:
														</span>
														{` ${infoGP.reduction_co2}`}
													</div>
												</div>
												<div className="flex flex-row mt-[20px] mb-[40px] items-center">
													<img
														src="/assets/images/icon_onchain.svg"
														alt=""
														className="w-[32px] h-[32px]"
													/>
													<div className="text-[14px] font-normal ml-[16px]">
														<span className="text-[16px] font-semibold text-green-600">
															The number of G2E
															tokens earned by
															GreenPoint:
														</span>
														{` ${infoGP.total_token_earned}`}
													</div>
												</div>
											</div>
										)}
										{tab === 1 && (
											<div className="border-b-[2px] border-b-[#C2C2C2]"></div>
										)}
										{tab === 1 && (
											<div className="">
												<div className="text-[16px] font-bold mt-[15px]">
													Photo
												</div>
												<div className="flex flex-row mt-[20px] justify-between">
													<img
														src="assets/images/picture-example-1.svg"
														alt=""
														className="rounded-[8px] w-1/3 p-1"
													/>
													<img
														src="assets/images/picture-example-2.svg"
														alt=""
														className="rounded-[8px] w-1/3 p-1"
													/>
													<img
														src="assets/images/picture-example-3.svg"
														alt=""
														className="rounded-[8px] w-1/3 p-1"
													/>
												</div>
											</div>
										)}
										{tab === 1 && (
											<div className="border-b-[2px] border-b-[#C2C2C2] my-[16px]"></div>
										)}
										{(tab === 1 || tab === 2) && (
											<div className="mt-[10px]">
												<div className="text-[16px] font-bold mb-[20px]">
													Reviews summary
												</div>
												<Rating />
												<button className="flex flex-row custom_buttom mx-[auto] mt-[4px]">
													<div className="text-[14px] font-normal text-white">
														Write a review
													</div>
													<img
														src="/assets/images/icon_pencil.svg"
														alt=""
														className="w-[18px] h-[18px]"
													/>
												</button>
												<div className="text-[16px] font-bold mb-[20px]">
													Reviews
												</div>
												<div className="flex flex-row items-center">
													<img
														src="/assets/images/avatar-example.svg"
														alt=""
														className="w-[48px] h-[48px] rounded-full mr-[8px]"
													/>
													<div className="text-[16px] font-normal text-[#323232]">
														Gordon
													</div>
												</div>
												<div className="flex flex-row mt-[8px]">
													<div className="flex flex-row mr-[12px]">
														<img
															src="/assets/images/StarFill.svg"
															alt=""
														/>
														<img
															src="/assets/images/StarFill.svg"
															alt=""
														/>
														<img
															src="/assets/images/StarFill.svg"
															alt=""
														/>
														<img
															src="/assets/images/StarNone.svg"
															alt=""
														/>
														<img
															src="/assets/images/StarNone.svg"
															alt=""
														/>
													</div>
													<div className="text-[12px] font-normal text-[#525252]">
														2 days ago
													</div>
												</div>
												<div className=" text-[12px] text-[#181818] font-normal mt-[15px]">
													{
														"Wonderful place with awesome games (boardgames and console games). Above all, the staff was amazing."
													}
												</div>
												<img
													src="/assets/images/picture-example-4.svg"
													alt=""
													className="mt-[12px]"
												/>
											</div>
										)}
										<div className="w-full h-[40px]"></div>
									</div>
								</>
							) : (
								<div className="mx-[auto] my-[auto] text-[16px]">
									Không có thông tin về green point
								</div>
							)}
						</>
					) : (
						<div className="mx-[auto] my-[auto] w-1/3">
							<Loading />
						</div>
					)}
				</div>
			)}
		</>
	);
}
