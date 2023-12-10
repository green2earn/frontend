import { RootState } from "@/stores/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ButtonTypeControlOptions() {
	const { mapComponent, mapState, isPopupInfoGreenPoint } = useSelector(
		(state: RootState) => state.map
	);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};
	return (
		<button
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={
				isPopupInfoGreenPoint
					? "absolute left-[370px] bottom-[30px] w-[75px] h-[75px] bg-white rounded-[8px] drop_shadow_right"
					: "absolute left-[-50px] bottom-[30px] w-[75px] h-[75px] bg-white rounded-[8px] drop_shadow_right"
			}
			onClick={() => {
				mapComponent?.setMapTypeId(
					mapComponent?.getMapTypeId() == "roadmap"
						? "satellite"
						: "roadmap"
				);
			}}
		>
			<img
				src={`https://maps.googleapis.com/maps/api/staticmap?center=${
					mapState?.center_lat || mapComponent?.getCenter()?.lat()
				},${
					mapState?.center_lng || mapComponent?.getCenter()?.lng()
				}&zoom=${
					Math.floor(parseInt(`${mapState?.zoom}`) / 2) ||
					Math.floor(parseInt(`${mapComponent?.getZoom()}`) / 2)
				}&size=75x100&key=${
					process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API
				}&maptype=${
					mapComponent?.getMapTypeId() == "roadmap"
						? "satellite"
						: "roadmap"
				}&style=feature:all|element:labels|visibility:off`}
				alt=""
				className={
					isHovered
						? "w-[75px] h-[75px] object-none p-[5px] rounded-[8px]"
						: "w-[75px] h-[75px] object-none p-[2px] rounded-[8px]"
				}
			/>
		</button>
	);
}
