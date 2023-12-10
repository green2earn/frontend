import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import truncate, {
	caculatElectricityOutput,
	caculationCost,
	coordinateToAddressAddGreenPoint,
} from "@/utils";
import {
	activeDisplayInterverList,
	activeDisplayPanelList,
} from "@/stores/activeButtonSlice";
import {
	FormOfUsingElectricityResponse,
	LauncherTypeResponse,
} from "@/models/greenLauncher";
import { greenLauncherApi } from "@/api-client/green-launcher-api";
import * as geolib from "geolib";
import { getRegionOfProvince } from "@/utils/getRegionOfProvince";
import { toast } from "react-toastify";
import { setToggleIsEdited, showResults } from "@/stores/greenLauncherSlice";
import { refreshPolyline, setTotalArea } from "@/stores/drawSlice";
import _ from "lodash";
import { IMarker } from "@/models/common";
interface Iprops {
	setDisplayProject: React.Dispatch<React.SetStateAction<boolean>>;
	setUpSolar: boolean;
	setDraw: React.Dispatch<React.SetStateAction<boolean>>;
	setSetUpSolar: React.Dispatch<React.SetStateAction<boolean>>;
	showResults: boolean;
	setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
	setAddedMaker: React.Dispatch<React.SetStateAction<IMarker | undefined>>;
	addedMarker?: IMarker;
}
const roofTypeList = [
	{ id: 0, title: "Metal Roof" },
	{ id: 1, title: "Tile Roof" },
	{ id: 2, title: "Flat Roof" },
];

