import Link from "next/link";

const MemberCard = () => {
	const memberList = [
		{
			id: 1,
			name: "Kyan",
			position: "Project Manager",
			discordlink: "",
			linkedinLink: "",
			image: "/assets/images/KyAnh.svg",
		},
		{
			id: 2,
			name: "Maintain",
			position: "CTO",
			discordlink: "",
			linkedinLink: "",
			image: "/assets/images/Duong.svg",
		},
		{
			id: 3,
			name: "Binhndx",
			position: "FE Developer",
			discordlink: "",
			linkedinLink: "",
			image: "/assets/images/Binh.png",
		},
		{
			id: 4,
			name: "NTLuong",
			position: "FE Developer",
			discordlink: "",
			linkedinLink: "",
			image: "/assets/images/Luong.svg",
		},
		{
			id: 5,
			name: "Gordon",
			position: "Designer",
			discordlink: "",
			linkedinLink: "",
			image: "/assets/images/Thanh.png",
		},
	];
	return (
		<>
			{memberList.map((i) => (
				<div className="relative h-[380px] lg:h-[294px] lg:w-[230px] lg: mb-7  ">
					<div className="absolute  h-[380px] lg:h-[294px] z-[-1] w-full rounded-[16px] bg-[#09A507] "></div>

					<div className="relative bg-white h-[380px] lg:h-[294px] member flex-center justify-center flex-col rounded-[16px] border-[1px] px-[90px] lg:px-[16px] lg:py-[20px] py-[32px] border-[#09A507] ">
						<img
							src={i.image}
							alt=""
							className="rounded-[50%] w-[150px] h-[150px]"
						/>
						<div className="w-[129px] h-[66px] lg:h-[50px] text-center mt-[25px] lg:mt-[15px]">
							<h4 className="text-[30px] lg:text-[20px] font-[600]">
								{i.name}
							</h4>
							<p className="text-[16px] font-[400] whitespace-nowrap">
								{i.position}
							</p>
						</div>
						<div className="flex-center justify-center mt-[20px]">
							<Link href="/" className="mr-3">
								<img
									className="cursor-pointer w-[32px] h-[32px]"
									src="/assets/images/discord(1).png"
									alt=""
								/>
							</Link>
							<Link href="/">
								<img
									className="cursor-pointer w-[32px] h-[32px]"
									src="/assets/images/Linkedin(1).png"
									alt=""
								/>
							</Link>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default MemberCard;
