import Link from "next/link";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import UserDropdown from "./UserDropdown";
import { useAppDispatch } from "@/stores/store";
import { useEffect } from "react";

interface IProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
}
const list = [
	{ id: 0, link: "/", title: "Home" },
	{ id: 1, link: "/green-shop", title: "GreenShop" },
	{ id: 2, link: "/green-launcher", title: "GreenLauncher" },
	{ id: 3, link: "/green-map", title: "GreenMaps" },
	{ id: 4, link: "/green-project", title: "Projects" },
	{ id: 5, link: "/about", title: "AboutUs" },
	{ id: 6, link: "/contact", title: "Contact" },
];
const Header = (props: IProps) => {
	const { pathname } = useRouter();
	const isHomeLayout =
		pathname === "/" ||
		pathname === "/about" ||
		pathname === "/green-shop" ||
		pathname === "/users/profile";

	return (
		<div
			className={`w-screen z-[210]  ${
				isHomeLayout ? "absolute" : "fixed"
			} ${!isHomeLayout && "bg-white "} ${
				isHomeLayout && "top-0 left-0"
			} ${
				!isHomeLayout && "shadow-lg"
			} flex-center justify-between px-4 py-3 lg:flex-center`}
		>
			<div className="lg:hidden ">
				<svg
					onClick={() => props.setOpen(true)}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={` ${
						isHomeLayout && "text-white"
					} w-8 h-8 cursor-pointer `}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</div>
			<Link className="flex-center lg:w-[20%]" href="/">
				<motion.div
					initial={{ x: -100 }}
					animate={{ x: 0 }}
					transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
				>
					<img
						src="/assets/images/LogoG2E.png"
						alt="Logo"
						className="rounded-[50%] w-[40px] h-[40px]"
					/>
				</motion.div>
				<motion.h2
					initial={{ y: -100 }}
					animate={{ y: 0 }}
					transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
					className={` ${
						isHomeLayout ? "text-white" : "text-[#195B1B]"
					} font-bold `}
				>
					GreenTeam
				</motion.h2>
			</Link>

			<nav className=" hidden lg:inline-flex lg:w-[55%]">
				<ul className="flex-center w-full justify-around ">
					{list.map((l) => (
						<li
							key={l.id}
							className={` ${
								isHomeLayout ? "text-white" : "text-[#323232]"
							} relative  ${
								isHomeLayout
									? "hover:text-black"
									: "hover:text-green-600"
							} `}
						>
							<Link href={l.link}>{l.title}</Link>
							{pathname === l.link && (
								<motion.span
									layoutId="rect"
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "100%" }}
									transition={{
										duration: 0.4,
										type: "spring",
									}}
									className="absolute w-full h-[4px] bg-green-500 bottom-[-20px] left-0"
								></motion.span>
							)}
						</li>
					))}
				</ul>
			</nav>
			<UserDropdown />
		</div>
	);
};
export default Header;