const SetUpSolarSystem = (props: Iprops) => {
	const { product, inverter, isEdited, results } = useAppSelector(
		(state) => state.greenLauncher
	);
	const [display1, setDisplay1] = useState<boolean>(false);
	const [display2, setDisplay2] = useState<boolean>(false);
	const [display3, setDisplay3] = useState<boolean>(false);
	const [display4, setDisplay4] = useState<boolean>(false);
	const [title, setTitle] = useState<string>(isEdited ? results.title : "");
	const [typeOfUsingElec, setTypeOfUsingElec] = useState(
		isEdited
			? {
					title: results.typeOfUsingE?.title,
					id: results.typeOfUsingE?.id,
			  }
			: { title: "", id: "" }
	);
	const [roofType, setRoofType] = useState<{ id: string; value: string }>({
		id: "",
		value: "",
	});
	const [typeOfProject, setTypeOfProject] = useState<{
		id: string;
		value: string;
	}>({
		id: "",
		value: "",
	});
	const [formOfUsingElectricity, setFormOfUsingElectricity] = useState<
		FormOfUsingElectricityResponse[] | []
	>([]);
	const [launcherType, setLauncherType] = useState<
		LauncherTypeResponse[] | []
	>([]);
	const [chooseInput, setChooseInput] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dispatch = useAppDispatch();
	const { totalArea, polylines } = useAppSelector((state) => state.draw);
	const handleDisplaySetupSolar = () => {
		props.setDisplayProject(true);
		props.setSetUpSolar(false);
		dispatch(activeDisplayPanelList(false));
		dispatch(activeDisplayInterverList(false));
	};

	const handleChooseInput = () => {
		inputRef.current?.focus();
		setChooseInput(true);
		setDisplay3(false);
		props.setDraw(false);
		dispatch(refreshPolyline());
	};

	const getFormOfUsingElectricity = async () => {
		try {
			const { data } = await greenLauncherApi.getFormOfUsingElectricity();
			setFormOfUsingElectricity(data);
		} catch (error) {
			console.log(error);
		}
	};
	const getLauncherType = async () => {
		try {
			const { data } = await greenLauncherApi.getLauncherType();
			setLauncherType(data);
		} catch (error) {}
	};
	const handleClick = (title: string, id: string) => {
		setTypeOfUsingElec({ title: title, id: id });
		setDisplay4(false);
	};
	useEffect(() => {
		getFormOfUsingElectricity();
		getLauncherType();
	}, []);
	const handleChooseMeasure = () => {
		setChooseInput(false);
		setDisplay3(false);
		dispatch(activeDisplayPanelList(false));
		dispatch(activeDisplayInterverList(false));
		props.setDraw(true);
		dispatch(refreshPolyline());
	};

	const handleCaculation = async () => {
		if (
			title === "" ||
			totalArea <= 0 ||
			typeOfProject.id === "" ||
			typeOfUsingElec.title === ""
		) {
			toast.error("You have fill out all input");
		} else {
			props.setShowResults(true);
			props.setSetUpSolar(false);
			props.setDisplayProject(false);
			dispatch(activeDisplayPanelList(false));
			dispatch(activeDisplayInterverList(false));
			props.setDraw(false);
			//xac dinh address dua vao toa do
			if (polylines.length > 0) {
				const flattenedArray = _.flatten(polylines);
				const center = geolib.getCenterOfBounds(flattenedArray);
				if (center) {
					const address = await coordinateToAddressAddGreenPoint({
						latitude: center.latitude,
						longitude: center.longitude,
					});
					if (address) {
						const x = getRegionOfProvince(address);
						const { data } =
							await greenLauncherApi.getSolarRadiation(
								x as string
							);
						const Total_cost = Math.round(
							caculationCost(
								totalArea,
								Number(product.price),
								Number(roofType)
							)
						);
						const radiant_per_day =
							Math.round(
								Number(data[0].mint_intensity) +
									Number(data[0].max_intensity)
							) / 2;
						const average_power = (totalArea * radiant_per_day) / 7;
						const average_revenue = caculatElectricityOutput(
							Number(data[0].mint_intensity),
							Number(data[0].max_intensity),
							totalArea,
							Number(typeOfUsingElec.id)
						);
						const payback_Time =
							Total_cost / (average_revenue as number);
						const payback_time = Math.round(payback_Time / 365);
						dispatch(setToggleIsEdited(false));
						dispatch(
							showResults({
								title: title,
								region_id: String(data[0].id),
								roof_type: roofType.id,
								typeOfUsingE: {
									title: typeOfUsingElec.title,
									id: typeOfUsingElec.id,
								},
								launcherType: typeOfProject.id,
								area: totalArea,
								radiant_per_day,
								average_power,
								average_revenue: average_revenue as number,
								Total_cost,
								payback_time,
							})
						);
					}
				}
			} else {
				const address = await coordinateToAddressAddGreenPoint({
					latitude: props.addedMarker?.latitude as number,
					longitude: props.addedMarker?.longitude as number,
				});
				const x = getRegionOfProvince(address as string);
				const { data } = await greenLauncherApi.getSolarRadiation(
					x as string
				);
				const Total_cost = Math.round(
					caculationCost(
						totalArea,
						Number(product.price),
						Number(roofType)
					)
				);
				const radiant_per_day =
					Math.round(
						Number(data[0].mint_intensity) +
							Number(data[0].max_intensity)
					) / 2;
				const average_power = (totalArea * radiant_per_day) / 7;
				const average_revenue = caculatElectricityOutput(
					Number(data[0].mint_intensity),
					Number(data[0].max_intensity),
					totalArea,
					Number(typeOfUsingElec.id)
				);
				const payback_Time = Total_cost / (average_revenue as number);
				const payback_time = Math.round(payback_Time / 365);
				dispatch(setToggleIsEdited(false));
				dispatch(
					showResults({
						title: title,
						region_id: String(data[0].id),
						roof_type: roofType.id,
						typeOfUsingE: {
							title: typeOfUsingElec.title,
							id: typeOfUsingElec.id,
						},
						launcherType: typeOfProject.id,
						area: totalArea,
						radiant_per_day,
						average_power,
						average_revenue: average_revenue as number,
						Total_cost,
						payback_time,
					})
				);
			}
		}
	};
	const convertToNear = (x: number) => {
		return Math.round(x / 23500 / 1.2);
	};
	return (
		<div
			className={` ${
				props.setUpSolar
					? " heigh_google_map opacity-[1]  open2"
					: "h-0 opacity-0 close2"
			} overflow-scroll hide-scrollbar w-[350px]`}
		>
			<div className="h-[50px] px-5 mt-[20px] relative  flex-center ">
				<Image
					onClick={handleDisplaySetupSolar}
					className="cursor-pointer"
					src="/assets/images/next 2.png"
					alt=""
					width={30}
					height={30}
				/>
				<h5 className="text-[#09A507] whitespace-nowrap text-[18px] absolute left-1/2 translate-x-[-50%]  font-[500] leading-[50px]  font-[SVN-Product Sans]">
					{!isEdited ? "Setup Solar System" : "Edit Project"}
				</h5>
			</div>
			<div className="h-[1px] w-full bg-[#525252]  mt-2"></div>
			<div className="flex-center flex-col text-[#525252]  justify-center my-[20px]">
				<div className="relative h-[50px] w-[85%]  flex-center mb-[20px] z-[10] px-5 justify-between border-[1px] border-[#525252] rounded-[16px]">
					<input
						onChange={(e) => setTitle(e.target.value)}
						type="text"
						value={title}
						placeholder="Title"
						className=" pl-1 w-full bg-white h-[60%] outline-none"
					/>
					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Name Of Project
					</span>
				</div>
				<div
					onClick={() => setDisplay1(!display1)}
					className="hover:cursor-pointer relative h-[50px] w-[85%] flex-center mb-[20px] px-5 justify-between border-[1px] border-[#525252] rounded-[16px]"
				>
					<span className="absolute top-[-10px] text-[14px] leading-[20px] z-[12] left-[20px] bg-white">
						Where you want to install
					</span>
					<div className="w-full flex flex-row justify-between items-center">
						<div className="w-full">
							{typeOfProject.id === ""
								? "Where you want to install ?"
								: typeOfProject.value}
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-3 h-3 cursor-pointer"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</div>
					{display1 && (
						<div
							className={`flex flex-col w-full h-[100px] bg-[#303235] z-[1000] rounded-[5px] top-[100%] absolute left-0 animation_selected_green_point_type`}
						>
							{launcherType.map((l, index) => (
								<div
									onClick={() =>
										setTypeOfProject({
											id: `${l.id}`,
											value: `${l.title}`,
										})
									}
									className={`py-[3px] ${
										index !== 0 && "border-t-[1px]"
									} border-y-white hover:text-green-500 text-center cursor-pointer text-white`}
								>
									{l.title}
								</div>
							))}
						</div>
					)}
				</div>
				{typeOfProject.id == "1" && (
					<div
						onClick={() => setDisplay2(!display2)}
						className=" relative h-[50px] w-[85%] flex-center mb-[20px] px-5 border-[1px] border-[#525252] rounded-[16px] flex flex-row justify-between items-center"
					>
						{/* <select
							onChange={(
								e: React.ChangeEvent<HTMLSelectElement>
							) => setRoofType(e.target.value)}
							className="border-none outline-none w-[92%]"
						>
							<option>Áp Mái Nhà</option>
							{roofTypeList.map((i) => (
								<option key={i.id} value={i.id}>
									{i.title}
								</option>
							))}
						</select> */}
						<span className="absolute top-[-10px] text-[14px] leading-[20px]  z-[12] left-[20px] bg-white">
							Type Of Roof
						</span>
						<div className="w-full flex flex-row justify-between items-center">
							<div className="w-full">
								{roofType.id === ""
									? "Type Of Roof"
									: roofType.value}
							</div>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-3 h-3 cursor-pointer"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
						{display2 && (
							<div
								className={`flex flex-col w-full h-[100px] bg-[#303235] z-[1000] rounded-[5px] top-[100%] absolute left-0 animation_selected_green_point_type`}
							>
								{roofTypeList.map((r, index) => (
									<div
										onClick={() =>
											setRoofType({
												id: `${r.id}`,
												value: r.title,
											})
										}
										className={`py-[3px] ${
											index !== 0 && "border-t-[1px]"
										} border-y-white hover:text-green-500 text-center cursor-pointer text-white`}
									>
										{r.title}
									</div>
								))}
							</div>
						)}
					</div>
				)}
				<div
					// onClick={() => setDisplay3(!display3)}
					className="relative h-[50px] w-[85%]  flex-center mb-[20px] z-[10] px-5 justify-between border-[1px] border-[#525252] rounded-[16px]"
				>
					<input
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch(setTotalArea(Number(e.target.value)))
						}
						ref={inputRef}
						name="area"
						value={totalArea}
						type="text"
						placeholder="m2"
						disabled={chooseInput ? false : true}
						className={`pl-3 w-full  bg-white h-[60%]`}
					/>
					<svg
						onClick={() => setDisplay3(!display3)}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-3 h-3 cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>

					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Project area
					</span>
					<div
						className={`absolute  ${
							display3
								? "h-[100px] opacity-[1] open2"
								: "h-0 opacity-0 close2"
						} w-full z-[10] text-white top-[50px]  left-0 bg-[#303235] `}
					>
						<p
							// onClick={handleChooseInput}
							className="border-b-[1px] w-full hover:text-green-500 text-center cursor-pointer p-1 my-3"
						>
							Enter Your Project Area
						</p>
						<p
							onClick={handleChooseMeasure}
							className=" w-full hover:text-green-500 text-center cursor-pointer p-1 mb-3"
						>
							Measure your project on map
						</p>
					</div>
				</div>
				<div
					onClick={() => {
						setDisplay4(!display4);
					}}
					className={`relative h-[50px] w-[85%] flex-center mb-[20px] ${
						display3 ? "z-[-1]" : "z-[10]"
					} px-5 justify-between border-[1px] border-[#525252] rounded-[16px] hover:cursor-pointer`}
				>
					<p className="text-[16px]">
						{typeOfUsingElec.title === ""
							? "Form of Using Electricity"
							: typeOfUsingElec.title}
					</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-3 h-3 cursor-pointer"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>

					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Form of Using Electricity
					</span>
					<div
						className={`absolute  ${
							display4
								? "h-[165px] opacity-[1] open2"
								: "h-0 opacity-0 close2"
						} w-full text-white top-[50px] z-10  left-0 bg-[#303235] `}
					>
						{formOfUsingElectricity &&
							formOfUsingElectricity.map((i) => (
								<p
									key={i.id}
									onClick={() =>
										handleClick(i.title, String(i.id))
									}
									className="border-b-[1px] w-full hover:text-green-500 text-center cursor-pointer p-1 my-3"
								>
									{i.title}
								</p>
							))}
					</div>
				</div>
			</div>
			<div className="relative h-[1px] w-[100%] flex-center mb-[20px] mt-2 border-[1px] border-t-[#525252]">
				<span className="absolute top-[-10px] text-[16px] font-bold translate-x-[-50%] text-black leading-[20px] left-[50%] bg-white">
					Breakdown Quotation
				</span>
			</div>
			<div className=" flex-center justify-center flex-col w-full">
				<div
					className={`relative h-[60px] w-[85%]  flex-center mb-[20px] ${
						display4 ? "z-[-1]" : "z-[10]"
					} px-5 justify-between border-[1px] border-[#525252] rounded-[16px]`}
				>
					<div className="flex flex-col">
						<p className="text-[12px] text-[#181818] uppercase font-[600]">
							{truncate(product?.title, 28)}
						</p>
						<span className="text-[16px] font-[600] text-[#CC2C2C] flex flex-row items-center">
							{convertToNear(parseInt(product?.price))}
							<img
								src="/assets/images/near.png"
								alt=""
								className="h-[15px] mx-[5px]"
							/>
						</span>
					</div>
					<span
						onClick={() => dispatch(activeDisplayPanelList(true))}
						className="cursor-pointer text-[12px] font-bold text-green-600"
					>
						Edit
					</span>
					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Solar Panel
					</span>
				</div>
				<div
					className={`relative h-[60px] w-[85%]  flex-center mb-[20px] ${
						display4 ? "z-[-1]" : "z-[10]"
					} px-5 justify-between border-[1px] border-[#525252] rounded-[16px]`}
				>
					<div className="flex flex-col">
						<p className="text-[12px] uppercase text-[#181818] font-[600]">
							{truncate(inverter?.title, 28)}
						</p>
						<span className="text-[16px] font-[600] text-[#CC2C2C] flex flex-row items-center">
							{convertToNear(parseInt(inverter?.price))}
							<img
								src="/assets/images/near.png"
								alt=""
								className="h-[15px] mx-[5px]"
							/>
						</span>
					</div>
					<span
						onClick={() =>
							dispatch(activeDisplayInterverList(true))
						}
						className="cursor-pointer text-[12px] font-bold text-green-600"
					>
						Edit
					</span>
					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Inverter
					</span>
				</div>
				<div
					className={`relative h-[60px] w-[85%]  flex-center mb-[20px] ${
						display4 ? "z-[-1]" : "z-[10]"
					} px-5 justify-between border-[1px] border-[#525252] rounded-[16px]`}
				>
					<div className="flex flex-col">
						<p className="text-[12px] uppercase text-[#181818] font-[600] w-full">
							{truncate("Nhà thầu Green World:", 28)}
						</p>
						<span className="text-[16px] font-[600] text-[#CC2C2C] flex flex-row items-center">
							{convertToNear(23900000)}
							<img
								src="/assets/images/near.png"
								alt=""
								className="h-[15px] mx-[5px]"
							/>
						</span>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						className="w-5 h-5 cursor-pointer"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19.5 8.25l-7.5 7.5-7.5-7.5"
						/>
					</svg>
					<span className="absolute top-[-10px] text-[14px] leading-[20px] left-[20px] bg-white">
						Contractor
					</span>
				</div>
				<Button
					onClick={handleCaculation}
					className="w-[150px] text-white rounded-[10px] flex-center justify-center  py-2 bg-btn"
				>
					Submit
				</Button>
			</div>
		</div>
	);
};

export default SetUpSolarSystem;
