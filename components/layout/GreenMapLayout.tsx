import React, { useState } from "react";
import Header from "../Header";
import SidebarMenu from "../SidebarMenu";
import { LayoutProps } from "@/models/common";
import { useSelector } from "react-redux";
import Popup from "@/components/Popup";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

export function GreenMapLayout({ children }: LayoutProps) {
	const { isPopupAddGreenPoint } = useSelector(
		(state: RootState) => state.map
	);
	const [open, setOpen] = useState(false);
	const { popupLogin, popupSignup } = useAppSelector((state) => state.toggle);
	return (
		<div className="w-screen relative">
			<Header setOpen={setOpen} />
			{open && <SidebarMenu setOpen={setOpen} />}
			<div className="h-[60px]"></div>
			<div>{children}</div>
			{isPopupAddGreenPoint && <Popup />}
			{popupLogin && <Login />}
			{popupSignup && <Signup />}
		</div>
	);
}
