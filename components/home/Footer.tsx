import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className="lg:h-[502px] relative h-[782px]  lg:pt-[120px] bg-[url('/assets/images/footermobile.png')] lg:bg-[url('/assets/images/footer.png')] bg-cover bg-center bg-no-repeat ">
			<div className="hidden lg:inline-flex  absolute right-0 ">
				<img src="/assets/images/bottom layer1.png " />
				<div className="w-[142px] h-[140px] absolute bottom-0 ">
					<div className="h-full w-full relative">
						<img
							src="/assets/images/bottom stick.png"
							alt=""
							className=" "
						/>
						<img
							src="/assets/images/bottom wing.png"
							alt=""
							className=" absolute animate-spin left-[-60px] top-[-65px]"
						/>
					</div>
				</div>
				<div className="w-[142px] h-[140px] absolute bottom-[18px] left-[43%] ">
					<div className="h-full w-full relative">
						<img
							src="/assets/images/bottom stick.png"
							alt=""
							className=" "
						/>
						<img
							src="/assets/images/bottom wing.png"
							alt=""
							className=" absolute animate-spin left-[-60px] top-[-65px]"
						/>
					</div>
				</div>
				<div className="w-[142px] h-[140px] absolute bottom-0 right-[-100px] ">
					<div className="h-full w-full relative">
						<img
							src="/assets/images/bottom stick.png"
							alt=""
							className=" "
						/>
						<img
							src="/assets/images/bottom wing.png"
							alt=""
							className=" absolute animate-spin left-[-60px] top-[-65px]"
						/>
					</div>
				</div>
			</div>
			<div className=" lg:hidden absolute right-0 top-[20%] left-[50%] translate-x-[-50%] ">
				<img src="/assets/images/platform.png " />
				<div className="w-[142px] h-[130px] absolute bottom-0 ">
					<div className="h-full w-full relative">
						<img
							src="/assets/images/bottom stick.png"
							alt=""
							className=" "
						/>
						<img
							src="/assets/images/bottom wing.png"
							alt=""
							className=" absolute animate-spin left-[-60px] top-[-65px]"
						/>
					</div>
				</div>

				<div className="w-[142px] h-[130px] absolute bottom-0 right-[-100px] sm:right-[0] ">
					<div className="h-full w-full relative">
						<img
							src="/assets/images/bottom stick.png"
							alt=""
							className=" "
						/>
						<img
							src="/assets/images/bottom wing.png"
							alt=""
							className=" absolute animate-spin left-[-60px] top-[-65px]"
						/>
					</div>
				</div>
			</div>
			<div className="lg:flex flex-col lg:flex-row flex-center">
				<div className="lg:w-[360px] mt-[200px] w-[343px] lg:mt-0 lg:h-[325.3px] lg:ml-[32px]">
					<div className="h-[86.5px] w-full p-[7.2px] flex-center justify-center lg:justify-start">
						<Image
							className="hidden lg:inline-block"
							src="/assets/images/Logo G2E.png"
							height={78.15}
							width={57}
							alt=""
						/>
						<Image
							className="lg:hidden"
							src="/assets/images/Logo G2E.png"
							height={86.35}
							width={86.35}
							alt=""
						/>
						<span className="text-white leading-[25.76px] lg:text-[20px] text-[30px] font-[700]">
							Green to Earn
						</span>
					</div>
					<div className="my-[16px] h-[95px] w-full mt-[12px] ">
						<p className="text-[14px] h-[31px] font-[400] leading-[31px] text-center text-white">
							Stay up to date with the Green to Earn newsletter
						</p>
						<div className="lg:h-[48px] w-full lg:flex-row flex-center flex-col justify-center ">
							<input
								className="h-[48px] w-full  rounded-[16px] lg:w-[240px] border-[1px] pl-[17px] placeholder-[#525252] placeholder:text-[14px] placeholder:font-[400]"
								placeholder="Enter your email address"
							/>
							<button
								type="button"
								className="w-[101.59px] h-[48px] ml-[9px] mt-[12px] lg:mt-0 font-[700] text-[#323232] cursor-pointer bg-white rounded-[50px]  text-center border"
							>
								Sign up
							</button>
						</div>
						<div className="flex-center justify-center">
							<div className="lg:h-[32px] lg:w-[224px] w-[192px]  h-[24px] lg:my-[32px] my-[12px]  flex-center justify-between">
								<Image
									className="hidden lg:inline-flex cursor-pointer"
									src="/assets/images/Twitter.png"
									alt=""
									width={32}
									height={26}
								/>
								<Image
									className=" hidden lg:inline-flex cursor-pointer"
									src="/assets/images/Telegram.png"
									alt=""
									width={32}
									height={26}
								/>
								<Image
									className="hidden lg:inline-flex cursor-pointer"
									src="/assets/images/Linkdin.png"
									alt=""
									width={32}
									height={26}
								/>
								<Image
									className="hidden lg:inline-flex cursor-pointer"
									src="/assets/images/Discord.png"
									alt=""
									width={32}
									height={26}
								/>
								<Image
									className="lg:hidden cursor-pointer"
									src="/assets/images/Twitter.png"
									alt=""
									width={24}
									height={24}
								/>
								<Image
									className=" lg:hidden cursor-pointer"
									src="/assets/images/Telegram.png"
									alt=""
									width={24}
									height={24}
								/>
								<Image
									className=" lg:hidden cursor-pointer"
									src="/assets/images/Linkdin.png"
									alt=""
									width={24}
									height={24}
								/>
								<Image
									className="lg:hidden cursor-pointer"
									src="/assets/images/Discord.png"
									alt=""
									width={24}
									height={24}
								/>
							</div>
						</div>
						<small className="text-[12px] font-[400] h-[16px] text-[#DDE7FA] leading-[16px]">
							Green to Earn © 2023. All rights reserved Green to
							Earn Inc.
						</small>
					</div>
				</div>
				<div className="lg:w-[531px] lg:h-[168px] w-[343px] mt-[150px] lg:mt-[0] flex-center justify-between lg:ml-[25%]  z-[50] ">
					<ul>
						<li className="text-[12px] py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">Home</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">FOR CORPORATIONS</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">FOR PROJECT DEVELOPERS</Link>
						</li>
						<li className="text-[12px] py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">BLOCKCHAIN SOLUTIONS</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">About</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">Contacts</Link>
						</li>
					</ul>
					<ul>
						<li className="text-[12px] py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="/">Knowcarbon</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="/">FAQs</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">Jobs</Link>
						</li>
						<li className="text-[12px] py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">News</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">Documentation</Link>
						</li>
						<li className="text-[12px]  py-[6px] font-[400] leading-[15.6px] uppercase text-white">
							<Link href="">Privacy Policy</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
