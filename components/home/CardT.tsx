import { AnimationControls, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface Iprops {
	image: string;
	h2: string;
	p: string;
	link: string;
	animation: AnimationControls;
}

const CardT = (props: Iprops) => {
	return (
		<motion.div
			animate={props.animation}
			className="lg:col-span-1 rounded-[10px] mb-[100px] lg:mb-7   bottom-3"
		>
			<div className="card1 ">
				<div className="lines"></div>
				<div className="imgBox">
					<img src={props.image} alt="" />
				</div>
				<div className="content ">
					<div className="details ">
						<h2>{props.h2}</h2>
						<p className="text-black">{props.p}</p>
						<div className="flex-center justify-center my-[20px] ">
							<Link
								href={props.link}
								className=" border px-[25px] rounded-[25px] bg-white transition duration-[.3s] hover:bg-black hover:text-white py-[14px]"
							>
								<button className="border-none">
									LEARN MORE
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CardT;
