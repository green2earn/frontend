import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import truncate from "@/utils";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setActiveButtonAddInterverToGreenLauncher } from "@/stores/greenLauncherSlice";

const InverterCard = () => {
	const interverList = [
		{
			id: 1,
			image: "/assets/images/inverter.jpeg",
			price: "64000000",
			isRecommended: true,
		},
		{
			id: 2,
			image: "/assets/images/pin.jpeg",
			price: "40000000",
			isRecommended: false,
		},
		{
			id: 3,
			image: "/assets/images/inverter.jpeg",
			price: "54000000",
			isRecommended: false,
		},
		{
			id: 7,
			image: "/assets/images/pin.jpeg",
			price: "40000000",
			isRecommended: false,
		},
		{
			id: 4,
			image: "/assets/images/pin.jpeg",
			price: "42000000",
			isRecommended: false,
		},
		{
			id: 5,
			image: "/assets/images/pin.jpeg",
			price: "44000000",
			isRecommended: false,
		},
		{
			id: 6,
			image: "/assets/images/pin.jpeg",
			price: "34000000",
			isRecommended: false,
		},
	];
	const [isMoving, setIsMoving] = useState("");
	const dispatch = useAppDispatch();
	const { activeButtonAddInterver } = useAppSelector(
		(state) => state.greenLauncher
	);
	const handleSelectItem = (item: {
		id: number;
		image: string;
		price: string;
		isRecommended: boolean;
	}) => {
		dispatch(
			setActiveButtonAddInterverToGreenLauncher({
				id: String(item.id),
				title: "Inverter hòa lưới 3 pha 20kW SENERGY SE 20KTL-D3",
				price: String(item.price),
			})
		);
		setIsMoving(String(item.id));
	};
	const convertToNear = (x: number) => {
		return Math.round(x / 23500 / 1.2);
	};
	return (
		<Fragment>
			{interverList.map((i) => (
				<div
					key={i.id}
					className=" relative col-span-1 row-span-1 h-[350px] border p-3"
				>
					{i.isRecommended && (
						<div className=" absolute promotion left-[-5px] top-[10px] right-0 z-10 h-[30px]">
							<div className=" flex  flex-center w-fit py-1 h-full pr-2 bg-[#4ACC35]">
								<Image
									src="/assets/images/Logo G2E.png"
									alt=""
									width={20}
									height={20}
								/>
								<span className="text-[16px] text-white capitalize">
									Recommended
								</span>
							</div>
						</div>
					)}
					<div
						className={`relative ${
							isMoving == String(i.id) ? "flying-img" : "flying"
						} right-0 left-0 h-[150px] w-full bg-black `}
					>
						<Image fill src={i.image} alt="" />
					</div>
					<div className="absolute top-[170px]">
						<p className="text-[15px] text-[#0066c0] font-[600] my-2 uppercase text-start">
							{truncate(
								"Inverter hòa lưới 3 pha 20kW SENERGY SE 20KTL-D3 ",
								30
							)}
						</p>
						<p className="text-[18px] flex flex-row justify-center items-center">
							{convertToNear(parseInt(i.price))}
							<img
								src="/assets/images/near.png"
								alt=""
								className="h-[15px] mx-[5px]"
							/>
						</p>
						<small className="text-[12px] font-[300] text-[#555]">
							Phan phoi by{" "}
							<span className="text-[16px] uppercase font-[500] cursor-pointer text-black">
								Công ty TNHH phát triển ứng dụng công nghệ ĐẠI
								AN
							</span>
						</small>
						<div className="flex-center w-full justify-between pr-3 mt-3">
							<div
								onClick={() => handleSelectItem(i)}
								className={`w-[45%] text-center border ${
									activeButtonAddInterver == String(i.id)
										? "bg-btn text-white"
										: ""
								}  cursor-pointer rounded-md py-2`}
							>
								Add
							</div>
							<div className="w-[45%]  text-center cursor-pointer border rounded-md py-2">
								<Link href="/">Learn more</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</Fragment>
	);
};

export default InverterCard;
