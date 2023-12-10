import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
interface IProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
}
const SidebarMenu = (props: IProps) => {
	const item = {
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				ease: "easeInOut",
				duration: 0.3,
				delay: 1.2,
			},
		},
	};
	return (
		<AnimatePresence>
			<motion.div
				variants={item}
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: "100vh", opacity: 1 }}
				transition={{ duration: 0.5 }}
				exit="exit"
				className="fixed top-[0px] w-full z-[220] right-0 h-full bg-black px-4  py-5"
			>
				<div className="flex justify-end">
					<div className="flex-center justify-center h-[40px] w-[40px] border text-[28px] bg-white cursor-pointer shadow-orange-50 rounded-[50%]">
						<h3 onClick={() => props.setOpen(false)}>X</h3>
					</div>
				</div>
				<nav className="text-white">
					<ul className="w-full flex flex-col justify-center items-center">
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.8 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/">HOME</Link>
						</motion.li>
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.7 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/green-shop">GREEN SHOP</Link>
						</motion.li>
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.6 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/green-launcher">GREEN LAUNCHER</Link>
						</motion.li>
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.5 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/green-map">GREEN MAP</Link>
						</motion.li>
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.4 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/about">ABOUT US</Link>
						</motion.li>
						<motion.li
							className="mt-4 hover:text-green-500 transition duration-500"
							initial={{ y: 80, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3 }}
							exit={{
								opacity: 0,
								y: 90,
								transition: {
									ease: "easeInOut",
									delay: 1,
								},
							}}
						>
							<Link href="/contact">CONTACT</Link>
						</motion.li>
					</ul>
				</nav>
			</motion.div>
		</AnimatePresence>
	);
};
export default SidebarMenu;
