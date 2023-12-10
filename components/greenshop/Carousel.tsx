import Image from "next/image";
import React, { useEffect, useState } from "react";


const Carousel = () => {
	const [display, setDisplay] = useState<boolean>(false)
	const[select,setSelect] = useState<string>('Assets')
	const images = [
		{ index: 0, url: "/assets/images/greenshop-cover.png" }
	];
	const [current, setCurrent] = useState<number>(0);
	const handleRight = () => {
		setCurrent(current === images.length - 1 ? 0 : current + 1);
	};
	
	useEffect(() => {
		const timeOut = setTimeout(() => {
			handleRight();
		}, 10000);
		return () => clearTimeout(timeOut);
	});
	return (
		<div className="w-full relative lg:h-[732px] background-image_greenshop  border">
			<div className="absolute flex-col flex-center justify-center top-[50%] w-full z-[2] h-[420px]   translate-y-[-50%]">
				<h2 className="text-white text-[41px] font-[600] h-[180px] text-center w-[80%] ">
					We can help you reduce energy costs by finding the right
					green technology for you
				</h2>
				<div className="h-[40px] rounded-md w-1/2 border bg-white flex-center ">
					<div className="flex w-[30%] relative flex-col  border-r-[1px] border-r-[#CFD9E0]  ">
						<p className="px-3">{select}</p>
						{display ? (
							<svg
								onClick={() => setDisplay(false)}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6 absolute right-[5%] cursor-pointer"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 15.75l7.5-7.5 7.5 7.5"
								/>
							</svg>
						) : (
							<svg
								onClick={() => setDisplay(true)}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6 absolute  right-[5%] cursor-pointer"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						)}

						{display && (
							<div className=" w-full absolute top-[40px] border bg-white ">
								<ul className="py-[20px] pl-4">
									<li className=" cursor-pointer mb-3 hover:underline text-[#323232] text-[17px]">
										Solar Panels
									</li>
									<li className="cursor-pointer hover:underline text-[#323232] text-[17px]">
										Electric Vehicle
									</li>
								</ul>
							</div>
						)}
					</div>
					<div className="flex-center w-[70%]  h-full">
						<input type='text' className="w-[90%] h-full mx-6 outline-none" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="w-6 h-6 mr-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
				</div>
				<div className="flex-center justify-center mt-[60px] ">
					<div className="flex-center flex-col w-[220px] mr-7">
						<Image src='/assets/images/slide4.png' alt='' width={220} height={124} className="rounded-[16px] border-[1px] border-[#fff] " />
						<span className="text-white text-[14px] font-[400] mt-3">Electric Vehicle</span>
					</div>
					<div className="flex-center flex-col w-[220px] mr-7">
						<Image src='/assets/images/slide3.png' alt='' width={220} height={124} className="rounded-[16px] border-[1px] border-[#fff] " />
						<span className="text-white text-[14px] font-[400] mt-3">Factory</span>
					</div>
					<div className="flex-center flex-col w-[220px] mr-7">
						<Image src='/assets/images/slide2.png' alt='' width={220} height={124} className="rounded-[16px] border-[1px] border-[#fff] " />
						<span className="text-white text-[14px] font-[400] mt-3">Wind Energy</span>
					</div>
					<div className="flex-center flex-col w-[220px]">
						<Image src='/assets/images/slide1.png' alt='' width={220} height={124} className="rounded-[16px] border-[1px] border-[#fff] " />
						<span className="text-white text-[14px] font-[400] mt-3">Solar Energy</span>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default Carousel;
