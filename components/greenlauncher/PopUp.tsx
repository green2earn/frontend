import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

import Image from "next/image";
import Loading from "../Loading";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {IMarker } from "@/models/common";
import {
	refreshPolyline, setDraw,
} from "@/stores/drawSlice";
import { motion } from "framer-motion";
import { setAddress, setDisplayLayout , setDisplayMap, setDisplayStep1, setPropertyType, setSolarData} from "@/stores/activeButtonSlice";
import _ from "lodash";
import { getRegionOfProvince } from "@/utils/getRegionOfProvince";
import { greenLauncherApi } from "@/api-client/green-launcher-api";
import { coordinateToAddressAddGreenPoint } from "@/utils";


// const properties = [{ id: 1, title: 'Landed house' },
// 	{ id: 2, title: 'Condominium' }, { id: 3, title: 'Rented Comercial Property' },
// 	{ id: 4, title: 'Owned Comercial Property' }
// ]

interface Iprops {
	setAddedMaker: React.Dispatch<React.SetStateAction<IMarker | undefined>>;
	setDisplaySearchComp: React.Dispatch<React.SetStateAction<boolean>>;
	displaySearchComp: boolean
	addedMarker: IMarker | undefined;
}

const PopUp = ({
	setAddedMaker,
	setDisplaySearchComp,
	addedMarker
}: Iprops) => {
	const [display, setDisplay] = useState<boolean>(false);
	 const [results, setResults] = useState<any>();
	const [dropdown, setDropdown] = useState(false)
	const [showLayer, setShowLayer] = useState(false)
	
	const{draw} = useAppSelector(state=>state.draw)
	const{displayMap,propertyType} = useAppSelector(state=>state.activeButton)
	const dispatch = useAppDispatch();
	const handleChange = (newAddress: string) => {
		dispatch(setAddress(newAddress))
		setDisplay(true);
	};
    const {address,displayLayout} = useAppSelector(state=>state.activeButton)
	useEffect(() => {
		if (address == "") {
			setDisplay(false);
			setShowLayer(false)
		}
	}, [address]);

	const searchOptions = {
		componentRestrictions: { country: "vn" },
	};
   
	const handleSelect = async (selectedAddress: string) => {
		const results = await geocodeByAddress(selectedAddress);
		setShowLayer(true)
		setResults(results[0]);
		const latLng = await getLatLng(results[0]);
		
		
		const newObj = {
			address,
			longitude: latLng.lng,
			latitude: latLng.lat,
		};
		if (!_.isEqual(newObj, addedMarker)) {
			setAddedMaker({
				address: address,
				longitude: latLng.lng,
				latitude: latLng.lat,
			});
			dispatch(setDraw(false))
			dispatch(setAddress(selectedAddress))
			setDisplay(false);
			dispatch(refreshPolyline());
		} 
	};
	
	const handleProperty = (type:string) => {
		dispatch(setPropertyType(type))
		setDropdown(false)
	}
   
	const handleFindAddressOnMap = async () => {
		try {
			if (address == "" || propertyType =="") {
				toast.error("You must enter your addres || property");
			} else {
				setDisplaySearchComp(false);
				dispatch(setDisplayLayout(true))
				dispatch(setDisplayStep1(true))
				if (draw) {
					setTimeout(() => {
						dispatch(setDisplayMap(true))
					},500)
					
				}
				
                const results = await geocodeByAddress(address);;
		       const latLng = await getLatLng(results[0]);
				const address1 = await coordinateToAddressAddGreenPoint({
					latitude: latLng.lat as number,
					longitude: latLng.lng as number,
				});
				
				const x = getRegionOfProvince(address1 as string);
				console.log(x);
				
				const { data } = await greenLauncherApi.getSolarRadiation(
					x as string
				);
				
				console.log(data[0]);
				
				dispatch(setSolarData({
					MaxSunshineHoursPerYear:String(data[0].max_sunny_hours_of_year ) ,
					MinSunshineHoursPerYear: String(data[0].min_sunny_hours_of_year),
					RadiationIntensity:String(data[0].max_intensity)
	
				}))
				
	
			}
		} catch (error) {
			
		}

		
	};
	return (
		<motion.div
		 initial={{ y: 0}}
			animate={{
			y: displayLayout ? 1000 : 0}} 
		  transition={{ duration: 1 }}
			
			className={`flex-center justify-center ${displayLayout && 'bg-[#212121] '} ${displayMap ? 'h-0 w-0' :'h-screen w-screen'} flex-col  ${
				!showLayer ? "layer " : ""
			}`}
		> 
			
			<PlacesAutocomplete
				value={address}
				onChange={handleChange}
				onSelect={handleSelect}
				searchOptions={searchOptions}
			>
				{({
					getInputProps,
					suggestions,
					getSuggestionItemProps,
					loading,
				}: any) => (
					<div className="w-[70%] h-[55%] rounded-[10px] border-[2px] mt-[20px] p-[30px] border-[#9aa3ae] layer  relative flex flex-col">
						<h2 className="text-[36px] leading-[40px] text-white w-full text-center ">
							Starting saving with green energy solution
						</h2>
						<div className="flex mt-[50px] justify-between ">
							<div className=" px-[10px]  w-[35%]">
								<p className="px-[5px] text-white  text-[14px]">
									My property is a
								</p>
								<div className="h-[50px] mt-[10px] relative px-[15px] flex-center border justify-between rounded-[5px] cursor-pointer">
									<p className="text-white text-[15px]">{propertyType ==''? 'Select option': propertyType}</p>
									<svg
										onClick={() => setDropdown(!dropdown)}
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6 text-white"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19.5 8.25l-7.5 7.5-7.5-7.5"
										/>
									</svg>
									   <ul className={`absolute w-full bg-white  ${dropdown ? 'block' : 'hidden'} py-[5px]  border top-[50px] rounded-[5px] left-0`}>
										   <li onClick={() => handleProperty('Landed house')} className="w-full h-[40px] px-[15px] cursor-pointer leading-[40px] text-[14px] hover:bg-[#c0e3e9] rounded-[2px] ">
										     Landed house
											</li>
											
											<li onClick={()=>handleProperty('Condominium')} className="w-full h-[40px] px-[15px] leading-[40px] text-[14px] hover:bg-[#c0e3e9] rounded-[2px] ">
												Condominium
											</li>
											<li onClick={()=>handleProperty('Rented Comercial Property')} className="w-full h-[40px] px-[15px] leading-[40px] text-[14px] hover:bg-[#c0e3e9] rounded-[2px] ">
												Rented Comercial Property
											</li>
											<li onClick={()=>handleProperty('Owned Comercial Property')} className="w-full h-[40px] px-[15px] leading-[40px] text-[14px] hover:bg-[#c0e3e9] rounded-[2px] ">
												Owned Comercial Property
											</li>
										</ul>
									
								</div>
								<p className="text-red-600 mt-1 ml-1" >Required</p>
							</div>
							<div className="w-[60%] relative px-[10px]">
								<p className="px-[5px] text-white  text-[14px]">
									Located at
								</p>
								<div className="w-[100%] text-white relative">
									<input
										value={address}
										{...getInputProps({
											className:
												"w-[100%] pl-[20px] text-[14px] rounded-[5px] h-[50px] mt-[10px] border-[1px] bg-transparent border-[#afafb0] outline-none",
											placeholder:
												"Enter your address to begin",
										})}
									/>
									{address != "" && (
										<svg
											onClick={() => {
												dispatch(setAddress(''))
											}}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-5 h-5 absolute right-[10px] cursor-pointer top-[60%] translate-y-[-50%] "
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									)}
								</div>
								<p className="text-red-600 mt-1 ml-1" >Required</p>
								{display && (
									<div className="absolute top-[80px] overflow-y-scroll rounded-[8px] left-0 h-[200px] right-0 w-[100%] pt-3 bg-white z-10">
										{loading && <Loading />}
										{suggestions.map((suggestion: any) => {
											const className =
												"w-full h-[40px]  flex-center mb-2 cursor-pointer border-b-[1px]";
											return (
												<div
													{...getSuggestionItemProps(
														suggestion,
														{ className }
													)}
													key={suggestion.placeId}
												>
													<Image
														src="/assets/images/green map icon.png"
														alt=""
														width={40}
														height={30}
													/>
													<p className="text-[14px] leading-[40px] h-[40px] capitalize overflow-hidden">
														{" "}
														{
															suggestion.description
														}{" "}
													</p>
												</div>
											);
										})}
									</div>
								)}
							</div>
							
						</div>

						<button
							onClick={handleFindAddressOnMap}
							type="button"
							className="w-[20%] bg-green-600 hover:bg-green-500 text-[18px] ml-[10px] mt-[50px] rounded-[8px] cursor-pointer text-white h-[50px]"
						>
							Check Your Place
						</button>
					</div>
				)}
			</PlacesAutocomplete>
		</motion.div>
	);
};

export default PopUp;
