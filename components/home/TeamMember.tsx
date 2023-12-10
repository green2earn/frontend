import Image from "next/image";

const TeamMember = () => {
	return (
		<div className=" w-full flex justify-center py-[50px]  ">
			<div className=" h-[200px] w-[200px] mr-[75px] ">
				<div className="config-border  rotate-[45deg]">
					<div className="ml-[20px] relative  h-[170px] w-[170px] mt-[20px]  rotate-[90deg] ">
						<Image
							src="/assets/images/luong.png"
							alt=""
							fill
							className="rotate-[180deg]"
						/>
					</div>
				</div>
				<div className=" text-center mt-[50px]  w-full ">
					<h1 className=" text-[24px]">NT Luong</h1>
					<p className="text-green-600 text-[20px]">
						Front-End Developer
					</p>
				</div>
			</div>
			<div className=" h-[200px] w-[200px] mr-[75px] ">
				<div className=" config-border rotate-[45deg] ">
					<div className="ml-[20px] h-[170px] w-[170px] mt-[20px]  rotate-[90deg] ">
						<Image
							src="/assets/images/binh.png"
							alt=""
							fill
							className="rotate-[180deg]"
						/>
					</div>
				</div>
				<div className=" text-center mt-[50px]  w-full ">
					<h1 className=" text-[24px]">Nguyễn Đoàn Xuân Bình</h1>
					<p className="text-green-600 text-[20px]">
						Front-End Developer
					</p>
					<div className="flex-center"></div>
				</div>
			</div>
			<div className=" h-[200px] w-[200px] mr-[75px] ">
				<div className="config-border rotate-[45deg] ">
					<div className="ml-[20px]  h-[170px] w-[170px] mt-[20px]  rotate-[90deg] ">
						<Image
							src="/assets/images/Akyanh.jpeg"
							alt=""
							fill
							className="rotate-[180deg]"
						/>
					</div>
				</div>
				<div className=" text-center mt-[50px]  w-full ">
					<h1 className=" text-[24px]">Bùi Đức Kỳ Anh</h1>
					<p className="text-green-600 text-[20px]">
						Project Manager
					</p>
					<div className="flex-center"></div>
				</div>
			</div>
			<div className=" h-[200px] w-[200px] mr-[75px] ">
				<div className="config-border rotate-[45deg] ">
					<div className="ml-[20px]  h-[170px] w-[170px] mt-[20px]  rotate-[90deg] ">
						<Image
							src="/assets/images/Aduong.png"
							alt=""
							fill
							className="rotate-[270deg]"
						/>
					</div>
				</div>
				<div className=" text-center mt-[50px]  w-full ">
					<h1 className=" text-[24px]">Hà Bảo Dưỡng</h1>
					<p className="text-green-600 text-[20px]">CTO</p>
					<div className="flex-center"></div>
				</div>
			</div>
			<div className=" h-[200px] w-[200px]  ">
				<div className="h-[200px] w-[200px] config-border rotate-[45deg] ">
					<div className="ml-[20px]  h-[170px] w-[170px] mt-[20px]  rotate-[90deg] ">
						<Image
							src="/assets/images/Thanh.png"
							alt=""
							fill
							className="rotate-[270deg]"
						/>
					</div>
				</div>
				<div className=" text-center mt-[50px]  w-full ">
					<h1 className=" text-[24px]">Nguyễn Văn Thành</h1>
					<p className="text-green-600 text-[20px]">Designer</p>
					<div className="flex-center"></div>
				</div>
			</div>
		</div>
	);
};

export default TeamMember;
