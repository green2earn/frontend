import { setDisplayMap } from "@/stores/activeButtonSlice";
import {
	deletePolyline,
	refreshPolyline,
	setCurrentEditPolyline,
	setDraw,
	setStartNewPolyline,
} from "@/stores/drawSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { useSelector } from "react-redux";

interface Iprops {
	addNewButtonClick: (
		coord: Array<{ lat: number; lng: number }>,
		index: number,
		flagAddNew: boolean
	) => void;
	currentPolygon: google.maps.Polygon | null;
	markerCenterPolygon: google.maps.Marker | null;
	setMarkerCenterPolygon: React.Dispatch<
		React.SetStateAction<google.maps.Marker | null>
	>;
	editPolyline: google.maps.Polyline | null;
	flag: boolean;
	setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}
const Dimension = ({

	addNewButtonClick,
	currentPolygon,
	markerCenterPolygon,
	setMarkerCenterPolygon,
	editPolyline,
	flag,
	setFlag,
}: Iprops) => {
	const { polylines, totalArea} = useSelector(
		(state: RootState) => state.draw
	);
	const{draw} = useAppSelector(state=>state.draw)
	const dispatch = useAppDispatch();
	console.log(polylines);
	
	return (
		<div
			className={`w-[258px] bg-white border mt-[100px] rounded-[8px]   p-[16px] ml-[30px]`}
		>
			{/* <div
				onClick={() => dispatch(setDraw(false))}
				className="flex-center justify-end"
			>
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div> */}
			<div className="flex flex-col">
				<ul>
					{polylines.map((value, index) => (
						<li className="flex-center justify-between r">
							<p className="py-[10px] text-[16px]  text-left font-semibold">{`Roof ${
								index + 1
							}: ${
								google.maps.geometry.spherical
									.computeArea(value)
									.toFixed(0) + "m2"
							}`}</p>
							<div className="flex-center">
								<svg
									onClick={() => {
										addNewButtonClick(value, index, false)
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-5 h-5 cursor-pointer hover:text-green-500"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
									/>
								</svg>
								<svg
									onClick={() => {
										currentPolygon?.setPath([]);
										currentPolygon?.setPaths([]);
										markerCenterPolygon?.setMap(null);
										setMarkerCenterPolygon(
											markerCenterPolygon
										);
										dispatch(refreshPolyline());
										dispatch(
											deletePolyline({
												coord: value,
												index,
												area: Number(
													google.maps.geometry.spherical
														.computeArea(value)
														.toFixed(0)
												),
											})
										);
										editPolyline?.setPath([]);
										setFlag(!flag);
									}}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-5 h-5 cursor-pointer ml-1 hover:text-red-600"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className="h-[1px] w-full bg-[#C2C2C2] my-7"></div>
			<div className="flex flex-row justify-around">
				<div className="h-[45px] ">
					<span className="h-[17px] w-[60px] text-[14px] font-[400]">
						Roofs
					</span>
					<div className="h-[24px] flex-center justify-center">
						<span className="h-[24px] text-[16px] font-[700]">
							{polylines.length}
						</span>
					</div>
				</div>

				<div className="h-[45px] ">
					<span className="h-[17px] w-[60px] text-[14px] font-[400]">
						Area Total
					</span>
					<div className="h-[24px] flex-center justify-center">
						<span className="h-[24px] text-[16px] font-[700]">
							{totalArea < 0? 0:totalArea} m²
						</span>
					</div>
				</div>
			</div>
			<div className="h-[24px] flex-center cursor-pointer justify-end w-full mt-2 ">
				
				{polylines.length == 0 ? (
					<div
						onClick={() =>
							addNewButtonClick([], polylines.length, true)
						}
						className="flex-center"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-5 h-5 text-[#09A507]"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6v12m6-6H6"
							/>
						</svg>

						<button>
							<span className="text-[14px] text-[#09A507] ml-1 ">
								Start
							</span>
						</button>
					</div>
				) : (
					<div className="flex-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="3.5"
							stroke="#09A507"
							className="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 12.75l6 6 9-13.5"
							/>
						</svg>

						<button
								onClick={() => { addNewButtonClick([], polylines.length, false) }
							}
						>
							<span className="text-[14px] text-[#09A507] ml-1 ">
								Done
							</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dimension;
