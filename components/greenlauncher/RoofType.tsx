import { setChooseRoofType, setDisplayRoofType, setDisplayStep1, setQuanlity } from "@/stores/activeButtonSlice"
import { useAppDispatch, useAppSelector } from "@/stores/store"
import { motion } from "framer-motion"
import { ChangeEvent, useState } from "react"
import Summary from "./Summary"
import UserInfor from "./UserInfor"



const RoofType = () => {
    const { displayRoofType ,roofType,address ,propertyType,solarData,quanlity} = useAppSelector(state => state.activeButton)
	const{totalArea} = useAppSelector(state=>state.draw)
    const [doneStep2, setDoneStep2] = useState(false)
	const [doneStep3, setDoneStep3] = useState(false)
	const [doneStep4, setDoneStep4] = useState(false)
	const [doneStep5, setDoneStep5] = useState(false)
	const[use,setUse] = useState('')
	const [next, setNext] = useState(false)
	const [nextToTypeOfUse, setNextToTypeOfUse] = useState(false)
	const [nextToPin, setNextToPin] = useState(false)
	const[nextToInfo,setNextToInfo] = useState(false)
    const dispatch = useAppDispatch()
	const [dropdown1, setDropdown1] = useState(false)
	const [dropdown2, setDropdown2] = useState(false)
	const[typeOfUse,setTypeOfUse] = useState('')
    const handleBack1 = () => {
        dispatch(setDisplayStep1(true))
        dispatch(setDisplayRoofType(false))
        setNext(false)
    }
    const handleNext = () => {
        setNextToTypeOfUse(true)
		setDoneStep2(true)
		setNext(true)
	}
	const handleNext2 = () => {
		setDoneStep3(true)
		setNextToPin(true)
		setNextToTypeOfUse(false)

	}
	const handleNext3 = () => {
		setDoneStep4(true)
		setNextToPin(false)
		setNextToInfo(true)
		setNext(false)
	}
	const handleBack2 = () => {
		setDoneStep2(false)
		setNextToPin(false)
		setNextToTypeOfUse(false)
		setNext(false)
	}
	const handleBack3 = () => {
		setDoneStep3(false)
		setNextToPin(false)
		setNextToTypeOfUse(true)
		//setNext(true)
	}
  return (
		<motion.div
			initial={{ y: 1000 }}
			animate={{
				y: displayRoofType ? 0 : 1000,
			}}
			transition={{ duration: 0.4, delay: 0.3 }}
			className="h-screen w-screen bg-white absolute z-[20] pt-[60px] "
		>
			<div className="flex w-full  height ">
				<ul className="w-[5%] flex-col border-r-[1px] shadow-sm  text-[16px] flex-center justify-start mx-auto py-[20px] bg-white ">
					<li className="flex-center justify-center h-[40px] w-[40px] bg-[#09A507] rounded-[50%] border text-white cursor-pointer ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 12.75l6 6 9-13.5"
							/>
						</svg>
					</li>
					<div className=" my-[5px] h-[40px] w-[2px] bg-[#09A507] "></div>
					<li className="flex-center justify-center h-[40px] w-[40px] bg-[#09A507] rounded-[50%] border text-white cursor-pointer ">
						{doneStep2 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
						) : (
							2
						)}
					</li>
					<div
						className={` my-[5px] h-[40px] w-[2px] ${
							doneStep2 ? "bg-[#09A507]" : "bg-[#a5a9a5]"
						} `}
					></div>
					<li
						className={`flex-center justify-center h-[40px] w-[40px]  rounded-[50%] border ${
							doneStep2
								? "bg-[#09A507] text-white"
								: "bg-[#fafbfa]"
						}   `}
					>
						{doneStep3 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
						) : (
							3
						)}
					</li>
					<div
						className={` my-[5px] h-[40px] w-[2px] ${
							doneStep3 ? "bg-[#09A507]" : "bg-[#a5a9a5]"
						} `}
					></div>
					<li
						className={`flex-center justify-center h-[40px] w-[40px]  rounded-[50%] border ${
							doneStep3
								? "bg-[#09A507] text-white"
								: "bg-[#fafbfa]"
						}   `}
					>
						{doneStep4 ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12.75l6 6 9-13.5"
								/>
							</svg>
						) : (
							4
						)}
					</li>
					<div
						className={` my-[5px] h-[40px] w-[2px] ${
							doneStep4 ? "bg-[#09A507]" : "bg-[#a5a9a5]"
						} `}
					></div>
					<li
						className={`flex-center justify-center h-[40px] w-[40px]  rounded-[50%] border ${
							doneStep4
								? "bg-[#09A507] text-white"
								: "bg-[#fafbfa]"
						}   `}
					>
						5
				  </li>
				  {/* {doneStep5 && (
					  <svg
						  xmlns="http://www.w3.org/2000/svg"
						  fill="none"
						  viewBox="0 0 24 24"
						  stroke-width="1.5"
						  stroke="currentColor"
						  className="w-5 h-5"
					  >
						  <path
							  stroke-linecap="round"
							  stroke-linejoin="round"
							  d="M4.5 12.75l6 6 9-13.5"
						  />
					  </svg>
				  ) } */}
				</ul>
				<div className="w-[65%] p-[30px] relative h-full ">
					<motion.div
						initial={{ y: 0 }}
						animate={{
							y: next ? 1000 : 0,
						}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full"
					>
						<h2 className="text-[20px]">
							My rooftop type is ...
							<span className="text-[14px]">
								(Click to choose)
							</span>
						</h2>
						<div className="grid grid-cols-3 grid-rows-2 h-[250px] gap-4 mt-[10px]">
							<div
								className={`col-span-1 row-span-1 flex-center cursor-pointer px-2 rounded-[8px] bg-[#fff] border`}
							>
								<div className="flex ">
									<input
										id="bordered-radio-1"
										checked={roofType == "Metal Roof"}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) =>
											dispatch(
												setChooseRoofType(
													e.target.value
												)
											)
										}
										type="radio"
										value="Metal Roof"
										name="bordered-radio"
										className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
									/>
								</div>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/metal_roof.png"
									alt=""
								/>
								<p className="text-[16px]">Metal Roof</p>
							</div>
							<div
								className={`col-span-1 row-span-1 px-2 flex-center cursor-pointer rounded-[8px] bg-[#fff] border`}
							>
								<input
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										dispatch(
											setChooseRoofType(e.target.value)
										)
									}
									checked={roofType == "Concrete Roof"}
									id="bordered-radio-1"
									type="radio"
									value="Concrete Roof"
									name="bordered-radio"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
								/>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/concrete_roof.png"
									alt=""
								/>
								<p className="text-[16px]">Concrete Roof</p>
							</div>
							<div
								className={`col-span-1 row-span-1 px-2 flex-center cursor-pointer rounded-[8px] bg-[#fff] border`}
							>
								<input
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										dispatch(
											setChooseRoofType(e.target.value)
										)
									}
									checked={roofType == "Mixed Roof"}
									id="bordered-radio-1"
									type="radio"
									value="Mixed Roof"
									name="bordered-radio"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
								/>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/mixed_roof.png"
									alt=""
								/>
								<p className="text-[16px]">Mixed Roof</p>
							</div>
							<div
								className={`col-span-1 row-span-1 px-2 flex-center cursor-pointer rounded-[8px] bg-[#fff] border`}
							>
								<input
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										dispatch(
											setChooseRoofType(e.target.value)
										)
									}
									checked={
										roofType ==
										"Tile Roof With Dormer Window"
									}
									id="bordered-radio-1"
									type="radio"
									value="Tile Roof With Dormer Window"
									name="bordered-radio"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
								/>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/tiled_roof_dormer_windows.png"
									alt=""
								/>
								<p className="text-[16px]">
									Tile Roof With Dormer Window
								</p>
							</div>
							<div
								className={`col-span-1 row-span-1 px-2 flex-center cursor-pointer rounded-[8px] bg-[#fff] border`}
							>
								<input
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										dispatch(
											setChooseRoofType(e.target.value)
										)
									}
									checked={roofType == "Simple Tile Roof"}
									id="bordered-radio-1"
									type="radio"
									value="Simple Tile Roof"
									name="bordered-radio"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
								/>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/simple_tiled_roof.png"
									alt=""
								/>
								<p className="text-[16px]">Simple Tile Roof</p>
							</div>
							<div
								className={`col-span-1 row-span-1 px-2 flex-center cursor-pointer rounded-[8px] bg-[#fff] border`}
							>
								<input
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) =>
										dispatch(
											setChooseRoofType(e.target.value)
										)
									}
									checked={roofType == "Others"}
									id="bordered-radio-1"
									type="radio"
									value="Others"
									name="bordered-radio"
									className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
								/>
								<img
									className="w-[50%]"
									src="https://simulator.getsolar.ai/unknown_roof.png"
									alt=""
								/>
								<p className="text-[16px]">Others</p>
							</div>
						</div>
						<div className="w-full flex-center justify-center flex-col mt-[20px]">
							{roofType == "" ? (
								<div className="w-[50%] h-[40px] text-[15px] bg-[#fff3c3] text-center cursor-text rounded-[8px] text-[#b1b2b2] leading-[40px] mt-[30px]">
									Continue
								</div>
							) : (
								<div
									onClick={handleNext}
									className="w-[50%] h-[40px] text-[15px] bg-[#f5ce30] text-center cursor-pointer rounded-[8px]  leading-[40px] mt-[30px]"
								>
									Continue
								</div>
							)}

							<div
								onClick={handleBack1}
								className="w-[50%] h-[40px] bg-[#e5e7eb] text-center cursor-pointer text-[15px] rounded-[8px] mt-[20px] leading-[40px]"
							>
								Back
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: 1000 }}
						animate={{
							y: nextToTypeOfUse ? 0 : 1000,
						}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full bg-white absolute left-0 top-0 h-full"
					>
						<div className="h-full w-full border flex-col flex-center justify-center">
							<div className="h-[50%] w-[40%] border p-[24px] bg-white rounded-[16px]">
								<h2 className="text-center text-[24px] text-[#09A507]">
								Select status
								</h2>
								<h3 className="mt-[10px] text-[18px] mb-[20px]">
								Select the method of electricity usage
								</h3>
								<div className="flex-col mb-3">
									<div className="flex items-center mb-3">
										<input
											onChange={(e) =>
												setUse(e.target.value)
											}
											id="default-radio-1"
											type="radio"
											value="Self-usage"
											name="default-radio"
											className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
										Self-usage
										</label>
									</div>
									{/* {use === "Self-usage" && (
										<div className="w-full h-[40px] relative justify-between flex-center text-start pl-[20px] text-[16px] font-[300] leading-[40px] border-[1px] border-[#09A507] rounded-[16px]">
											Dien sinh hoat
											<div
												onClick={() =>
													setDropdown1(!dropdown1)
												}
												className="w-[50px] flex-center bg-[#09A507] h-full cursor-pointer border-[1px] rounded-r-[16px] justify-center"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													className="w-5 h-5 text-white "
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M19.5 8.25l-7.5 7.5-7.5-7.5"
													/>
												</svg>
											</div>
											{dropdown1 && (
												<ul className="absolute top-[41px] bg-white rounded-[16px] pl-[20px] left-0  w-full z-[10] border">
													<li className="h-[40px] border-b-[1px] leading-[40px] ">
														Dien sinh hoat
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Dien kinh doanh
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Dien san xuat
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Dien co so cong cong
													</li>
												</ul>
											)}
										</div>
									)} */}
								</div>
								<div className="flex items-center mb-3">
									<input
										onChange={(e) => {
											setTypeOfUse(e.target.value),
												setUse(""),
												setUse("");
										}}
										id="default-radio-2"
										type="radio"
										value="Sell to the EVN retailer"
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
									<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
									Sell to the EVN retailer
									</label>
								</div>
								<div className="flex-col mb-3">
									<div className="flex items-center mb-3">
										<input
											onChange={(e) =>
												setUse(e.target.value)
											}
											id="default-radio-2"
											type="radio"
											value="Sell to other household "
											name="default-radio"
											className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
										/>
										<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
										Sell to other household 
										</label>
									</div>
									{/* {use === "Sell to other household " && (
										<div className="w-full h-[40px] relative justify-between flex-center text-start pl-[20px] text-[16px] font-[300] leading-[40px] border-[1px] border-[#09A507] rounded-[16px]">
											Dien sinh hoat
											<div
												onClick={() =>
													setDropdown2(!dropdown2)
												}
												className="w-[50px] flex-center bg-[#09A507] h-full cursor-pointer border-[1px] rounded-r-[16px] justify-center"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													className="w-5 h-5 text-white "
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M19.5 8.25l-7.5 7.5-7.5-7.5"
													/>
												</svg>
											</div>
											{dropdown2 && (
												<ul className="absolute top-[41px] bg-white rounded-[16px] pl-[20px] left-0  w-full z-[10] border">
													<li className="h-[40px] border-b-[1px] leading-[40px] ">
														Tinh theo gia sinh hoat
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Tinh theo gia kinh doanh
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Tinh theo gia san xuat
													</li>
													<li className="h-[40px] border-b-[1px] leading-[40px]">
														Tinh theo gia dien cong
														cong
													</li>
												</ul>
											)}
										</div>
									)} */}
								</div>
							</div>
							{typeOfUse != "" ? (
								<div
									onClick={handleNext2}
									className="w-[50%] h-[40px] text-[15px] bg-[#f5ce30] text-center cursor-pointer rounded-[8px]  leading-[40px] mt-[30px]"
								>
									Continue
								</div>
							) : (
								<div className="w-[50%] h-[40px] text-[15px] bg-[#fff3c3] text-center cursor-text rounded-[8px] text-[#b1b2b2] leading-[40px] mt-[30px]">
									Continue
								</div>
							)}
							<div
								onClick={handleBack2}
								className="w-[50%] h-[40px] bg-[#e5e7eb] text-center cursor-pointer text-[15px] rounded-[8px] mt-[20px] leading-[40px]"
							>
								Back
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: 1000 }}
						animate={{
							y: nextToPin ? 0 : 1000,
						}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full bg-white absolute left-0 top-0 h-full"
					>
						<div className="h-full w-full border flex-col flex-center justify-center">
							<div className="h-[50%] w-[40%] border p-[24px] bg-white rounded-[16px]">
								<h2 className="text-center text-[24px] text-[#09A507]">
								Select status
								</h2>
								<h3 className="mt-[10px] text-[20px] mb-[20px]">
								Choose type of  solar panel
								</h3>
								<div className="flex-col mb-3">
									<div className="flex items-center mb-3">
										<input
											onChange={(e) =>
												dispatch(setQuanlity(e.target.value))
											}
											id="default-radio-1"
											type="radio"
										  value="High-End"
										    checked
											name="default-radio"
											className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
										High-End(Mono)
										</label>
									</div>
									
								</div>
								<div className="flex items-center mb-3">
									<input
										onChange={(e) => {
											dispatch(setQuanlity(e.target.value))
										}}
										id="default-radio-2"
										type="radio"
									  value="Mid-Range"
									  checked ={quanlity =='Mid-Range'}
										name="default-radio"
										className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
									/>
									<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
									Mid-Range(Poly)
									</label>
								</div>
								<div className="flex-col mb-3">
									<div className="flex items-center mb-3">
										<input
											onChange={(e) =>
												dispatch(setQuanlity(e.target.value))
											}
											id="default-radio-2"
											type="radio"
										  value="Low-End"
										  checked ={quanlity =='Low-End'}
											name="default-radio"
											className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300   "
										/>
										<label className="ml-2 text-[16px] font-[300] text-[#181818] dark:text-gray-300">
											Low-End(ThinFilm)
										</label>
									</div>
									
								</div>
							</div>
							{quanlity != "" ? (
								<div
									onClick={handleNext3}
									className="w-[50%] h-[40px] text-[15px] bg-[#f5ce30] text-center cursor-pointer rounded-[8px]  leading-[40px] mt-[30px]"
								>
									Continue
								</div>
							) : (
								<div className="w-[50%] h-[40px] text-[15px] bg-[#fff3c3] text-center cursor-text rounded-[8px] text-[#b1b2b2] leading-[40px] mt-[30px]">
									Continue
								</div>
							)}
							<div
								onClick={handleBack3}
								className="w-[50%] h-[40px] bg-[#e5e7eb] text-center cursor-pointer text-[15px] rounded-[8px] mt-[20px] leading-[40px]"
							>
								Back
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ y: 1000 }}
						animate={{
							y: nextToInfo ? 0 : 1000,
						}}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="w-full bg-white absolute left-0 top-0 h-full"
				  >   
						  <UserInfor  setDoneStep4={setDoneStep4} setDoneStep5={setDoneStep5} setNextToInfo={setNextToInfo} setNextToPin ={setNextToPin} setNext={setNext} />
					 
						{/* <Summary /> */}
					</motion.div>
				</div>
				<div className="w-[30%] h-full border bg-[#f1f2f2]  p-[20px]">
					<div className="bg-white h-[550px] rounded-[8px] w-full p-[10px]">
						<h2 className="text-black min-h-[50px] py-1 bg-[#fff7d8] flex-center text-[15px] justify-center rounded-[5px] text-center">
							{address}
						</h2>
						<p className="text-[#6b7280] mt-[10px] text-[15px] font-[400]">
							Type:{" "}
							<span className="text-[#000]">{propertyType}</span>
						</p>
						<p className="text-[#6b7280] mt-[10px] text-[15px] font-[400]">
							Roof Space:{" "}
							<span className="text-[#000]">
								{totalArea} m <sup>2</sup>
							</span>
						</p>
						<p className="text-[#6b7280] mt-[10px] text-[15px] font-[400]">
						 MaxSunshineHoursPerYear:{" "}
						  <span className="text-[#000]">{ solarData.MaxSunshineHoursPerYear} </span>
						</p>
						<p className="text-[#6b7280] mt-[10px] text-[15px] font-[400]">
						Radiation Intensity :{" "}
						  <span className="text-[#000]">{solarData.RadiationIntensity } Kwh/m2</span>
						</p>
						
						<div className="h-[250px] w-[100%] mt-[50px] flex-center justify-center">
							{propertyType == "Landed house" && (
								<img
									className="w-[90%] h-full"
									src="https://images.squarespace-cdn.com/content/v1/632aa5e01277374afac29533/d7c38ca6-aa87-4a77-994b-e6bb054a5337/Screenshot+2022-9-15+at+3.15.51+PM.jpg"
									alt=""
								/>
							)}
							{propertyType == "Condominium" && (
								<img
									className="w-[90%] h-full"
									src="https://www.hardwarezone.com.sg/thumbs/639061/b.jpg"
									alt=""
								/>
							)}
							{propertyType == "Rented Comercial Property" && (
								<img
									className="w-[90%] h-full"
									src="https://5.imimg.com/data5/SELLER/Default/2022/12/QR/KD/OI/59740639/commercial-solar-panel-installation-500x500.jpg"
									alt=""
								/>
							)}
							{propertyType == "Owned Comercial Property" && (
								<img
									className="w-[90%] h-full"
									src="https://5.imimg.com/data5/SELLER/Default/2022/12/QR/KD/OI/59740639/commercial-solar-panel-installation-500x500.jpg"
									alt=""
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</motion.div>
  );
}

export default RoofType
