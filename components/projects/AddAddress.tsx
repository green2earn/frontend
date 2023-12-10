import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { GeocodeResponse } from "@/models/media";
interface Iprops {
	address1: string;
	setAddress1: Dispatch<SetStateAction<string>>;
	long1: string;
	setLong1: Dispatch<SetStateAction<string>>;
	lat1: string;
	setLat1: Dispatch<SetStateAction<string>>;
}
const AddAddress = (props: Iprops) => {
	const [loading, setISLoading] = useState<boolean>(false);

	const findAddress = async () => {
		if (props.address1 == "") {
			toast.error("You must enter your address");
		} else {
			setISLoading(true);
			try {
				const encodedAddress = encodeURIComponent(props.address1);
				const res = await axios.get<GeocodeResponse>(
					`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyA4tOxuGoWQ72EDL3dIsg5nEiIZwyFU6qA`
				);
				setISLoading(false);
				if (
					res.data &&
					res?.data.results &&
					res.data.results.length > 0
				) {
					const location = res.data.results[0].geometry.location;
					props.setLat1(String(location.lat));
					props.setLong1(String(location.lng));
				} else {
					console.log("No results found");
				}
			} catch (error) {
				console.log(error);
				setISLoading(false);
			}
		}
	};

	return (
		<div className="w-full">
			<div className="flex-center   ">
				<label>Address:</label>
				<div className="w-[80%] relative">
					<input
						type="text"
						name="address"
						value={props.address1}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							props.setAddress1(e.target.value)
						}
						className=" ml-2 w-full outline-none  leading-[30px]  border-b-[1px] focus:outline-none "
					/>
					{false && (
						<div className="absolute top-[30px] ml-2 w-full h-[100px] bg-black z-50">
							{" "}
							hello
						</div>
					)}
				</div>
			</div>
			<div className="mt-3 flex justify-between">
				<div className="flex flex-col">
					<label>Longitude :</label>
					<input
						type="text"
						value={props.long1}
						className="outline-none  leading-[20px] w-[80%] border-b-[1px] focus:outline-none"
					/>
				</div>
				<div className="flex flex-col">
					<label>Latitude :</label>
					<input
						value={props.lat1}
						className="outline-none  leading-[20px]  w-[80%] border-b-[1px] focus:outline-none"
					/>
				</div>
			</div>
			<div className="flex-center justify-center">
				<Button
					onClick={findAddress}
					type="button"
					isLoading={loading}
					className="border px-[15px] py-[6px] rounded-md mt-2 flex-center justify-center"
				>
					Search
				</Button>
			</div>
		</div>
	);
};

export default AddAddress;
