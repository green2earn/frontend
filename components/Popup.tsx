import { useAppDispatch, RootState, useAppSelector } from "@/stores/store";
import {
	popupAddGreenPoint,
	setResultCreateGreenPoint,
} from "@/stores/greenMapSlice";
import MapMiniComponent from "./greenmap/MapMiniComponent";
import React, { useState, useEffect } from "react";
import { uploadFileToBE } from "@/api-client/file-api";
import axios from "axios";
import { useSelector } from "react-redux";
import { createProject } from "@/api-client/green-point-api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

type GreenPointInfo = {
	category_id: string;
	website: string;
	phone_number: string;
	brief_description: string;
	detail_description: string;
	address: string;
	longitude: number;
	latitude: number;
	reduction_co2: number;
	reduction_co2_actual: number;
	reduction_co2_onchain: number;
	total_token_earned: number;
	image_url: string;
	logo: string;
	performance: number;
};

const Popup = () => {
	const router = useRouter();
	const { location } = useSelector((state: RootState) => state.map);
	const logoInputRef = React.useRef<HTMLInputElement>(null);
	const imgInputRef = React.useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [selectedGreenPointType, setSelectedGreenPointType] =
		useState<boolean>(false);
	// thông tin green point
	const [name, setName] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	// const [openingDate, setOpeningDate] = useState<Date>();
	const [selectedLogo, setSelectedLogo] = useState<string>("");
	const [categoryId, setCategoryId] = useState<number>();
	const [performance, setPerformance] = useState<string>("");
	const [reductionCo2, setReductionCo2] = useState<number>();
	const [reductionCo2Actual, setReductionCo2Actual] = useState<number>();
	const [reductionCo2Onchain, setReductionCo2Onchain] = useState<number>();
	const [briefDescription, setBriefDescription] = useState<string>("");
	const [detailDescription, setDetailDescription] = useState<string>("");
	// const [owner, setOwner] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [website, setWebsite] = useState<string>("");
	const [selectedImages, setSelectedImages] = useState<string[]>([]);
	const [result, setResult] = useState<null | "success" | "failure">(null);

	const dispatch = useAppDispatch();
	const handleCloseToggle = () => {
		dispatch(popupAddGreenPoint());
	};
	const northLimit = 23.392;
	const southLimit = 8.186;
	const eastLimit = 109.465;
	const westLimit = 102.143;

	// Hàm sinh ngẫu nhiên tọa độ
	function randomCoordinate() {
		const latitude = Math.random() * (northLimit - southLimit) + southLimit;
		const longitude = Math.random() * (eastLimit - westLimit) + westLimit;
		return { latitude, longitude };
	}
	const handleSubmit = async () => {
		setLoading(true);
		// handleCloseToggle();
		const data = {
			name,
			address: address,
			// openingDate,
			logo: selectedLogo,
			category_id: categoryId,
			performance: performance,
			reduction_co2: reductionCo2,
			reduction_co2_actual: reductionCo2Actual,
			reduction_co2_onchain: reductionCo2Onchain,
			brief_description: briefDescription,
			detail_description: detailDescription,
			// owner,
			phone_number: phoneNumber,
			website: website,
			// images: selectedImages,
			longitude: location.lng,
			latitude: location.lat,
			total_token_earned: 0,
			image_url: selectedImages[0],
		};
		const res = await createProject(data);
		// for (let i = 0; i <= 100; i++) {
		// 	const randomLocation = randomCoordinate();
		// 	const data = {
		// 		name,
		// 		address: address,
		// 		// openingDate,
		// 		logo: selectedLogo,
		// 		category_id: Math.floor(Math.random() * 5) + 1,
		// 		performance: performance,
		// 		reduction_co2: reductionCo2,
		// 		reduction_co2_actual: reductionCo2Actual,
		// 		reduction_co2_onchain: reductionCo2Onchain,
		// 		brief_description: briefDescription,
		// 		detail_description: detailDescription,
		// 		// owner,
		// 		phone_number: phoneNumber,
		// 		website: website,
		// 		// images: selectedImages,
		// 		longitude: randomLocation.longitude,
		// 		latitude: randomLocation.latitude,
		// 		total_token_earned: 0,
		// 		image_url: selectedImages[0],
		// 	};
		// 	const res = await createProject(data);
		// 	setTimeout(() => {}, 12000);
		// }
		if (res.status === 201) {
			setResult("success");
			// dispatch(setResultCreateGreenPoint("success"));
		} else {
			setResult("failure");
			// dispatch(setResultCreateGreenPoint("failure"));
		}
		setLoading(false);
	};
	const handleUploadFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setLoading(true);
		if (event.target.files) {
			const response = await uploadFileToBE(
				event.target.files[0].name,
				event.target.files[0].size,
				event.target.files[0].type
			);
			const { url, fields } = response.data;

			// Step 2: Use the pre-signed URL and fields to make the POST request to AWS S3.
			const formData = new FormData();

			Object.keys(fields).forEach((key) => {
				formData.append(key, fields[key]);
			});

			formData.append("file", event.target.files[0]);

			const uploadResponse = await axios.post(url, formData);
			setSelectedLogo(url + "/" + fields.key);
		}
		setLoading(false);
	};
	const buttonUploadImg = () => {
		logoInputRef.current?.click();
	};
	const handleUploadImages = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setLoading(true);
		if (event.target.files) {
			const response = await uploadFileToBE(
				event.target.files[0].name,
				event.target.files[0].size,
				event.target.files[0].type
			);
			const { url, fields } = response.data;

			// Step 2: Use the pre-signed URL and fields to make the POST request to AWS S3.
			const formData = new FormData();

			Object.keys(fields).forEach((key) => {
				formData.append(key, fields[key]);
			});

			formData.append("file", event.target.files[0]);

			const uploadResponse = await axios.post(url, formData);
			setSelectedImages([...selectedImages, url + "/" + fields.key]);
		}
		setLoading(false);
	};
	const uploadImages = () => {
		imgInputRef.current?.click();
	};

	function deg2rad(degrees: any) {
		return degrees * (Math.PI / 180);
	}
	function calculateDistance(coord1: any, coord2: any) {
		// Haversine formula to calculate the distance between two coordinates
		const R = 6371; // Radius of the Earth in kilometers
		const dLat = deg2rad(coord2.lat - coord1.lat);
		const dLng = deg2rad(coord2.lng - coord1.lng);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(coord1.lat)) *
				Math.cos(deg2rad(coord2.lat)) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		const distance = R * c;

		return distance;
	}

	useEffect(() => {
		if (location?.address) {
			setAddress(location?.address);
		}
	}, [location]);

	return (
		<div className="absolute top-0 z-[999] layer h-full w-screen">
			{result === null && (
				<div className="w-2/5 rounded-[16px] h-4/5 left-1/2 top-[10%] translate-x-[-50%] bg-white fixed overflow-auto hide-scrollbar">
					<div className="pt-[10px] pb-[15px] text-[24px] font-normal text-[#09A507] text-center w-full sticky top-0 bg-white drop-shadow-lg border-b-[1px] z-[1000]">
						Create Green Point
						<button
							onClick={handleCloseToggle}
							className="absolute top-[-5px] right-0"
						>
							<img
								src="/assets/images/icon_close.svg"
								alt=""
								className="p-[17px] hover:cursor-pointer hover:bg-slate-300 rounded-se-[16px]"
							/>
						</button>
					</div>
					<div className="w-full mt-[5px] px-[15px] pb-[15px]  flex flex-col overflow-auto hide-scrollbar">
						<div className="text-[#181818] text-[18px] text-normal mb-[8px]">
							Place details
						</div>

						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Name*"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Address*"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
						<button className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] my-[4px] text-left relative">
							Opening date
							<img
								src="/assets/images/icon_right.svg"
								alt=""
								className="absolute top-[18.75px] right-[18.75px]"
							/>
						</button>
						<MapMiniComponent
							className="rounded-[16px] my-[15px]"
							location={location}
						/>
						<div className="text-[#181818] text-[18px] text-normal mb-[8px]">
							About
						</div>
						<input
							type="file"
							placeholder="Add your logo"
							className="hidden"
							ref={logoInputRef}
							onChange={handleUploadFile}
						/>
						<button
							onClick={buttonUploadImg}
							className="flex flex-row items-center"
						>
							<div className="w-[100px] h-[100px] rounded-[8px] border-[1px]">
								{selectedLogo ? (
									<img
										src={selectedLogo}
										alt=""
										className="w-[100px] h-[100px] rounded-[8px] border-[1px]"
									/>
								) : (
									<img
										src="/assets/images/icon_upload_img.svg"
										alt=""
										className="w-full h-full"
									/>
								)}
							</div>
							<div className="text-neutral-600 text-[16px] font-normal ml-[10px]">
								Add your logo
							</div>
						</button>
						<button
							onClick={() => {
								setSelectedGreenPointType(
									(pre_state) => !pre_state
								);
							}}
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] my-[4px] text-left relative"
						>
							Green Point
							<img
								src="/assets/images/icon_right.svg"
								alt=""
								className="absolute top-[18.75px] right-[18.75px]"
							/>
							{selectedGreenPointType && (
								<div className="flex flex-col absolute top-[50px] right-0 w-full h-min py-[16px] bg-white border-[1px] rounded-[16px] drop-shadow-2xl animation_selected_green_point_type">
									<button
										onClick={() => setCategoryId(1)}
										className="justify-start items-center flex flex-row py-[16px] px-[10px] hover:bg-slate-300"
									>
										<img
											className="w-[40px] h-[40px]"
											src="/assets/images/icon_solar.svg"
											alt=""
										/>
										<div className="ml-[16px] text-neutral-600 text-[16px] font-normal">
											Solar Energy
										</div>
									</button>
									<button
										onClick={() => setCategoryId(2)}
										className="justify-start items-center flex flex-row py-[16px] px-[10px] hover:bg-slate-300"
									>
										<img
											className="w-[40px] h-[40px]"
											src="/assets/images/icon_wind.svg"
											alt=""
										/>
										<div className="ml-[16px] text-neutral-600 text-[16px] font-normal">
											Turbine Wind
										</div>
									</button>
									<button
										onClick={() => setCategoryId(3)}
										className="justify-start items-center flex flex-row py-[16px] px-[10px] hover:bg-slate-300"
									>
										<img
											className="w-[40px] h-[40px]"
											src="/assets/images/icon_shop.svg"
											alt=""
										/>
										<div className="ml-[16px] text-neutral-600 text-[16px] font-normal">
											Green Shop
										</div>
									</button>
									<button
										onClick={() => setCategoryId(4)}
										className="justify-start items-center flex flex-row py-[16px] px-[10px] hover:bg-slate-300"
									>
										<img
											className="w-[40px] h-[40px]"
											src="/assets/images/icon_charge.svg"
											alt=""
										/>
										<div className="ml-[16px] text-neutral-600 text-[16px] font-normal">
											Green Charge
										</div>
									</button>
									<button
										onClick={() => setCategoryId(5)}
										className="justify-start items-center flex flex-row py-[16px] px-[10px] hover:bg-slate-300"
									>
										<img
											className="w-[40px] h-[40px]"
											src="/assets/images/icon_factory.svg"
											alt=""
										/>
										<div className="ml-[16px] text-neutral-600 text-[16px] font-normal">
											Green Factory
										</div>
									</button>
								</div>
							)}
						</button>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Wattage*"
							value={performance}
							onChange={(e) => setPerformance(e.target.value)}
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Reduction CO2*"
							value={reductionCo2}
							onChange={(e) =>
								setReductionCo2(parseFloat(e.target.value))
							}
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Reduction CO2 actual*"
							value={reductionCo2Actual}
							onChange={(e) =>
								setReductionCo2Actual(
									parseFloat(e.target.value)
								)
							}
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Reduction CO2 onchain*"
							value={reductionCo2Onchain}
							onChange={(e) =>
								setReductionCo2Onchain(
									parseFloat(e.target.value)
								)
							}
						/>
						<textarea
							className="h-[100px] border-[1px] rounded-[16px] my-[4px] p-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252]"
							placeholder="About Green Point"
							value={briefDescription}
							onChange={(e) =>
								setBriefDescription(e.target.value)
							}
						></textarea>

						<textarea
							className="h-[100px] border-[1px] rounded-[16px] my-[4px] p-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252]"
							placeholder="Detail Green Point"
							value={detailDescription}
							onChange={(e) =>
								setDetailDescription(e.target.value)
							}
						></textarea>

						<div className="text-[#181818] text-[18px] text-normal mb-[8px]">
							Contact
						</div>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Owner name"
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Phone number"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<input
							type="text"
							className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
							placeholder="Website"
							value={website}
							onChange={(e) => setWebsite(e.target.value)}
						/>
						<div className="text-[#181818] text-[18px] text-normal mb-[8px]">
							Place photos
						</div>
						<div className="flex flex-wrap">
							<input
								type="file"
								placeholder="Add your logo"
								className="hidden"
								ref={imgInputRef}
								onChange={handleUploadImages}
							/>
							<button
								onClick={uploadImages}
								className="rounded-[16px] border-[1px] h-[90px] w-[120px] flex flex-row justify-center items-center mr-[4px]"
							>
								<img
									src="/assets/images/icon_photo.svg"
									alt=""
									className="mr-1"
								/>
							</button>
							{selectedImages.length > 0 &&
								selectedImages.map((image) => {
									return (
										<img
											key={`${image}`}
											src={image}
											alt=""
											className="h-[90px] w-[120px] rounded-[16px] mx-[4px]"
										/>
									);
								})}
						</div>
						<div className="text-[12px] font-normal text-[#525252] my-[10px]">
							If you add photos, they will appear publicly with
							your profile name and picture. They will appear on
							G2E services across the web, like Maps and Search,
							and on third-party sites and apps that use G2E
							services. G2E may also use them to update other
							information about this place.
						</div>
					</div>
					<div className="w-full sticky bottom-0 bg-white drop-shadow-lg border-b-[1px] z-[1000] border-t-[1px] py-[10px] flex flex-row-reverse px-[15px]">
						<button
							onClick={handleSubmit}
							className="border-black border-[1px] rounded-[16px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#525252] bg-[#C2C2C2] mx-[5px] hover:border-[1px] hover:border-white hover:text-black"
						>
							Submit
						</button>
						<button
							onClick={handleCloseToggle}
							className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507]  mx-[5px]"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{result === "success" && (
				<div className="w-1/4 rounded-[16px] h-min left-1/2 top-[30%] translate-x-[-50%] bg-white relative flex items-center flex-col py-[6px]">
					<button className="">
						<img
							src="/assets/images/icon_close.svg"
							alt=""
							className="absolute right-0 top-0 p-[10px]"
						/>
					</button>
					<img
						src="/assets/images/icon_g2e_success.svg"
						alt=""
						className="mx-[auto]"
					/>
					<div className="text-center text-neutral-900 text-[24px] font-normal mt-[10px]">
						Thanks for improving Green to Earn!
					</div>
					<div className="YouLlGetAnEmailWhenYourSuggestionIsReviewed text-center text-black text-[14px] font-normal">
						You'll get an email when your suggestion is reviewed
					</div>
					<button
						onClick={() => router.reload()}
						className="w-2/5 h-[40px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] rounded-[66px] justify-center items-center justify-self-center my-[6px] mt-[20px]"
					>
						<div className="Login text-white text-[16px] font-bold">
							Done
						</div>
					</button>
				</div>
			)}
			{result === "failure" && (
				<div className="w-1/4 rounded-[16px] h-min left-1/2 top-[30%] translate-x-[-50%] bg-white relative flex items-center flex-col py-[6px]">
					<button className="">
						<img
							src="/assets/images/icon_close.svg"
							alt=""
							className="absolute right-0 top-0 p-[10px]"
						/>
					</button>
					<img
						src="/assets/images/icon_g2e_success.svg"
						alt=""
						className="mx-[auto]"
					/>
					<div className="text-center text-neutral-900 text-[24px] font-normal mt-[10px]">
						Thanks for improving Green to Earn!
					</div>
					<div className="YouLlGetAnEmailWhenYourSuggestionIsReviewed text-center text-black text-[14px] font-normal">
						You'll get an email when your suggestion is reviewed
					</div>
					<button
						onClick={() => router.reload()}
						className="w-2/5 h-[40px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] rounded-[66px] justify-center items-center justify-self-center my-[6px] mt-[20px]"
					>
						<div className="Login text-white text-[16px] font-bold">
							Done
						</div>
					</button>
				</div>
			)}
			{loading && (
				<div className="flex justify-center items-center layer z-[1000] absolute w-2/5 rounded-[16px] h-4/5 left-1/2 top-[10%] translate-x-[-50%]">
					<img
						src="/assets/images/Loading.gif"
						alt=""
						className="w-[100px] h-[100px]"
					/>
				</div>
			)}
		</div>
	);
};

export default Popup;
