import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
	useFloating,
	autoUpdate,
	offset,
	flip,
	shift,
	useDismiss,
	useRole,
	useClick,
	useInteractions,
	FloatingFocusManager,
} from "@floating-ui/react";
import Link from "next/link";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { logout } from "@/stores/authSlice";
import { popuploginPage, popupsignupPage } from "@/stores/toggleSlice";
import { useRouter } from "next/router";
import { authApi } from "@/api-client/auth-api";
import { toast } from "react-toastify";
import { capitalizeWords } from "@/utils";

const UserDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		isLoggedin,
		first_name,
		last_name,
		email,
		avatar,
		role: roleUser,
	} = useAppSelector((state) => state.auth);
	const router = useRouter();

	const isHomeLayout =
		router.pathname === "/" ||
		router.pathname === "/about" ||
		router.pathname === "/green-shop" ||
		router.pathname === "/users/profile";
	const LauncherLayout =router.pathname === "/green-launcher" 
	const dispatch = useAppDispatch();
	const { wallet } = useAppSelector((state: RootState) => state.nearWallet);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(10),
			flip({ fallbackAxisSideDirection: "end" }),
			shift(),
		],
		whileElementsMounted: autoUpdate,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
		role,
	]);

	const handleLogout = async () => {
		if (wallet?.accountId) {
			wallet?.signOut();
		}
		const response = await authApi.logout();
		// toast.success(response.data.message);
		dispatch(logout());
	};
	const handlePopupLogin = () => {
		dispatch(popuploginPage());
	};
	return (
		<div className=" lg:w-[35%] lg:inline-flex pr-[20px] lg:justify-end">
			<div className="flex-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-6 h-6 hidden ${
						isHomeLayout && "text-white"
					} ${LauncherLayout && 'text-green-500'} lg:inline-flex cursor-pointer  `}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
					/>
				</svg>
				{isLoggedin ? (
					<>
						<div
							ref={refs.setReference}
							{...getReferenceProps()}
							className={`flex-center mx-4 relative ${LauncherLayout && 'text-green-500'} ${
								isHomeLayout && "text-white"
							} cursor-pointer `}
						>
							<img
								src={avatar || "/assets/images/avata.png"}
								alt=""
								className="rounded-[50%] border mr-1 w-[30px] h-[30px]"
							/>
							<span>
								{first_name && last_name
									? capitalizeWords(
											`${first_name} ${last_name}`
									  )
									: email}
							</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
						{isOpen && (
							<FloatingFocusManager
								context={context}
								modal={false}
							>
								<AnimatePresence>
									<motion.div
										initial={{
											opacity: 0,
											transform: "scale(0)",
										}}
										animate={{
											opacity: 1,
											transform: "scale(1)",
										}}
										exit={{
											opacity: 0,
											transform: "scale(0)",
										}}
										transition={{ duration: "0.2" }}
										className=" mt-1 shawdow-md  absolute z-[99] "
									>
										<ul
											className=" min-w-[130px] mt-[-5px]  shawdow-md text-white font-bold text-[20px]  bg-[#09A507] "
											ref={refs.setFloating}
											style={floatingStyles}
											{...getFloatingProps()}
										>
											{roleUser === "Admin" && (
												<li
													onClick={() => {
														setIsOpen(false);
													}}
													className="py-2 dropdown-li  hover:text-black "
												>
													<Link href="/admin">
														Admin
													</Link>
												</li>
											)}

											<li
												onClick={() => {
													setIsOpen(false);
												}}
												className="py-2 dropdown-li  hover:text-black "
											>
												<Link href="/users/profile">
													My profile (
													{first_name && last_name
														? capitalizeWords(
																`${first_name} ${last_name}`
														  )
														: email}
													)
												</Link>
											</li>
											<li
												onClick={() => {
													setIsOpen(false);
												}}
												className="py-2 dropdown-li  hover:text-black "
											>
												<Link href="/my-orders">
													My Orders
												</Link>
											</li>
											<li
												onClick={() => {
													dispatch(popupsignupPage()),
														setIsOpen(false);
												}}
												className="py-2 cursor-pointer dropdown-li  hover:text-black "
											>
												<span>Add memebr</span>
											</li>
											<li className="py-2 dropdown-li hover:text-black ">
												<Link href="/">Setting</Link>
											</li>
											<li
												onClick={handleLogout}
												className="py-2 dropdown-li cursor-pointer hover:text-black "
											>
												<span>Logout</span>
											</li>
										</ul>
									</motion.div>
								</AnimatePresence>
							</FloatingFocusManager>
						)}
					</>
				) : (
					<div
						onClick={handlePopupLogin}
						className="flex-center border px-4 rounded-md cursor-pointer hover:bg-[#009A22] hover:scale-[1.02] py-1 bg-gradient-to-r from-[#4ACC35] to-[#009A22] text-white ml-6"
					>
						<span>Login</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
							/>
						</svg>
					</div>
				)}
			</div>
		</div>
	);
};
export default UserDropdown;
