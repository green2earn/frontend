import React, { useEffect, useState } from "react";

interface propButtonOptionalStatus {
	showDropdown: boolean;
	setShowDropdown: (value: boolean) => void;
	contentButton: "NoContent" | "Pending" | "Verify" | "Onchain";
	setContentButton: (
		value: "NoContent" | "Pending" | "Verify" | "Onchain"
	) => void;
}

export default function ButtonOptionalStatus({
	showDropdown,
	setShowDropdown,
	contentButton,
	setContentButton,
}: propButtonOptionalStatus) {
	// const [showDropdown, setShowDropdown] = useState<boolean>(false);F
	const [classButton, setClassButton] = useState(
		"bg-white h-[48px] px-[16px] w-min flex flex-col justify-center items-center rounded-[16px] hover:bg-gradient-to-r hover:from-[#4acc35] hover:to-[#009a22] relative"
	);
	useEffect(() => {
		if (showDropdown) {
			setClassButton(
				"h-[48px] w-min px-[16px] flex flex-col justify-center items-center rounded-[16px] bg-gradient-to-r from-[#4acc35] to-[#009a22] relative"
			);
		}
	}, [showDropdown]);
	return (
		<button
			className={classButton}
			onClick={() => {
				const toggleState = (preState: boolean) => !preState;
				setShowDropdown(toggleState(showDropdown));
			}}
		>
			{!showDropdown && contentButton === "NoContent" && (
				<img
					src="/assets/images/icon_option_status.svg"
					alt=""
					className="w-[24px] h-[24px]"
				/>
			)}

			{showDropdown && contentButton === "NoContent" && (
				<img
					src="/assets/images/icon_option_status_white.svg"
					alt=""
					className="w-[24px] h-[24px]"
				/>
			)}

			{contentButton === "Pending" && (
				<div className="flex flex-row items-center py-[12px] px-[16px]">
					<img src="/assets/images/icon_pending.svg" alt="" />
					<div className="mx-[8px] text-zinc-800 text-[16px] font-normal">
						Pending
					</div>
					<img src="/assets/images/icon_dropdown.svg" alt="" />
				</div>
			)}
			{contentButton === "Verify" && (
				<div className="flex flex-row items-center py-[12px] px-[16px]">
					<img src="/assets/images/icon_verify.svg" alt="" />
					<div className="mx-[8px] text-zinc-800 text-[16px] font-normal">
						Verify
					</div>
					<img src="/assets/images/icon_dropdown.svg" alt="" />
				</div>
			)}
			{contentButton === "Onchain" && (
				<div className="flex flex-row items-center py-[8px] px-[16px]">
					<img
						src="/assets/images/icon_onchain.svg"
						alt=""
						className="ml-[-4px]"
					/>
					<div className="mx-[4px] text-zinc-800 text-[16px] font-normal">
						Onchain
					</div>
					<img src="/assets/images/icon_dropdown.svg" alt="" />
				</div>
			)}

			{showDropdown && (
				<div className="h-min w-min bg-white absolute top-[105%] flex flex-col py-[10px] rounded-[16px] drop-shadow-xl">
					<button
						className="flex flex-row items-center py-[12px] px-[16px] hover:bg-slate-300"
						onClick={() => {
							setClassButton(
								"h-[48px] w-min px-[16px] flex flex-col justify-center items-center rounded-[16px] bg-white relative border-[1px] border-[#4acc35]"
							);
							setContentButton("Pending");
						}}
					>
						<img src="/assets/images/icon_pending.svg" alt="" />
						<div className="ml-[8px] text-zinc-800 text-[16px] font-normal">
							Pending
						</div>
					</button>
					<div className="mx-[16px] border-b-[1px] border-[#C2C2C2]"></div>
					<button
						className="flex flex-row items-center py-[12px] px-[16px] hover:bg-slate-300"
						onClick={() => {
							setClassButton(
								"h-[48px] w-min px-[16px] flex flex-col justify-center items-center rounded-[16px] bg-white relative border-[1px] border-[#4acc35]"
							);
							setContentButton("Verify");
						}}
					>
						<img src="/assets/images/icon_verify.svg" alt="" />
						<div className="ml-[8px] text-zinc-800 text-[16px] font-normal">
							Verify
						</div>
					</button>
					<div className="mx-[16px] border-b-[1px] border-[#C2C2C2]"></div>

					<button
						className="flex flex-row items-center py-[8px] px-[16px] hover:bg-slate-300"
						onClick={() => {
							setClassButton(
								"h-[48px] w-min px-[16px] flex flex-col justify-center items-center rounded-[16px] bg-white relative border-[1px] border-[#4acc35]"
							);
							setContentButton("Onchain");
						}}
					>
						<img
							src="/assets/images/icon_onchain.svg"
							alt=""
							className="ml-[-4px]"
						/>
						<div className="ml-[4px] text-zinc-800 text-[16px] font-normal">
							Onchain
						</div>
					</button>
				</div>
			)}
		</button>
	);
}
