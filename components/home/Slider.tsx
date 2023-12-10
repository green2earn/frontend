const Slider = () => {
	const row1 = [
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
		"https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
	];
	return (
		<section className="w-full lg:mt-[80px] ">
			<p className="text-center lg:my-[30px] lg:text-[24px] text-[#323232]">
				Backed by the World’s Leading Investors
			</p>
			<div className=" marquee flex-center  ">
				<div className="marqueeGroup overflow-x-scroll lg:animate-slide ">
					{row1.map((i, index) => (
						<div key={index} className="imageGroup ">
							<img className="image1" src={i} alt="" />
						</div>
					))}
				</div>
				<div className="marqueeGroup overflow-x-scroll lg:animate-slide ">
					{row1.map((i, index) => (
						<div key={index} className="imageGroup ">
							<img className="image1" src={i} alt="" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Slider;
