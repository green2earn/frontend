import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { Schema, schema } from "@/utils/validateAuthForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/stores/store";
import { popupsignupPage } from "@/stores/toggleSlice";
import { authApi } from "@/api-client/auth-api";
import { toast } from "react-toastify";

const Signup = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<Schema>({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (formData) => {
		setIsLoading(true);
		try {
			await authApi.signup({
				username: formData.name,
				email: formData.email,
				role: "Member",
				password: formData.password,
			});
			setIsLoading(false);
			dispatch(popupsignupPage());
			toast.success("Sigup successfully");
		} catch (error: any) {
			if (error.response.data.statusCode === 400) {
				setError("email", { message: "Email has existed" });
				setIsLoading(false);
			} else {
				toast.error("Server Error");
			}
		}
	});
	return (
		<div className=" fixed top-0 left-0 right-0 z-[999] flex-center justify-center h-screen w-screen bg-[#2222]">
			<div className=" relative w-[95%] h-[85%] md:h-[88%] bg-white md:w-[75%] lg:w-[50%]">
				<div className="w-full h-full relative">
					<Image
						src="/assets/images/bg-login.png"
						alt=""
						layout="fill"
					/>
				</div>
				<div className="w-full absolute top-0 right-1  flex justify-end">
					<svg
						onClick={() => dispatch(popupsignupPage())}
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
					<div className="flex-center mt-[50px] lg:mt-[40px]">
						<Image
							src="/assets/images/LogoG2E.png"
							alt="Logo"
							width={30}
							className="rounded-[50%]"
							height={30}
						/>
						<h2 className="font-bold text-[14px] lg:text-[20px] text-[#09A507]">
							Green2Earn
						</h2>
					</div>
				</Link>
				<form
					onSubmit={onSubmit}
					className="w-[43%] lg:w-[45%]  absolute top-[100px] mt-3   p-2 flex-col justify-center"
				>
					<h2 className="font-[400] text-[16px] text-[#195B1B] md:text-[24px] mb-3 leading-[36px]">
						Welcome to G2E
					</h2>
					<input
						type="text"
						{...register("name")}
						placeholder="User name"
						className="border px-2 rounded-md mt-2 w-full leading-[36px]"
					/>
					<div className="mt-1 text-red-600 text-[12px] min-h-[15px]">
						{errors.name?.message}
					</div>

					<input
						type="text"
						{...register("email")}
						placeholder="Email"
						className="border px-2 rounded-md mt-2 w-full leading-[36px]"
					/>
					<div className="mt-1 text-red-600 text-[12px] min-h-[15px]">
						{errors.email?.message}
					</div>

					<div className="w-full relative mt-1 ">
						<input
							className="border px-2 rounded-md mt-2 w-full leading-[36px]"
							type={!open ? "password" : "text"}
							placeholder="Password"
							{...register("password")}
						/>
						<div className="mt-1 text-red-600 text-[12px] min-h-[15px]">
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
								className="w-5 h-5 absolute right-[5px] cursor-pointer top-[40%] translate-y-[-50%]"
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
								className="w-5 h-5 absolute right-[5px] cursor-pointer top-[40%] translate-y-[-50%]"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
								/>
							</svg>
						)}
					</div>
					<input
						type="password"
						{...register("confirm_password")}
						placeholder="Confirm password"
						className="border px-2 rounded-md mt-2 w-full leading-[36px]"
					/>
					<div className="mt-1 text-red-600 text-[12px] min-h-[15px]">
						{errors.confirm_password?.message}
					</div>

					<Button
						type="submit"
						isLoading={isLoading}
						disabled={isLoading}
						className="flex-center mt-3 justify-center h-[36px] bg-gradient-to-r from-[#4ACC35] to-[#009A22] text-white rounded-md w-full border"
					>
						<div className="flex-center justify-center">
							<span>Signup</span>
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
					<Link className="text-[12px] text-[#525252]" href="/signup">
						Already a member?{" "}
						<span className="text-[14px] text-[#181818]">
							Login
						</span>
					</Link>
					<div className="flex-center w-full mt-3">
						<div className="h-[1px] w-[30%] md:w-[38%] bg-[#C2C2C2]"></div>
						<span className="text-[10px] w-[40%] text-center md:w-[24%]">
							Signup with
						</span>
						<div className="h-[1px] w-[30%] bg-[#C2C2C2] md:w-[38%]"></div>
					</div>
					<div className="w-full flex-center mt-3 justify-between">
						<div className="w-[40%] border p-1 flex-center justify-center">
							<div className="border  flex-center cursor-pointer justify-center bg-blue-600 h-[30px] p-1 w-[30px] rounded-[50%]">
								<Image
									src="/assets/images/facebook.png"
									alt="Facebook logo"
									width={14}
									height={26}
								/>
							</div>
						</div>
						<div className="w-[40%] border p-1 flex-center justify-center">
							<div className=" flex-center cursor-pointer justify-center  h-[30px] w-[30px] ">
								<Image
									src="/assets/images/google.png"
									alt="Facebook logo"
									width={30}
									height={30}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
