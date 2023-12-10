import Link from "next/link";
import {
	ShoppingBagIcon,
	Bars3Icon,
	ShoppingCartIcon,
	UserIcon,
	HomeIcon,
	BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { selectAction, toggleCreateProductPage } from "@/stores/toggleSlice";

interface IProps {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = (props: IProps) => {
	const { isSelected, toggleAddProduct } = useAppSelector(
		(state) => state.toggle
	);
	const dispatch = useAppDispatch();
	const handleClickList = (i: number) => {
		dispatch(selectAction(i));
		props.setIsOpen(true);
	};

	const listLi = [
		{
			id: 1,
			text: "Dashboard",
			icon: <HomeIcon className="w-5 h-5 mr-1 cursor-pointer " />,
		},
		{
			id: 2,
			text: "Product",
			icon: <ShoppingBagIcon className="w-5 h-5 mr-1 cursor-pointer" />,
		},
		{
			id: 3,
			text: "Projects",
			icon: (
				<BuildingOfficeIcon className="w-5 h-5 mr-1 cursor-pointer" />
			),
		},
		{
			id: 4,
			text: "Categories",
			icon: <Bars3Icon className="w-5 h-5 mr-1 cursor-pointer" />,
		},
		{
			id: 5,
			text: "Orders",
			icon: <ShoppingCartIcon className="w-5 h-5 mr-1 cursor-pointer" />,
		},
		{
			id: 6,
			text: "Users",
			icon: <UserIcon className="w-5 h-5 mr-1 cursor-pointer" />,
		},
	];

	return (
		<div
			className={` ${
				props.isOpen ? "w-[200px]" : "w-[70px]"
			} h-screen shadow-md bg-white`}
		>
			<div className="flex items-center p-4 justify-between">
				<Link className="flex items-center " href="/">
					<div className="h-[40px] w-[40px] rounded-[50%] bg-green-600"></div>
					{props.isOpen && (
						<span className="text-[20px] font-bold text-green-600 ml-1">
							Admin
						</span>
					)}
				</Link>
				{props.isOpen && (
					<svg
						onClick={() => props.setIsOpen(false)}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
						/>
					</svg>
				)}
			</div>
			<nav>
				<ul>
					{listLi.map((i) => (
						<>
							<li
								onClick={() => handleClickList(i.id)}
								key={i.id}
								className={`flex px-4 py-3 items-center ${
									isSelected === i.id && "bg-[#e0e0e0]"
								} cursor-pointer`}
							>
								{i.icon}
								{props.isOpen && (
									<span
										className={`font-medium ${
											isSelected === i.id &&
											"text-green-500"
										}`}
									>
										{i.text}
									</span>
								)}
							</li>
						</>
					))}
				</ul>
			</nav>
		</div>
	);
};
export default Sidebar;
