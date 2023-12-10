import { useAppSelector } from "@/stores/store";
import {
	anualVenue,
	installationCostTotal,
	paybackTime,
	yearlySolarEnergyProduction,
} from "@/utils";
import { useState } from "react";
import NotiPopup from "./NotificationPopup";
import { greenLauncherApi } from "@/api-client/green-launcher-api";
import { useDispatch } from "react-redux";
import {
	setContentInformationPopup,
	setShowInformationPopup,
} from "@/stores/greenLauncherSlice";
import { toast } from "react-toastify";
import { popuploginPage } from "@/stores/toggleSlice";

const Summary = () => {
	const dispatch = useDispatch();
	const { address, solarData, quanlity, roofType } = useAppSelector(
		(state) => state.activeButton
	);
	const { totalArea } = useAppSelector((state) => state.draw);
	const { isLoggedin } = useAppSelector((state) => state.auth);
	const { polylines } = useAppSelector((state) => state.draw);

	const [display, setDisplay] = useState(false);
	const handleToastClick = (
		total_construction_cost: string,
		title: string,
		code: string,
		id: number
	) => {
		// Xử lý sự kiện khi thông báo được click
		dispatch(setShowInformationPopup(true));
		dispatch(
			setContentInformationPopup({
				type: "create_token",
				data: { total_construction_cost, title, code, id },
			})
		);
	};
	const handleSaveToDB = async () => {
		if (isLoggedin) {
			try {
				const { data } = await greenLauncherApi.createGreenLauncher({
					title: "test",
					status: "Pending",
					roof_type: 1,
					area: totalArea,
					region_id: 1,
					points: JSON.stringify(polylines),
					category_id: 1,
					launcher_type_id: 1,
				});
				console.log("dataBE", data);
				toast(
					<div
						onClick={() =>
							handleToastClick(
								data?.total_construction_cost,
								data?.title,
								data?.code,
								data.id
							)
						}
					>
						<p>
							Created a project successfully. Please create tokens
							for the project.
						</p>
					</div>
				);
			} catch (error) {
				console.log(error);
			}
		} else {
			dispatch(popuploginPage());
		}
	};

	return (
		<div className="h-full relative w-full border flex-col flex-center justify-center">
			{display && <NotiPopup />}
			<div className="h-[95%] w-[95%] border bg-white rounded-[16px] p-[16px]">
				<h2 className="text-[24px] text-center text-[#09A507]">
					Your Personalised Solar Offer
				</h2>
				<h3 className="text-[18px] font-[500]">Project Information</h3>
				<div className="flex-center h-[40px] justify-between my-[20px]">
					<div className="w-[52%] h-full border px-2 leading-[40px]  rounded-[16px] relative">
						<span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
							Located at
						</span>
						<p className="overflow-hidden h-full text-[#181818]">
							{address}
						</p>
					</div>
					<div className="w-[44%] h-full border flex-center px-2 leading-[40px]  rounded-[16px] relative">
						<span className="absolute top-[-10px] font-[300]  left-[15px] text-[13px] bg-white leading-[17px] text-[#525252]">
							Roof space m <sup>2</sup>
						</span>
						<input
							className="h-[90%] w-[90%] outline-none"
							value={totalArea}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					</div>
				</div>

				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-white uppercase bg-[#195B1B]  dark:text-gray-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Installed Capacity
								</th>
								<th scope="col" className="px-6 py-3">
									100%
								</th>
								<th scope="col" className="px-6 py-3">
									80%
								</th>
								<th scope="col" className="px-6 py-3">
									60%
								</th>
								<th scope="col" className="px-6 py-3">
									40%
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									YearlySolarEnergyGenerated(kWh)
								</th>
								<td className="px-6 py-4">
									{yearlySolarEnergyProduction(
										totalArea,
										1.63,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										1
									)}
								</td>
								<td className="px-6 py-4">
									{yearlySolarEnergyProduction(
										totalArea,
										1.94,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.8
									)}
								</td>
								<td className="px-6 py-4">
									{yearlySolarEnergyProduction(
										totalArea,
										1.97,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.6
									)}
								</td>
								<td className="px-6 py-4 ">
									{yearlySolarEnergyProduction(
										totalArea,
										2.5,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.4
									)}
								</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Annual revenue(USD)
								</th>
								<td className="px-6 py-4">
									{anualVenue(
										totalArea,
										1.63,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										1
									)}
								</td>
								<td className="px-6 py-4">
									{anualVenue(
										totalArea,
										1.94,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.8
									)}
								</td>
								<td className="px-6 py-4">
									{anualVenue(
										totalArea,
										1.97,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.6
									)}
								</td>
								<td className="px-6 py-4 ">
									{anualVenue(
										totalArea,
										2.5,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										0.4
									)}
								</td>
							</tr>
							<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Total Cost
								</th>
								<td className="px-6 py-4">
									{installationCostTotal(
										totalArea,
										1.63,
										147,
										roofType,
										1
									)}
								</td>
								<td className="px-6 py-4">
									{installationCostTotal(
										totalArea,
										1.95,
										147,
										roofType,
										0.8
									)}
								</td>
								<td className="px-6 py-4">
									{installationCostTotal(
										totalArea,
										1.97,
										147,
										roofType,
										0.6
									)}
								</td>
								<td className="px-6 py-4 ">
									{installationCostTotal(
										totalArea,
										2.5,
										147,
										roofType,
										0.4
									)}
								</td>
							</tr>
							<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Payback Time (month)
								</th>
								<td className="px-6 py-4">
									{paybackTime(
										totalArea,
										1.63,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.25,
										quanlity,
										160,
										roofType,
										1
									)}
								</td>
								<td className="px-6 py-4">
									{paybackTime(
										totalArea,
										1.94,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.35,
										quanlity,
										230,
										roofType,
										0.8
									)}
								</td>
								<td className="px-6 py-4">
									{paybackTime(
										totalArea,
										1.97,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.4,
										quanlity,
										250,
										roofType,
										0.6
									)}
								</td>
								<td className="px-6 py-4 ">
									{paybackTime(
										totalArea,
										2.5,
										Number(
											solarData.MaxSunshineHoursPerYear
										),
										Number(
											solarData.MinSunshineHoursPerYear
										),
										0.55,
										quanlity,
										350,
										roofType,
										0.4
									)}
								</td>
							</tr>
							<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									EquivalentNumberOfCarbonCredit
								</th>
								<td className="px-6 py-4">-</td>
								<td className="px-6 py-1">-</td>
								<td className="px-6 py-1">-</td>
								<td className="px-6 py-1 ">-</td>
							</tr>
							<tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									EquivalentNumberOfTreePlaned
								</th>
								<td className="px-6 py-1">-</td>
								<td className="px-6 py-1">-</td>
								<td className="px-6 py-1">-</td>
								<td className="px-6 py-1 ">-</td>
							</tr>
							<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
								<th
									scope="row"
									className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
								>
									Select
								</th>
								<td className="px-6 py-1 ">
									<input
										id="default-radio-2"
										type="radio"
										value="Sell to the EVN retailer"
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
								</td>
								<td className="px-6 py-1 flex">
									<input
										id="default-radio-2"
										type="radio"
										value="Sell to the EVN retailer"
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
								</td>
								<td className="px-6 py-1 ">
									<input
										id="default-radio-2"
										type="radio"
										value="Sell to the EVN retailer"
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
								</td>
								<td className="px-6 py-1 ">
									<input
										id="default-radio-2"
										type="radio"
										value="Sell to the EVN retailer"
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="w-full flex-center justify-center text-[15px] mt-[30px] h-[40px] ">
					<div
						onClick={() => {
							handleSaveToDB();
						}}
						className="min-w-[150px] border cursor-pointer text-white text-center bg-static py-3 rounded-[8px]"
					>
						I am interested
					</div>
				</div>
			</div>
		</div>
	);
};

export default Summary;
