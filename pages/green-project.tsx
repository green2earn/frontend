import { greenLauncherApi } from "@/api-client/green-launcher-api";
import { MainLayout } from "@/components/layout/MainLayout";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SolarSetup } from "@/models/greenLauncher";

const GreenProject = () => {
	const [projects, setProject] = useState<SolarSetup[] | []>([]);

	const convertToNear = (x: number) => {
		return Math.round(x / 23500 / 1.2);
	};
	const coor = [
		{ Latitude: 10.8372, Longitude: 106.6657 },
		{ Latitude: 21.0285, Longitude: 105.8542 },
		{ Latitude: 21.0356, Longitude: 105.8957 },
		{ Latitude: 21.1465, Longitude: 106.066 },
		{ Latitude: 20.9517, Longitude: 107.0737 },
		{
			Latitude: 11.0131,
			Longitude: 106.6504,
		},
		{ Latitude: 10.7769, Longitude: 106.6958 },
		{ Latitude: 8.644137, Longitude: 111.919352 },
	];

	const icons = [
		"/assets/images/Icon Green 2 earn-01.png",
		"/assets/images/Icon Green 2 earn-01.png",
		"/assets/images/Icon Green 2 earn-02.png",
		"/assets/images/Icon Green 2 earn-01.png",
		"/assets/images/Icon Green 2 earn-02.png",
		"/assets/images/Icon Green 2 earn-02.png",
		"/assets/images/Icon Green 2 earn-01.png",
		"/assets/images/Icon Green 2 earn-01.png",
	];

	const formatDate = (inputDatetime: string) => {
		const parsedDate = new Date(inputDatetime);
		const day = parsedDate.getUTCDate();
		const month = parsedDate.getUTCMonth() + 1; // Month is 0-based
		const year = parsedDate.getUTCFullYear();
		return `${day}-${month}-${year}`;
	};
	useEffect(() => {
		const getAllProject = async () => {
				try {
					const { data } = await greenLauncherApi.getAllProject();
					let arr_temp = [];
					for (let i = data.length - 4; i >= 0; i--) {
						arr_temp.push(data[i]);
					}
					setProject(arr_temp);
				} catch (error) {
					toast.error("Somthing went wrong");
				}
			};
		getAllProject();
	}, []);

	return (
		<div className="w-screen  relative bg-[#f6f6f6] px-[120px] py-[50px]">
			<div className="grid grid-cols-3 h-[100px]  gap-7">
				<div className="col-span-1 rounded-[10px] bg-white p-[16px]">
					<h3 className="text-[#2b8c7a] text-[24px] font-[600]">
						Invest
					</h3>
					<p className="text-[12px] font-[300]">
						Buy, sell and trade carbon credits from projects that
						have effectively reduced or removed greenhouse gas
						emissions and track the impact of your investment
					</p>
				</div>
				<div className="col-span-1 rounded-[10px] bg-white p-[16px]">
					<h3 className="text-[#2b8c7a] text-[24px] font-[600]">
						Offset
					</h3>
					<p className="text-[12px] font-[300]">
						By purchasing carbon offsets or credits, you can
						compensate for your own carbon emissions while
						supporting the development of sustainable projects
						around the world.
					</p>
				</div>
				<div className="col-span-1 rounded-[10px] bg-white p-[16px]">
					<h3 className="text-[#2b8c7a] text-[24px] font-[600]">
						Earn
					</h3>
					<p className="text-[12px] font-[300]">
						By investing in verified carbon credits on our
						marketplace, you can not only help mitigate climate
						change but earn various rewards and incentives through
						our ecosystem
					</p>
				</div>
			</div>
			<h1 className="mt-[50px] text-[36px] font-[500]">Listing</h1>
			<div className="grid grid-cols-3 mt-[40px] gap-7">
				{projects.length > 0 &&
					projects?.map((i, index) => (
						<div
							key={i.id}
							className="col-span-1 relative  border-[3px] rounded-[8px] border-[#40c1ac]"
						>
							<div className="absolute top-[-25px] rounded-tl-[8px] bg-static text-white text-[12px] rounded-tr-[8px] left-0 px-[10px] py-1 ">
								Funding
							</div>{" "}
							<div>
								<div className=" relative border-b-[1px] h-[200px] w-[375px] ">
									<img
										src={`https://maps.googleapis.com/maps/api/staticmap?center=${coor[index]?.Latitude},${coor[index]?.Longitude}&zoom=14&size=375x200&key=${process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API}&maptype="satellite"&style=feature:all|element:labels|visibility:off`}
										alt=""
									/>
									<div className="absolute top-0 left-0 w-full h-full flex-center justify-center right-0 layer z-2">
										<img
											className="h-[100px] w-[80px] "
											src={
												icons[index]
													? icons[index]
													: "/assets/images/Icon Green 2 earn-01.png"
											}
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className=" px-[20px] py-3">
								<h2 className="text-[18px] font-[600]">
									{i.title}
								</h2>
								<p className="">
									Project CODE:{" "}
									<span className="text-green-500 font-[500] text-[16px]">
										{i.code}
									</span>
								</p>
								<p>
									Token:
									<span className="text-green-500">
										{i.code}
									</span>
								</p>

								<p>
									Estimated Cost:
									<span className="text-red-500">
										{convertToNear(
											Number(i.total_construction_cost)
										)}{" "}
										Near
									</span>
								</p>
								{/* <p>
									Estimated Payback Time:
									<span className="text-red-500">
										{Math.round(i.payback_time / 365)}
										Year
									</span>
								</p> */}
								<p>
									Current:{" "}
									<span className="text-green-500">0</span>
								</p>
								<p>Start date: {formatDate(i.created_at)}</p>
							</div>
							<div className="w-full flex-center justify-center mb-[10px]">
								<p className="px-[25px] py-2 border text-white bg-static rounded-[5px] cursor-pointer">
									Invest into this project
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default GreenProject;
GreenProject.Layout = MainLayout;
