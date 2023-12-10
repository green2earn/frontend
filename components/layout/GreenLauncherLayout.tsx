import React, { useEffect, useState } from "react";
import Header from "../Header";
import SidebarMenu from "../SidebarMenu";
import { LayoutProps } from "@/models/common";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import { useRouter } from "next/router";
import NotificationPopup from "../greenlauncher/NotificationPopup";
import { refreshState } from "@/stores/greenLauncherSlice";

export function GreenLauncherLayout({ children }: LayoutProps) {
	const [open, setOpen] = useState(false);
	const [flag, setFlag] = useState(false);
	const { popupLogin, popupSignup } = useAppSelector((state) => state.toggle);
	const { showInformationPopup } = useAppSelector(
		(state) => state.greenLauncher
	);
	const router = useRouter();
	const isHomeLayout = router.pathname === "/";
	const LauncherLayout = router.pathname === "/green-launcher";

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(refreshState());
		setFlag(!flag);
		return () => {
			dispatch(refreshState());
		};
	}, []);
	return (
		<div className="w-screen relative">
			<Header setOpen={setOpen} />
			{open && <SidebarMenu setOpen={setOpen} />}
			{!isHomeLayout && !LauncherLayout && (
				<div className="h-[60px]"></div>
			)}

			<div>{children}</div>
			{popupLogin && <Login />}
			{popupSignup && <Signup />}
			{showInformationPopup && <NotificationPopup />}
		</div>
	);
}
