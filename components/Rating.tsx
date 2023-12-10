import React from "react";

export default function Rating() {
	return (
		<div className="flex flex-row justify-between">
			<div className="flex flex-col">
				<div className="flex flex-row my-[6px] items-center">
					<div className="text-[#525252] text-[12px] font-normal mr-[8px]">
						5
					</div>
					<div className="w-[180px] h-[8px] bg-[#EEEEEE] rounded-full relative">
						<div className="w-[16px] h-[8px] bg-[#FFB300] rounded-full"></div>
					</div>
				</div>
				<div className="flex flex-row my-[6px] items-center">
					<div className="text-[#525252] text-[12px] font-normal mr-[8px]">
						4
					</div>
					<div className="w-[180px] h-[8px] bg-[#EEEEEE] rounded-full relative">
						<div className="w-[33px] h-[8px] bg-[#FFB300] rounded-full"></div>
					</div>
				</div>
				<div className="flex flex-row my-[6px] items-center">
					<div className="text-[#525252] text-[12px] font-normal mr-[8px]">
						3
					</div>
					<div className="w-[180px] h-[8px] bg-[#EEEEEE] rounded-full relative">
						<div className="w-[167px] h-[8px] bg-[#FFB300] rounded-full"></div>
					</div>
				</div>
				<div className="flex flex-row my-[6px] items-center">
					<div className="text-[#525252] text-[12px] font-normal mr-[8px]">
						2
					</div>
					<div className="w-[180px] h-[8px] bg-[#EEEEEE] rounded-full relative">
						<div className="w-[72px] h-[8px] bg-[#FFB300] rounded-full"></div>
					</div>
				</div>
				<div className="flex flex-row my-[6px] items-center">
					<div className="text-[#525252] text-[12px] font-normal mr-[8px]">
						1
					</div>
					<div className="w-[180px] h-[8px] bg-[#EEEEEE] rounded-full relative">
						<div className="w-[47px] h-[8px] bg-[#FFB300] rounded-full"></div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<div className="text-[48px] font-bold">3.2</div>
				<div className="flex flex-row">
					<img
						src="/assets/images/StarFill.svg"
						alt=""
						className="w-[22px] h-[22px]"
					/>
					<img
						src="/assets/images/StarFill.svg"
						alt=""
						className="w-[22px] h-[22px]"
					/>
					<img
						src="/assets/images/StarFill.svg"
						alt=""
						className="w-[22px] h-[22px]"
					/>
					<img
						src="/assets/images/StarNone.svg"
						alt=""
						className="w-[22px] h-[22px]"
					/>
					<img
						src="/assets/images/StarNone.svg"
						alt=""
						className="w-[22px] h-[22px]"
					/>
				</div>
				<div className="text-[12px] text-[#09A507] font-normal">
					10 reviews
				</div>
			</div>
		</div>
	);
}
