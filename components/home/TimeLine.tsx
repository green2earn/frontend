import Link from "next/link";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const TimeLine = () => {
	return (
		<div className="w-full  pt-8">
			<h3 className="text-center lg:text-[60px] font-[600] text-[#09A507] lg:leading-[72.8px]">
			     Green to Earn <span className="text-black">Flow</span>
			</h3>
			<p className="lg:text-[16px] px-6 text-center text-[#06151F]">
				Green2Earn uses technology to increase accuracy and transparency
				at every stage of tracking green actions.
			</p>
			<div className="w-full flex-center  justify-center mt-4">
				<VerticalTimeline>
					<VerticalTimelineElement
						className="vertical-timeline-element--work  "
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>
						<div className="flex">
						<img
							src="assets/images/Co2.png"
							width={80}
							height={80}
						/>
                        <div className="flex flex-col ml-[50px]">
						<h3 className="text-[24px] text-[#09A507] ">
						Buy/Build/Register
						</h3>
							<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
							<li>Buy on Green Shop  </li>
							<li>Build project on Green Launcher</li>
							<li>Register A Green Point on Green Map</li>
								</ul>
						</div>
					   </div>
						
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>

<div className="flex">
						<img
							src="assets/images/Co2.png"
							width={80}
							height={80}
						/>
                        <div className="flex flex-col ml-[50px]">
						<h3 className="text-[24px] text-[#09A507] ">
						  Receive NFTs
						</h3>
							<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
							<li>Electric motorcycle </li>
							<li>Electric cars</li>
									<li>Solar Energy Project</li>
									<li>Wind Energy Project </li>
									<li>Green Factory Project </li>
								</ul>
						</div>
					   </div>
					
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>
						<div className="flex">
						<img
							src="assets/images/Co2.png"
							width={80}
							height={80}
						/>
                        <div className="flex flex-col ml-[50px]">
						<h3 className="text-[24px] text-[#09A507] ">
						  Green Actions
						</h3>
							<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
							<li>Electrical Power Production  </li>
							<li>Use green products</li>
							<li>Produce green products</li>
								</ul>
						</div>
					   </div>
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work "
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>
						<div className="flex">
					<img
						src="assets/images/Co2.png"
						width={80}
						height={80}
					/>
					<div className="flex flex-col ml-[50px]">
					<h3 className="text-[24px] text-[#09A507] ">
					Receive Tokens
					</h3>
						<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
						<li>Carbon Credit Tokens  </li>
						<li>Green Project Tokens</li>
							</ul>
					</div>
				   </div>
						
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>
							<div className="flex">
					<img
						src="assets/images/Co2.png"
						width={80}
						height={80}
					/>
					<div className="flex flex-col ml-[50px]">
					<h3 className="text-[24px] text-[#09A507] ">
					Fundraising
					</h3>
						<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
						<li>Sell Tokens  </li>
						<li>Sell NFTs</li>
							</ul>
					</div>
				   </div>
					</VerticalTimelineElement>
					<VerticalTimelineElement
						className="vertical-timeline-element--work"
						contentStyle={{
							background: "rgba(255, 255, 255, 1)",
							color: "rgba(50, 50, 50, 1)",
						}}
						contentArrowStyle={{
							borderRight: "7px solid  rgba(255, 255, 255, 1)",
						}}
						iconStyle={{
							background: "#09A507",
							color: "#fff",
						}}
					>
							<div className="flex">
					<img
						src="assets/images/Co2.png"
						width={80}
						height={80}
					/>
					<div className="flex flex-col ml-[50px]">
					<h3 className="text-[24px] text-[#09A507] ">
					   Buyer
					</h3>
						<ul className=" text-[16px] pl-4 list-disc text-[#525252]">
						<li>Voluntary market </li>
						<li>Compulsory market </li>
							</ul>
					</div>
				   </div>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</div>
			<Link
				href="/map"
				className=" flex-center justify-center mt-[10px] mb-[50px] text-[#09A507]"
			>
				<div className="flex-center rounded-[30px] mt-5 hover:bg-black hover:text-white bg-white border px-4 py-3">
					<span className="text-[16px]">CONTACT US</span>
					<img
						src="/assets/images/LogoG2E.png"
						alt=""
						width={30}
						height={30}
					/>
				</div>
			</Link>
		</div>
	);
};

export default TimeLine;
