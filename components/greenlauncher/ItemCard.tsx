import { setActiveButtonAddProductToGreenLauncher } from "@/stores/greenLauncherSlice";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import truncate from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const ItemCard = () => {
	const [isMoving, setIsMoving] = useState("");
	const panelList = [
		{
			id: 1,
			image: "/assets/images/panel.jpeg",
			price: "3650000",
			title: "Solar Panel LONGI LR4-72HPH 450M (450W)",
			isRecommended: true,
		},
		{
			id: 2,
			image: "/assets/images/panel.jpeg",
			price: "4950000",
			title: "Tấm pin quang điện LONGI LR4-72HPH 440M (440W)",
			isRecommended: true,
		},
		{
			id: 3,
			image: "/assets/images/panel.jpeg",
			price: "2650000",
			title: "Pin mặt trời công suất lớn Canadian Solar HiKu CS3W-455MS (455W)",
			isRecommended: true,
		},
		{
			id: 7,
			image: "/assets/images/panel.jpeg",
			price: "3054000",
			title: "Solar Panel Canadian Mono CS3W-440MS (440W)",
			isRecommended: true,
		},
		{
			id: 4,
			image: "/assets/images/panel.jpeg",
			price: "2400000",
			title: "Pin năng lượng mặt trời AE Solar AE450HM6L-72 450W",
			isRecommended: false,
		},
		{
			id: 5,
			image: "/assets/images/panel.jpeg",
			price: "3400000",
			title: "Tấm pin thế hệ mới Jinko Solar Tiger Neo 560W",
			isRecommended: false,
		},
		{
			id: 6,
			image: "/assets/images/panel.jpeg",
			price: "3350000",
			title: "Pin mặt trời cao cấp JinkoSolar Tiger Pro 535W",
			isRecommended: false,
		},
	];
	const dispatch = useAppDispatch();
	const { activeButtonAddProduct } = useAppSelector(
		(state) => state.greenLauncher
	);
	const handleSelectItem = (item: {
		id: number;
		image: string;
		price: string;
		isRecommended: boolean;
		title: string;
	}) => {
		dispatch(
			setActiveButtonAddProductToGreenLauncher({
				id: String(item.id),
				title: item.title,
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
			{panelList.map((i) => (
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
						} right-0 left-0 h-[130px] w-full bg-black `}
					>
						<Image fill src={i.image} alt="" />
					</div>
					<div className="absolute top-[170px]">
						<p className="text-[15px] text-[#0066c0] font-[600] my-2 uppercase text-start">
							{truncate(i.title, 30)}
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
									activeButtonAddProduct == String(i.id)
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

export default ItemCard;
