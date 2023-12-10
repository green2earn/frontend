import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Tokenize = () => {
	const { ref, inView } = useInView({ threshold: 0.2 });
	const animation = useAnimation();
	useEffect(() => {
		if (inView) {
			animation.start({
				y: 0,
				opacity: 1,
				transition: {
					type: "spring",
					duration: 1,
					bounce: 0.3,
				},
			});
		}
		if (!inView) {
			animation.start({
				y: 100,
				opacity: 0,
			});
		}
	}, [inView]);
	return (
		<motion.div
			ref={ref}
			className="w-[95%] rounded-2xl  lg:flex bg-[#06151f] bg--tokenize-custom text-white pl-6"
		>
			<motion.div animate={animation} className=" w-full lg:w-[60%] ">
				<div className="py-6 ">
					<div className=" md:w-[654px] ">
						<h3 className="lg:text-[60px] text-[30px]  ">
							Introducing Green2Earn’s tokenized carbon credits
						</h3>
						<p className="mt-3 lg:w-[496px] w-[310px] ">
							Green2Earn is leveraging blockchain technology to
							create a transparent, efficient, and liquid spot
							market for carbon credits.
						</p>
						<Link
							href="/"
							className=" flex-center justify-center md:justify-start my-[20px] "
						>
							<div className="flex-center w-fit md:hidden rounded-[30px]  text-[white] hover:text-white bg-green-600 border px-5 py-3">
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
					<div className="md:flex  ">
						<div className="md:w-1/2 mr-5">
							<h5 className="text-[18px] my-[30px] md:text-left">
								Backed by Carbon Credits
							</h5>
							<p className="">
								Each token is backed 1:1 by a carbon credit held
								by Green2Earn and can be redeemed for the carbon
								credit or retired to claim an offset. 1 token =
								1 tonne of carbon.
							</p>
						</div>
						<div className="md:w-1/2">
							<h5 className="text-[18px] my-[30px] md:text-left">
								Backed by Carbon Credits
							</h5>
							<p className="">
								Each token is backed 1:1 by a carbon credit held
								by Green2Earn and can be redeemed for the carbon
								credit or retired to claim an offset. 1 token =
								1 tonne of carbon.
							</p>
						</div>
					</div>
				</div>
			</motion.div>
			<div className="hidden lg:inline-flex flex-center  justify-center lg:w-[40%]">
				<div className="hidden relative lg:inline-flex  w-full h-full  flex-center justify-center "></div>
				<div className="hidden absolute lg:inline-flex  w-full h-full  flex-center justify-center ">
					<Image
						className="hidden lg:inline-block"
						src="/assets/images/logo3D.png"
						alt=""
						height={645}
						width={465}
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default Tokenize;
