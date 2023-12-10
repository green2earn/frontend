import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Slider from "./Slider";
import { useInView } from "react-intersection-observer";
import Static from "./Static";
import TimeLine from "./TimeLine";
import Tokenize from "./Tokenize";
import Job from "./Job";
import Footer from "./Footer";
import CardT from "./CardT";

const Home = () => {
	const text = useRef<HTMLHeadingElement>(null);
	const text1 = useRef<HTMLHeadingElement>(null);
	const sun = useRef<HTMLImageElement>(null);
	const sun1 = useRef<HTMLImageElement>(null);
	const shadow = useRef<HTMLImageElement>(null);
	const shadow1 = useRef<HTMLImageElement>(null);
	const turbine1 = useRef<HTMLHeadingElement>(null);
	const turbine2 = useRef<HTMLImageElement>(null);
	const turbine3 = useRef<HTMLImageElement>(null);
	const turbine4 = useRef<HTMLImageElement>(null);
	const cloudRight = useRef<HTMLImageElement>(null);
	const cloudRight1 = useRef<HTMLImageElement>(null);
	const cloudLeft = useRef<HTMLImageElement>(null);
	const cloudLeft1 = useRef<HTMLImageElement>(null);
	const [remove, setRemove] = useState(false);
	const { ref, inView } = useInView({ threshold: 0.2 });
	const animation = useAnimation();
	const [display, setDisplay] = useState<boolean>(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			let value = window.scrollY;
			setRemove(true);
			if (text.current) {
				text.current.style.marginTop = `${value * 7}px`;
			}
			if (turbine1.current) {
				turbine1.current.style.opacity = `${value * 0.012}`;
			}
			if (turbine2.current) {
				turbine2.current.style.opacity = `${value * 0.009}`;
			}
			if (turbine3.current) {
				turbine3.current.style.opacity = `${value * 0.009}`;
			}
			if (sun.current) {
				sun.current.style.top = `${value * -2.5}px`;
			}

			if (cloudLeft.current) {
				cloudLeft.current.style.left = `${value * -8}px`;
			}
			if (cloudRight.current) {
				cloudRight.current.style.left = `${value * 8}px`;
			}
			if (shadow.current) {
				shadow.current.style.top = `${value * 3.5}px`;
			}
		});
	}, []);

	useEffect(() => {
		if (cloudRight.current && cloudLeft.current) {
			// Set initial cloud properties
			cloudRight.current.style.transform = "translateX(100%)";
			cloudRight.current.style.opacity = "1";
			cloudLeft.current.style.transform = "translateX(-100%)";
			cloudLeft.current.style.opacity = "1";
			// Trigger animation after a short delay for a smoother transition
			setTimeout(() => {
				if (cloudRight.current && cloudLeft.current) {
					cloudRight.current.style.animation =
						"fly-left 40s linear infinite";
					cloudRight.current.style.opacity = "0";
					cloudLeft.current.style.animation =
						"fly-right 40s linear infinite";
					cloudLeft.current.style.opacity = "0";
					setDisplay(true);
					setRemove(false);
				}
			}, 1500);
		}
		return () => {
			if (cloudRight.current && cloudLeft.current) {
				cloudRight.current.style.animation = "";
				cloudRight.current.style.opacity = "1";
				cloudLeft.current.style.animation = "";
				cloudLeft.current.style.opacity = "1";
				setDisplay(false);
				setRemove(false);
			}
		};
	}, []);

	useEffect(() => {
		if (cloudRight1.current && cloudLeft1.current) {
			// Set initial cloud properties
			cloudRight1.current.style.transform = "translateX(100%)";
			cloudRight1.current.style.opacity = "1";
			cloudLeft1.current.style.transform = "translateX(-100%)";
			cloudLeft1.current.style.opacity = "1";
			// Trigger animation after a short delay for a smoother transition
			setTimeout(() => {
				if (cloudRight1.current && cloudLeft1.current) {
					cloudRight1.current.style.animation =
						"fly-left 20s linear infinite";
					cloudRight1.current.style.opacity = "0";
					cloudLeft1.current.style.animation =
						"fly-right 20s linear infinite";
					cloudLeft1.current.style.opacity = "0";
					setDisplay(true);
				}
			}, 1500);
		}
		return () => {
			if (cloudRight.current && cloudLeft.current) {
				cloudRight.current.style.animation = "";
				cloudRight.current.style.opacity = "1";
				cloudLeft.current.style.animation = "";
				cloudLeft.current.style.opacity = "1";
				setDisplay(false);
			}
		};
	}, []);
	useEffect(() => {
		if (sun.current) {
			// Set initial cloud properties
			sun.current.style.zIndex = "0";

			// Trigger animation after a short delay for a smoother transition
			setTimeout(() => {
				if (sun.current) {
					sun.current.style.animation = "rise 41s ease infinite";
					sun.current.style.zIndex = "10";
					sun.current.style.right = "200";
				}
			}, 1500);
		}
		return () => {
			if (sun.current) {
				sun.current.style.animation = "";
				sun.current.style.zIndex = "0";
				setRemove(false);
			}
		};
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			let value = window.scrollY;

			if (text1.current) {
				text1.current.style.marginTop = `${value * 7}px`;
			}

			// if (sun1.current) {
			// 	sun1.current.style.top = `${value * -2.5}px`;
			// }
			if (turbine4.current) {
				turbine4.current.style.opacity = `${value * 0.009}`;
			}

			if (cloudLeft1.current) {
				cloudLeft1.current.style.left = `${value * -8}px`;
			}
			if (cloudRight1.current) {
				cloudRight1.current.style.left = `${value * 8}px`;
			}
			if (shadow1.current) {
				shadow1.current.style.top = `${value * 3.5}px`;
			}
		});
	}, []);

	useEffect(() => {
		// window.addEventListener("scroll", () => {
		// 	if (window.scrollY >= 20) {
		// 		setDisplay(true);
		// 	} else {
		// 		setDisplay(false);
		// 	}
		// });
	});
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
				y: -100,
				opacity: 0,
			});
		}
	}, [inView]);
	return (
		<motion.div
			initial="hidden"
			animate="show"
			className="min-h-screen bg-[#f9f9f9] overflow-hidden w-screen  "
		>

			<div
				ref={turbine1}
				className="absolute z-10 hidden lg:inline-block opacity-[0.1] top-[200px] w-[300px] h-[300px] left-[10%]  "
			>
				<div className="relative h-full w-full">
					<img
						src="/assets/images/Cover_turbine.png"
						className="image"
						alt=""
					/>
					<img
						src="/assets/images/Cover_swing.png"
						alt="canh quat"
						className=" absolute animate-spin top-[-45px]"
					/>
				</div>
			</div>

			<div
				ref={turbine4}
				className="absolute z-10  lg:hidden opacity-[0.1] top-[250px] sm:top-[300px] w-[200px] h-[200px] left-[50%] translate-x-[-50%] "
			>
				<div className="relative h-full w-full">
					<img
						src="/assets/images/Cover_turbine.png"
						className="image"
						alt=""
					/>
					<img
						src="/assets/images/Cover_swing.png"
						alt="canh quat"
						className=" absolute animate-medium top-[-30px]"
					/>
				</div>
			</div>
			<div
				ref={turbine2}
				className="absolute z-10 opacity-[0.1] hidden lg:inline-block top-[300px] w-[300px] h-[300px] left-[65%]  "
			>
				<div className="relative h-full w-full">
					<img
						src="/assets/images/Cover_turbine.png"
						className="image"
						alt=""
					/>
					<img
						src="/assets/images/Cover_swing.png"
						alt="canh quat"
						className=" absolute animate-medium top-[-45px]"
					/>
				</div>
			</div>
			<div
				ref={turbine3}
				className="absolute z-10 hidden lg:inline-block opacity-[0.1] top-[220px] w-[300px] h-[300px] right-[-65px]  "
			>
				<div className="relative h-full w-full">
					<img
						src="/assets/images/Cover_turbine.png"
						className="image"
						alt=""
					/>
					<img
						src="/assets/images/Cover_swing.png"
						alt="canh quat"
						className=" absolute animate-slow top-[-45px]"
					/>
				</div>
			</div>
			<div className="absolute z-10 hidden lg:inline-block ">
				<div className="bird-container">
					<div className="bird"></div>
				</div>

				<div className="bird-container2">
					<div className="bird2"></div>
				</div>
			</div>
			{display && (
				<div className="absolute z-20 hidden lg:inline-block top-[-150px] h-full w-full ">
					<div className="cloud1"></div>
					<div className="cloud2"></div>
					<div className="cloud3"></div>
				</div>
			)}
			<div className="h-[612px]  sm:h-[700px] overflow-y-hidden lg:h-[800px] xl:h-[800px] w-full  overflow-x-hidden relative ">
				<img
					className="image lg:inline-flex hidden"
					src="/assets/images/sky2.png"
					alt=""
				/>
				<img
					className="image lg:hidden"
					src="/assets/images/background mobile.png"
					alt=""
				/>
				<div className="mask"></div>
				<div className="sun ">
					<div className="sunrays r1">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunrays r2">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunrays r3">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunrays r4">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunrays r5">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunray">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
					<div className="sunray">
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
						<div className="light"></div>
					</div>
				</div>
				{/* <img
					ref={sun}
					className="image lg:inline-flex hidden"
					src="/assets/images/sun 6.png"
					alt=""
				/> */}

				{/* <img
					ref={sun1}
					className="image lg:hidden"
					src="/assets/images/Sun mobile.png"
					alt=""
				/> */}
				<img
					className="image lg:inline-flex hidden"
					src="/assets/images/land 5.png"
					alt=""
				/>
				<img
					className="image lg:hidden"
					src="/assets/images/Land 3 mobile.png"
					alt=""
				/>
				<img
					className="image lg:inline-flex hidden"
					src="/assets/images/land 4.png"
					alt=""
				/>
				<img
					className="image lg:hidden"
					src="/assets/images/Land mobile.png"
					alt=""
				/>

				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
					ref={text1}
					className=" absolute tracking-[2px] text-[1.7em] text-white z-20 flex-center top-[0px] flex-col h-full  w-full"
				>
					{" "}
					{!remove && (
						<div className="light absolute top-0 left-0"></div>
					)}
					<span className="lg:hidden">We support,</span>{" "}
					<span className="lg:hidden">
						{" "}
						authenticate, and reward{" "}
					</span>
					<span className="lg:hidden">your green behaviors</span>
					<div className="lg:hidden flex-center lg:mt-[30px] mt-[100px] flex-col justify-center">
						<div className=" lg:hidden  w-[40px] h-[60px] rounded-[20px] border-[4px] flex justify-center pt-3 border-white ">
							<span className=" w-[2px] h-[14px] bg-white"></span>
						</div>
						<p className=" lg:hidden  text-[12px] font-[400] tracking-tight py-[8px]">
							Scroll down
						</p>
						<div className="lg:hidden  mt-[10px]">
							<span className="span"></span>
							<span className="span span2"></span>
							<span className="span span3"></span>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.9, type: "spring", stiffness: 120 }}
					ref={text}
					className=" absolute tracking-[3px]  text-[3em] text-white z-20 flex-center  flex-col h-full justify-center w-full"
				>
					{" "}
					{!remove && (
						<div className="light absolute top-0 left-0"></div>
					)}
					<span className="hidden lg:inline-flex">
						We support, authenticate, and reward{" "}
					</span>{" "}
					<span className="hidden lg:inline-flex">
						{" "}
						your green behaviors
					</span>
					<div className="hidden  lg:inline-flex flex-center mt-[12%] flex-col justify-center">
						<div className=" hidden lg:inline-flex w-[40px] h-[60px] rounded-[20px] border-[4px]  justify-center pt-3 border-white ">
							<span className="w-[2px] h-[14px] bg-white"></span>
						</div>
						<p className=" hidden lg:inline-flex text-[12px] font-[400] tracking-tight py-[8px]">
							Scroll down
						</p>
						<div className="hidden lg:block mt-[10px]">
							<span className="span"></span>
							<span className="span span2"></span>
							<span className="span span3"></span>
						</div>
					</div>
				</motion.div>
				<img
					ref={shadow}
					className="image lg:inline-flex hidden"
					src="/assets/images/shadow.png"
					alt=""
				/>
				<img
					ref={shadow1}
					className="image lg:hidden"
					src="/assets/images/Shadow mobile.png"
					alt=""
				/>
				<img
					ref={cloudRight}
					className="image  lg:inline-flex hidden"
					src="/assets/images/Cloud right 2.png"
					alt=""
				/>
				<img
					ref={cloudRight1}
					className="image lg:hidden"
					src="/assets/images/Cloud left mobile.png"
					alt=""
				/>

				<img
					ref={cloudLeft}
					className="image lg:inline-block hidden"
					src="/assets/images/Cloud left 1.png"
					alt=""
				/>
				<img
					ref={cloudLeft1}
					className="image lg:hidden"
					src="/assets/images/Cloud right mobile.png"
					alt=""
				/>
			</div>
			<section className="w-full relative z-[50]  pt-[50px] ">
				<div className="w-full  lg:flex lg:items-center lg:justify-center">
					<div className=" px-[20px] text-center lg:w-[60%] ">
						<h2 className="text-[32px] whitespace-nowrap mb-[30px] lg:text-[60px] lg:leading-[73px] flex-center flex-col lg:flex-row justify-center">
							<span className="text-[#09A507] lg:mr-2">
								An ecosystem{" "}
							</span>
							<span className="lg:hidden">with three </span>
							<span className="hidden lg:inline-flex">with </span>
							<span className="text-[#09A507] hidden lg:inline-flex lg:mx-2">
								3
							</span>{" "}
							main functions
						</h2>
						<p className="lg:text-[16px] leading-[19.41px] text-[#323232]">
							G2E (Green to Earn) with 3 main functions: Green
							Market, Green Map, and Green Launcher, builds a
							perfect ecosystem where every green behavior is
							supported, recognized, and appropriately rewarded.{" "}
						</p>
					</div>
				</div>
				<motion.div
					ref={ref}
					className=" mt-[90px] grid grid-cols-1 mx-[10%] lg:mx-[18%] lg:mt-[150px] flex-col lg:grid lg:grid-cols-3 lg:gap-4 "
				>
					<CardT
						animation={animation}
						image="/assets/images/greenshop.png"
						h2="Green Shop"
						p="Connecting eco-friendly product and service providers,suppliers, buyers, and sellers... "
						link="/green-shop"
					/>
					<CardT
						animation={animation}
						image="/assets/images/greenmap.png"
						h2="Green Map"
						p="Showcasing an overview of green projects and green service points on a map."
						link="/green-map"
					/>
					<CardT
						animation={animation}
						image="/assets/images/greenlauncher.png"
						h2="Green Launcher"
						p="A place to connect, establish, and develop green projects in the future   "
						link="/green-launcher"
					/>
				</motion.div>
				<Slider />
				<Static />
				<TimeLine />

				<div className="flex-center justify-center mb-[50px]">
					<Tokenize />
				</div>
				<div className="flex-center justify-center mb-[50px]">
					<Job />
				</div>
				<Footer />
			</section>
		</motion.div>
	);
};

export default Home;
