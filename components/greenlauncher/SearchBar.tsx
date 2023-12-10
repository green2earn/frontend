import Image from "next/image";
import { useEffect, useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import Loading from "../Loading";
import { IMarker } from "@/models/common";
import { useAppDispatch } from "@/stores/store";
import { refreshPolyline } from "@/stores/drawSlice";
interface Iprops {
	setDisplaySearchContent: React.Dispatch<React.SetStateAction<boolean>>;
	displaySearchContent: boolean;
	setAddedMaker: React.Dispatch<React.SetStateAction<IMarker | undefined>>;
}

const SearchBar = (props: Iprops) => {
	const [address, setAddress] = useState<string>("");
	const [displayContent, setDisplayContent] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const searchOptions = {
		componentRestrictions: { country: "vn" },
	};
	useEffect(() => {
		if (address == "") {
			setDisplayContent(false);
		}
	}, [address]);
	const handleChange = (newAddress: string) => {
		setAddress(newAddress);
		setDisplayContent(true);
	};
	const handleSelect = async (selectedAddress: string) => {
		const results = await geocodeByAddress(selectedAddress);
		setAddress(selectedAddress);
		const latLng = await getLatLng(results[0]);
		props.setAddedMaker({
			address: address,
			longitude: latLng.lng,
			latitude: latLng.lat,
		});
		setDisplayContent(false);
		props.setDisplaySearchContent(false);
		dispatch(refreshPolyline());
	};

	return (
		<div
			className={`pt-[20px] ${
				props.displaySearchContent ? "open" : "close"
			}  h-full bg-[#fff]`}
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
					<>
						<form className="border-[1px] w-full flex-center h-[50px]">
							<div className="h-[50px] w-[10%]  flex-center justify-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6 cursor-pointer   "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
									/>
								</svg>{" "}
							</div>
							<input
								value={address}
								{...getInputProps({
									className:
										"h-[40px] px-3 border-l-[1px] ml-2 w-[80%]  bg-white outline-none  text-[14px]",
									type: "text",
									placeholder: "Enter your address",
								})}
							/>
							<div
								onClick={() =>
									props.setDisplaySearchContent(false)
								}
								className="h-full w-[40px] border-l-[1px] cursor-pointer flex-center justify-center "
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="w-6 h-6 "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
							</div>
						</form>

						{!displayContent && (
							<div className="mt-[30px] mb-[20px] px-5">
								<h6 className="text-[16px]">Recent searches</h6>
								{[1, 2, 3].map((i) => (
									<div key={i} className="flex-center my-[20px]">
										<div className="border p-1 rounded-[50%] bg-white shadow-lg">
											<Image
												src="/assets/images/Recent.png"
												alt=""
												width={30}
												height={30}
											/>
										</div>
										<span className="text-[17px] ml-3">
											Luong Tai,Bac Ninh,VietNam
										</span>
									</div>
								))}
							</div>
						)}
						{displayContent && (
							<div className="mt-[30px] mb-[20px] ">
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
												width={30}
												height={30}
											/>
											<p className="text-[14px] leading-[40px] h-[40px] capitalize overflow-hidden">
												{" "}
												{suggestion.description}{" "}
											</p>
										</div>
									);
								})}
							</div>
						)}
					</>
				)}
			</PlacesAutocomplete>
		</div>
	);
};

export default SearchBar;
