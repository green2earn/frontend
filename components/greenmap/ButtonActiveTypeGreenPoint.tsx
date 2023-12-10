import { RootState, useAppDispatch } from "@/stores/store";
import { setActiveButton } from "@/stores/greenMapSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface propButtonActiveTypeGreenPoint {
	typeGP: "solar" | "wind" | "shop" | "charge" | "factory";
}

export default function ButtonActiveTypeGreenPoint({
	typeGP,
}: propButtonActiveTypeGreenPoint) {
	const {
		activeButtonSolar,
		activeButtonWind,
		activeButtonShop,
		activeButtonCharge,
		activeButtonFactory,
	} = useSelector((state: RootState) => state.map);
	const dispatch = useAppDispatch();
	const classButton1 =
		"flex flex-row items-center font-normal text-[16px] text-black mt-[16px] ml-0 mr-[6px] justify-center py-[12px] px-[24px] w-[117px] h-[48px] rounded-[16px] shadow_button_type_green_point bg-white hover:border-[#4acc35] hover:border-[2px]";
	const classButton2 =
		"flex flex-row items-center font-normal text-[16px] text-black mt-[16px] ml-0 mr-[6px] justify-center py-[12px] px-[24px] w-[117px] h-[48px] rounded-[16px] shadow_button_type_green_point bg_button_type_green_point";
	const [classButton, setClassButton] = useState<string>(classButton1);
	const [whitePath, setWhitePath] = useState<string>("");
	useEffect(() => {
		if (typeGP === "solar") {
			if (activeButtonSolar) {
				setWhitePath("_white");
				setClassButton(classButton2);
			} else {
				setWhitePath("");
				setClassButton(classButton1);
			}
		} else if (typeGP === "wind") {
			if (activeButtonWind) {
				setWhitePath("_white");
				setClassButton(classButton2);
			} else {
				setWhitePath("");
				setClassButton(classButton1);
			}
		} else if (typeGP === "shop") {
			if (activeButtonShop) {
				setWhitePath("_white");
				setClassButton(classButton2);
			} else {
				setWhitePath("");
				setClassButton(classButton1);
			}
		} else if (typeGP === "charge") {
			if (activeButtonCharge) {
				setWhitePath("_white");
				setClassButton(classButton2);
			} else {
				setWhitePath("");
				setClassButton(classButton1);
			}
		} else if (typeGP === "factory") {
			if (activeButtonFactory) {
				setWhitePath("_white");
				setClassButton(classButton2);
			} else {
				setWhitePath("");
				setClassButton(classButton1);
			}
		}
	}, [
		activeButtonSolar,
		activeButtonWind,
		activeButtonShop,
		activeButtonCharge,
		activeButtonFactory,
	]);
	return (
		<button
			onClick={() => {
				dispatch(setActiveButton(typeGP));
			}}
			className={classButton}
		>
			{typeGP === "solar" && (
				<>
					<img
						src={`/assets/images/solar_icon${whitePath}.svg`}
						alt=""
						className="mx-[5px]"
					/>
					<span className="mr-[3px]">Solar</span>
				</>
			)}
			{typeGP === "wind" && (
				<>
					<img
						src={`/assets/images/wind_icon${whitePath}.svg`}
						alt=""
						className="mx-[5px]"
					/>
					<span className="mr-[3px]">Wind</span>
				</>
			)}
			{typeGP === "shop" && (
				<>
					<img
						src={`/assets/images/shop_icon${whitePath}.svg`}
						alt=""
						className="mx-[5px]"
					/>
					<span className="mr-[3px]">Shop</span>
				</>
			)}
			{typeGP === "charge" && (
				<>
					<img
						src={`/assets/images/charge_icon${whitePath}.svg`}
						alt=""
						className="mx-[5px]"
					/>
					<span className="mr-[3px]">Charge</span>
				</>
			)}
			{typeGP === "factory" && (
				<>
					<img
						src={`/assets/images/factory_icon${whitePath}.svg`}
						alt=""
						className="mx-[5px]"
					/>
					<span className="mr-[3px]">Factory</span>
				</>
			)}
		</button>
	);
}
