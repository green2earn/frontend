declare var window: any;
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema, loginSchema, schema } from "@/utils/validateAuthForm";
import { authApi } from "@/api-client/auth-api";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { toast } from "react-toastify";
import { login } from "@/stores/authSlice";
import { popuploginPage, popupsignupPage } from "@/stores/toggleSlice";
import { ethers } from "ethers";
import { setWalletInfo, setWeb3Provider } from "@/stores/etherWalletSlice";
import { getUserById } from "@/api-client/user-api";
import { WsProvider, ApiPromise } from "@polkadot/api";
import {
	setAccountsPolkadot,
	setGreenShopContract,
	setpolkadotApi,
} from "@/stores/polkadotApiSlice";
import { useCall, useContract, useTx, useTxEvents } from "useink";
import metadata from "@/contracts/polkadot/metadatas/greenshop.json";
import {
	SubstrateWalletPlatform,
	allSubstrateWallets,
	isWalletInstalled,
	useInkathon,
} from "@scio-labs/use-inkathon";

const Login = () => {
	const [open, setOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isLoggedin } = useAppSelector((state: RootState) => state.auth);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<LoginSchema>({
		resolver: yupResolver(loginSchema),
	});

	const {
		activeChain,
		switchActiveChain,
		connect,
		disconnect,
		isConnecting,
		activeAccount,
		accounts,
		setActiveAccount,
	} = useInkathon();
	// Sort installed wallets first
	const [browserWallets] = useState([
		...allSubstrateWallets.filter(
			(w) =>
				w.platforms.includes(SubstrateWalletPlatform.Browser) &&
				isWalletInstalled(w)
		),
		...allSubstrateWallets.filter(
			(w) =>
				w.platforms.includes(SubstrateWalletPlatform.Browser) &&
				!isWalletInstalled(w)
		),
	]);

	const onConnectMetamask = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(
				window.ethereum,
				undefined
			);
			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();
			const address = await signer.getAddress();
			dispatch(setWalletInfo(address));
			dispatch(setWeb3Provider(provider));
		}
	};

	const greenShopContract = useContract(
		"5DBtSxH8VTzrN4xpcGxb8gKCnuPdFhvEGsiweULteAKtbAj3",
		metadata
	);

	useEffect(() => {
		if (greenShopContract) {
			console.log("greenShopContract", greenShopContract);
			dispatch(setGreenShopContract(greenShopContract));
		}
	}, [greenShopContract]);

	const setupPolkadot = async () => {
		try {
			if (typeof window !== "undefined") {
				const wsProvider = new WsProvider("ws://127.0.0.1:9944");
				const api = await ApiPromise.create({ provider: wsProvider });
				dispatch(setpolkadotApi(api));
				const { web3Enable, web3Accounts } = await import(
					"@polkadot/extension-dapp"
				);
				const extensions = await web3Enable("Green2Earn");
				if (!extensions) {
					throw Error("NO_EXTENSION_FOUND");
				}
				const allAccounts = await web3Accounts();
				console.log("allAccounts", allAccounts);
				dispatch(setAccountsPolkadot(allAccounts));

				!activeAccount &&
					browserWallets.map((w) => {
						if (isWalletInstalled(w) && w.name === "SubWallet") {
							connect?.(undefined, w);
							accounts && setActiveAccount?.(accounts[0]);
						}
					});
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleConnectionPolkadot = async () => {};

	const handleToggleSignupPage = () => {
		if (isLoggedin) {
			dispatch(popuploginPage());
			dispatch(popupsignupPage());
		} else {
			toast.error("You are not authorized");
		}
	};
	const onSubmit = handleSubmit(async (formData) => {
		setIsLoading(true);
		try {
			const { data } = await authApi.login({
				email: formData.email,
				password: formData.password,
			});

			if (data.statusCode === 200) {
				const res = await getUserById(`${data.data.user_id}`);
				console.log("res", res);
				if (res.status === 200) {
					dispatch(
						login({
							isLoggedin: true,
							first_name: res.data.firstname,
							last_name: res.data.last_name,
							email: res.data.email,
							avatar: res.data.avatar,
							role: res.data.role,
							user_id: res.data.user_id,
						})
					);
					dispatch(popuploginPage());
					// toast.success(data.message);
				}
				setIsLoading(false);
			} else if (data.statusCode === 422) {
				setError("password", { message: data.message });
				setIsLoading(false);
			}
			// onConnectMetamask();
			setupPolkadot();
		} catch (error) {
			console.log(error);
		}
	});
	return (
		<div className=" fixed top-0 left-0 right-0 flex-center z-[99] justify-center h-screen w-screen bg-[#2222]">
			<div className=" relative w-[95%] h-[80%] md:h-[70%] bg-white md:w-[75%] lg:w-[50%]">
				<div className="w-full h-full relative">
					<img
						src="/assets/images/bg-login.png"
						alt=""
						className="w-full h-full"
					/>
				</div>
				<div className="w-full absolute top-0 right-1  flex justify-end">
					<svg
						onClick={() => dispatch(popuploginPage())}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer text-white"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
				<Link className="absolute top-0 lef-0" href="/">
					<div className="flex-center mt-[50px] lg:mt-[30px]">
						<img
							src="/assets/images/LogoG2E.png"
							alt="Logo"
							className="rounded-[50%] w-[30px] h-[30px]"
						/>
						<h2 className="font-bold text-[14px] lg:text-[20px] text-[#09A507]">
							Green2Earn
						</h2>
					</div>
				</Link>
				<form
					onSubmit={onSubmit}
					className="w-[43%] lg:w-[45%]  absolute top-[100px] mt-3  p-2 flex-col justify-center"
				>
					<h2 className="font-[400] text-[24px] leading-[36px]">
						Login
					</h2>
					<input
						type="text"
						{...register("email")}
						placeholder="Email"
						className="border px-2 rounded-md mt-2 w-full leading-[36px]"
					/>
					<div className=" text-red-600 text-[12px] min-h-[15px]">
						{errors.email?.message}
					</div>
					<div className="w-full relative mt-2 ">
						<input
							{...register("password")}
							className="border px-2 rounded-md mt-2 w-full leading-[36px]"
							type={!open ? "password" : "text"}
							placeholder="Password"
						/>
						<div className=" text-red-600 text-[12px] min-h-[15px]">
							{errors.password?.message}
						</div>
						{open ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								onClick={() => setOpen(false)}
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 absolute right-[5px] cursor-pointer top-[50%] translate-y-[-50%]"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						) : (
							<svg
								onClick={() => setOpen(true)}
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5 absolute right-[5px] cursor-pointer top-[50%] translate-y-[-50%]"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						)}
					</div>
					<div className="w-full flex-center justify-end">
						<Link href="/forgetPassword">
							<span className="text-[12px] font-[400] text-[#525252] hover:text-red-500">
								Forget password?
							</span>
						</Link>
					</div>
					<Button
						isLoading={isLoading}
						disabled={isLoading}
						type="submit"
						className="flex-center mt-3 justify-center h-[36px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] text-white rounded-md w-full border"
					>
						<div className="flex-center justify-center">
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
					</Button>
					<div className="text-[12px] text-[#525252]">
						Do not have an accout?{" "}
						<span
							onClick={handleToggleSignupPage}
							className="text-[14px] cursor-pointer hover:text-red-500 text-[#181818]"
						>
							Sign up
						</span>
					</div>
					<div className="flex-center w-full mt-3">
						<div className="h-[1px] w-[30%] md:w-[38%] bg-[#C2C2C2]"></div>
						<span className="text-[10px] w-[40%] text-center md:w-[24%]">
							Login with
						</span>
						<div className="h-[1px] w-[30%] bg-[#C2C2C2] md:w-[38%]"></div>
					</div>
					<div className="w-full flex-center mt-3 justify-between">
						<div className="w-[40%] border p-1 flex-center justify-center">
							<div className="border  flex-center cursor-pointer justify-center bg-blue-600 h-[30px] p-1 w-[30px] rounded-[50%]">
								<img
									src="/assets/images/facebook.png"
									alt="Facebook logo"
									className="w-[14px] h-[26px]"
								/>
							</div>
						</div>
						<div className="w-[40%] border p-1 flex-center justify-center">
							<div className=" flex-center cursor-pointer justify-center  h-[30px] w-[30px] ">
								<img
									src="/assets/images/google.png"
									alt="Facebook logo"
									className="w-[30px] h-[30px]"
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
