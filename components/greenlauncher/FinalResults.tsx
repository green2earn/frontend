import { greenLauncherApi } from "@/api-client/green-launcher-api";
import { IMarker } from "@/models/common";
import {
	activeDisplayInterverList,
	activeDisplayPanelList,
} from "@/stores/activeButtonSlice";
import {
	setContentInformationPopup,
	setShowInformationPopup,
	setToggleIsEdited,
} from "@/stores/greenLauncherSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { popuploginPage } from "@/stores/toggleSlice";
import truncate from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface Iprops {
	setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
	setDisplayProject: React.Dispatch<React.SetStateAction<boolean>>;
	setSetupSolar: React.Dispatch<React.SetStateAction<boolean>>;
	setDraw: React.Dispatch<React.SetStateAction<boolean>>;
	addedMarker: IMarker | undefined;
}
import { toast } from "react-toastify";

const FinalResults = (props: Iprops) => {
	const { wallet } = useAppSelector((state: RootState) => state.nearWallet);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	
	//const router = useRouter()
	const { product, results, inverter } = useAppSelector(
		(state) => state.greenLauncher
	);
	const { polylines } = useAppSelector((state) => state.draw);
	const dispatch = useAppDispatch();
	const { isLoggedin } = useAppSelector((state) => state.auth);
	useEffect(() => {
		dispatch(activeDisplayPanelList(false));
		dispatch(activeDisplayInterverList(false));
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1500);
		return () => clearTimeout(timeout);
	}, []);
	const handleToastClick = (
		total_construction_cost: string,
		title: string,
		code: string
	) => {
		// Xử lý sự kiện khi thông báo được click
		dispatch(setShowInformationPopup(true));
		dispatch(
			setContentInformationPopup({
				type: "create_token",
				data: { total_construction_cost, title, code },
			})
		);
	};
	const handleSaveToDB = async () => {
		if (isLoggedin) {
			props.setShowResults(false);
			dispatch(setToggleIsEdited(false));
			try {
				// const data = {
				// 	total_construction_cost: "",
				// 	title: "",
				// 	code: "",
				// };
				const { data } = await greenLauncherApi.createGreenLauncher({
					title: results.title,
					status: "Pending",
					roof_type: Number(results.roof_type),
					area: results.area,
					region_id: Number(results.region_id),
					points:
						polylines.length > 0
							? JSON.stringify(polylines)
							: `(${props.addedMarker?.latitude}, ${props.addedMarker?.longitude})`,
					category_id: 1,
					launcher_type_id: Number(results.launcherType),
				});
				console.log("dataBE", data);
				toast(
					<div
						onClick={() =>
							handleToastClick(
								data?.total_construction_cost,
								data?.title,
								data?.code
							)
						}
					>
						<p>
							Created a project successfully. Please create tokens
							for the project.
						</p>
					</div>
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			dispatch(popuploginPage());
		}
	};
	const handleClickEdit = () => {
		
		dispatch(setToggleIsEdited(true));
		props.setShowResults(false);
		props.setDisplayProject(true);
		props.setSetupSolar(true);
		props.setDraw(true);
	};
	const convertToNear = (x: number) => {
		return Math.round(x / 23500 / 1.2);
	};
	return (
		<div className="h-full w-full flex-center  justify-center">
			{isLoading ? (
				<div className="w-full h-full flex-center justify-center flex-col">
					<Image
						src="/assets/images/Loading.gif"
						width={300}
						height={300}
						alt=""
					/>
					<h2 className="text-[46px] text-white">Caculating...</h2>
				</div>
			) : (
				<div className=" w-[60%] border-white border-[1px] bg-white shadow-md rounded-[20px] py-7 px-[150px] flex-center flex-col justify-center layout">
					<div className="grid grid-cols-2 gap-x-4  text-[20px]  w-full h-[50px]">
						<div className="relative col-span-1 border bg-white  leading-[50px] text-center font-bold rounded-[10px]">
							<span className="text-[#f8777d]">
								{results.area} m2
							</span>
							<span className="absolute top-[-10px] text-[14px] leading-[20px] z-[12] left-[20px] bg-white">
								Project Area
							</span>
						</div>
						<div className=" relative col-span-1 border font-bold flex-center justify-center flex-col rounded-[10px]">
							<span className="text-[#f8777d]">
								{results.radiant_per_day}Khw/m2/day
							</span>
							<span className="absolute top-[-10px] text-[14px] leading-[20px]  z-[12] left-[20px] bg-white">
								Solar Radiation
							</span>
						</div>
					</div>
					<div className="w-full relative h-[230px] flex-center justify-between font-bold border pl-[50px] my-[20px] rounded-[16px]">
						<span className="absolute top-[-10px] text-[14px] leading-[20px] z-[12] translate-x-[-50%] left-[50%] bg-white">
							Breakdown Quotation
						</span>

						<div className="w-[100%]">
							<div className="relative h-[60px] text-[17px]  border   flex-center w-[90%] justify-center flex-col rounded-[10px]">
								<span className="absolute top-[-10px] text-[12px] leading-[20px] left-[20px] bg-white">
									Solar Panel
								</span>
								<span>{truncate(product.title, 30)}:</span>
								<span className="text-[#f8777d] flex flex-row justify-center items-center">
									{convertToNear(parseInt(product.price))}
									<img
										src="/assets/images/near.png"
										alt=""
										className="h-[15px] mx-[5px]"
									/>
								</span>
							</div>
							<div className="relative h-[60px] text-[17px] my-3  border   flex-center w-[90%] justify-center flex-col rounded-[10px]">
								<span>{truncate(inverter.title, 30)}</span>
								<span className="text-[#f8777d] flex flex-row justify-center items-center">
									{convertToNear(parseInt(inverter.price))}
									<img
										src="/assets/images/near.png"
										alt=""
										className="h-[15px] mx-[5px]"
									/>
								</span>
								<span className="absolute top-[-10px] text-[12px] leading-[20px] left-[20px] bg-white">
									Inverter
								</span>
							</div>
							<div className="relative h-[60px] text-[17px]  border  flex-center w-[90%] justify-center flex-col rounded-[10px]">
								<span>
									Lắp đặt + Phụ kiện: Nhà thầu Green World
								</span>
								<span className="text-[#f8777d] flex flex-row justify-center items-center">
									{convertToNear(23900000)}
									<img
										src="/assets/images/near.png"
										alt=""
										className="h-[15px] mx-[5px]"
									/>
								</span>
								<span className="absolute top-[-10px] text-[12px] leading-[20px] left-[20px] bg-white">
									Contractor
								</span>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-4 text-[17px] font-bold w-full h-[50px]">
						<div className="relative col-span-1 border flex-center justify-center flex-col rounded-[10px]">
							<span className="text-[#ba1f19]">
								{Math.round(results.average_power)}Kwh
							</span>
							<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
								Average Daily Power
							</span>
						</div>
						<div className="relative col-span-1 border  flex-center justify-center flex-col rounded-[10px]">
							<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
								Average Daily Revenue
							</span>
							<span className="text-[#ba1f19] flex flex-row justify-center items-center">
								{convertToNear(results.average_revenue)}
								<img
									src="/assets/images/near.png"
									alt=""
									className="h-[15px] mx-[5px]"
								/>
							</span>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-4 mt-7 text-[20px]  w-full h-[50px]">
						<div className="relative col-span-1 border bg-white  leading-[50px] text-center font-bold rounded-[10px]">
							<span className="text-[#ba1f19] flex flex-row justify-center items-center">
								{convertToNear(results.Total_cost)}
								<img
									src="/assets/images/near.png"
									alt=""
									className="h-[15px] mx-[5px]"
								/>
							</span>
							<span className="absolute top-[-10px] text-[14px] leading-[20px] z-[12] left-[20px] bg-white">
								Total Cost
							</span>
						</div>
						<div className=" relative col-span-1 border font-bold flex-center justify-center flex-col rounded-[10px]">
							<span className="text-[#ba1f19]">
								{results.payback_time} year{" "}
							</span>
							<span className="absolute top-[-10px] text-[14px] leading-[20px] z-[12] left-[20px] bg-white">
								Payback Time
							</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-x-4 text-[17px] mt-4 text-white w-full h-[50px]">
						<div
							onClick={handleSaveToDB}
							className="col-span-1 cursor-pointer border bg-[#29de48] flex-center justify-center flex-col rounded-[10px]"
						>
							Save
						</div>
						<div
							onClick={handleClickEdit}
							className="col-span-1 cursor-pointer border bg-[#29de48] flex-center justify-center flex-col rounded-[10px]"
						>
							Adjust
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FinalResults;
