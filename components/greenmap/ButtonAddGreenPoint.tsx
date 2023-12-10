import { RootState, useAppDispatch } from "@/stores/store";
import { setActiveButtonAddPoint } from "@/stores/greenMapSlice";
import React from "react";
import { useSelector } from "react-redux";

export default function ButtonAddGreenPoint() {
	const dispatch = useAppDispatch();
	const { activeButtonAddPoint } = useSelector(
		(state: RootState) => state.map
	);
	return (
		<button
			onClick={() => dispatch(setActiveButtonAddPoint())}
			className="flex flex-row items-center text-[18px] text-black mt-[16px] mx-[20px] justify-center py-[12px] px-[24px] min-w-[170px] h-[48px] rounded-[16px] shadow_button_type_green_point bg_button_type_green_point font-medium"
		>
			{!activeButtonAddPoint ? (
				<>
					<span className="mr-[6px] inline-flex">Add Points</span>
					<img
						src="/assets/images/add_green_point_icon.svg"
						alt=""
						className=""
					/>
				</>
			) : (
				<>
					<span className="mr-[6px] inline-flex">Cancel</span>
					<img
						src="/assets/images/icon_close_white.svg"
						alt=""
						className=""
					/>
				</>
			)}
		</button>
	);
}
