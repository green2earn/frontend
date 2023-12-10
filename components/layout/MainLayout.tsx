import React, { useState } from "react";
import Header from "../Header";
import SidebarMenu from "../SidebarMenu";
import { LayoutProps } from "@/models/common";
import { useAppSelector } from "@/stores/store";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { useRouter } from "next/router";

export function MainLayout({ children }: LayoutProps) {
	const [open, setOpen] = useState(false);
	const { popupLogin, popupSignup } = useAppSelector((state) => state.toggle);
	const { isLoading } = useAppSelector((state) => state.nearWallet);
	const router = useRouter();

	const isHomeLayout =
		router.pathname === "/" ||
		router.pathname === "/about" ||
		router.pathname === "/green-shop" ||
		router.pathname === "/green-launcher" ||
		router.pathname === "/users/profile";
	return (
		<div className="w-screen relative ">
			<Header setOpen={setOpen} />
			{open && <SidebarMenu setOpen={setOpen} />}
			{!isHomeLayout && <div className="h-[60px]"></div>}
			<div>{children}</div>
			{popupLogin && <Login />}
			{popupSignup && <Signup />}
		</div>
	);
}
