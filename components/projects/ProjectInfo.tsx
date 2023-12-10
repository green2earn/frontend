import {
	GlobeAltIcon,
	MapPinIcon,
	PhoneIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddAddress from "./AddAddress";
import axios from "axios";

interface Iprops {
	address: string;
	setAddress: Dispatch<SetStateAction<string>>;
	long: string;
	setLong: Dispatch<SetStateAction<string>>;
	lat: string;
	setLat: Dispatch<SetStateAction<string>>;
}

const ProjectInfo = (props: Iprops) => {
	const listLi = [
		{
			id: 1,
			text: "Address",
			icon: <MapPinIcon className="h-6 w-6 text-blue-500 mr-2" />,
		},
		{
			id: 2,
			text: "Phone",
			icon: <PhoneIcon className="h-6 w-6 text-blue-500 mr-2" />,
		},
		{
			id: 3,
			text: "Owner",
			icon: <UserIcon className="h-6 w-6 text-blue-500 mr-2" />,
		},
		{
			id: 4,
			text: "Web",
			icon: <GlobeAltIcon className="h-6 w-6 text-blue-500 mr-2" />,
		},
	];
	const [active, setActive] = useState<number>(1);
	const handleClickList = (i: number) => {
		setActive(i);
	};

	return (
		<div className="flex mt-7 w-full">
			<h3 className="w-[20%]">Contact </h3>
			<div className="w-[60%] border">
				<div className="flex border-l-[1px]  border-r-[1px]">
					<nav className="w-1/4 border-r-[1px]">
						<ul className=" h-full bg-[#eef1f0]">
							{listLi.map((i) => (
								<li
									onClick={() => handleClickList(i.id)}
									key={i.id}
									className={`border-b-[1px] pl-2 cursor-pointer ${
										active === i.id && "bg-white"
									} flex-center text-blue-500 py-2`}
								>
									{i.icon}
									{i.text}
								</li>
							))}
						</ul>
					</nav>
					<div className="w-3/4 p-4 bg-white">
						{active === 1 && (
							<AddAddress
								address1={props.address}
								setAddress1={props.setAddress}
								long1={props.long}
								setLong1={props.setLong}
								lat1={props.lat}
								setLat1={props.setLat}
							/>
						)}
						{active === 2 && (
							<input
								className="w-3/4 border-b-[1px] px-3"
								placeholder="Enter the phone number"
							/>
						)}
						{active === 3 && (
							<input
								type="text"
								className="w-3/4 border-b-[1px] px-3"
								placeholder="Enter website of the project"
							/>
						)}
						{active === 4 && (
							<input
								type="text"
								className="w-3/4 border-b-[1px] px-3"
								placeholder="Enter website of the project"
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectInfo;
