import CounterUp from "./CounterUp";
const Static = () => {
	return (
		<div className="w-full   ">
			<h3 className="text-center py-[50px] text-[30px] px-[50px]">
				Providing high-trust carbon credits for the voluntary Carbon
				market
			</h3>
			<div className="  bg-custom p-[30px]">
				<p className="text-center text-[#323232] lg:px-[200px]">
					The voluntary Carbon market needs more innovative and
					trusted forms of carbon credit collection, with greater
					flexibility and technology integration.
				</p>
				<div className="border-[1px] border-[#06151F] my-5"></div>
				<div className="grid  grid-cols-1 grid-rows-3 px-[30px] md:grid md:grid-cols-3 md:grid-rows-1  md:gap-x-4 ">
					<div className="col-span-1 mb-[30px] rounded-md text-white text-center p-8 row-span-1  bg-static">
						<CounterUp targetCount={100} />
						<p className="uppercase">
							companies have set climate targets to reach net-zero
							emissions
						</p>
					</div>
					<div className="col-span-1 mb-[30px] rounded-md text-white text-center p-8 row-span-1 bg-static">
						<CounterUp targetCount={200} />
						<p className="uppercase">
							companies have set climate targets to reach net-zero
							emissions
						</p>
					</div>
					<div className="col-span-1 mb-[30px] rounded-md text-white text-center p-8 bg-static row-span-1">
						<CounterUp targetCount={400} />
						<p className="uppercase">
							companies have set climate targets to reach net-zero
							emissions
						</p>
					</div>
				</div>
				<div className="border-[1px] border-[#06151F] my-5"></div>
				<p className="text-center font-[400] lg:px-[200px]">
					G2E utilizes
					<span className="text-[#09A507] mx-1">
						innovative{" "}
					</span> and{" "}
					<span className="text-[#09A507]">
						high-trust solutions on the blockchain platform
					</span>{" "}
					to support and authenticate green behaviors, thereby
					generating valuable carbon credits.
				</p>
			</div>
		</div>
	);
};

export default Static;
