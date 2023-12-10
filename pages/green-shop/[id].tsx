import Footer from "@/components/home/Footer";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAppSelector } from "@/stores/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WalletPopup from "@/components/WalletPopup";
import { ShopifyProduct } from "@/models/product";
import { PopupPurchase } from "@/components/greenshop/PopupPurchase";
import { NextPageContext } from "next";
import ContentEditable from "react-contenteditable";

export const getServerSideProps = async (context: NextPageContext) => {
	const { query } = context;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${query.id}`
	);
	const data = await res.json();
	return { props: { product: data || {} } };
};
const ProductDetail = (props: { product: ShopifyProduct }) => {
	const [display, setDisplay] = useState<boolean>(false);
	const [select, setSelect] = useState<string>("Assets");
	const [loading, setLoading] = useState<boolean>(false);
	const [showPopupPurchase, setShowPopupPurchase] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);
	const { popupWalletState } = useAppSelector((state) => state.toggle);

	return (
		<div className="w-screen relative">
			{!loading && (
				<>
					{popupWalletState && <WalletPopup />}
					<div className="lg:hidden py-[32px] px-[30px] ">
						<Link className="hover:text-red-600" href="/green-shop">
							Back
						</Link>
					</div>
					<div className="w-full hidden lg:inline-flex  lg:flex-center lg:px-[120px] lg:h-[134px]">
						<Link
							className="lg:w-[15%] flex-center px-[80px] hover:text-red-600"
							href="/green-shop"
						>
							Back
						</Link>
						<div className="hidden flex-center justify-center lg:w-[85%]">
							<div className=" h-[54px] hidden rounded-md w-1/2 border-[2px] border-[#09A507] bg-white flex-center ">
								<div className="flex w-[30%] relative flex-col  border-r-[1px] border-r-[#CFD9E0]  ">
									<p className="px-3">{select}</p>
									{display ? (
										<svg
											onClick={() => setDisplay(false)}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6 absolute right-[5%] cursor-pointer"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M4.5 15.75l7.5-7.5 7.5 7.5"
											/>
										</svg>
									) : (
										<svg
											onClick={() => setDisplay(true)}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6 absolute  right-[5%] cursor-pointer"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 8.25l-7.5 7.5-7.5-7.5"
											/>
										</svg>
									)}

									{display && (
										<div className=" w-full absolute top-[40px] border bg-white ">
											<ul className="py-[20px] pl-4">
												<li className=" cursor-pointer mb-3 hover:underline text-[#323232] text-[17px]">
													Solar Panels
												</li>
												<li className="cursor-pointer hover:underline text-[#323232] text-[17px]">
													Electric Vehicle
												</li>
											</ul>
										</div>
									)}
								</div>
								<div className=" flex-center w-[70%]  h-full">
									<input
										type="text"
										className="w-[90%] h-full mx-6 outline-none"
									/>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6 mr-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-row px-[5%]">
						<div className="flex-col w-[40%]">
							<div className="w-full relative lg:h-[468px] h-[343px]  rounded-[8px]">
								<img
									src={
										props.product?.image?.src ||
										"/assets/images/green-shop.png"
									}
									alt=""
								/>
							</div>
							<div className="lg:h-[94px] lg:mt-[28px] hidden w-full overflow-scroll scrollbar-hide lg:inline-flex ">
								{/* {[1, 2, 3, 4, 5, 6, 7].map((i) => (
									<img
										src={products[id]?.url}
										alt=""
										className="border-r-[1px] cursor-pointer"
									/>
								))} */}
							</div>
						</div>
						<div className="w-[60%] ml-[32px]">
							<p className="w-full h-min text-[15px] uppercase leading-[21.83px] font-[600]">
								{props.product?.title}
							</p>

							<div className="flex-center text-[#09A507] text-[16px] my-2 font-[300]">
								<span>5.0</span>
								<div className="flex-center ml-2">
									{[1, 2, 3, 4, 5].map((i) => (
										<Image
											key={i}
											src="/assets/images/star.png"
											alt=""
											width={20}
											height={20}
										/>
									))}
								</div>
							</div>
							<div className="border-y-[1px] mt-[20px] py-[10px]">
								<div className="h-[36px] flex-center">
									<p className="text-[30px] text-[#CC2C2C] font-[600]">
										{`$ ${
											props.product?.variants &&
											props.product?.variants.length > 0
												? props.product?.variants[0]
														.price
												: ""
										}`}
									</p>
								</div>
							</div>
							<div className="h-min mt-[10px]">
								<ContentEditable
									html={props.product?.body_html}
									onChange={() => {}}
									disabled={true}
								/>
								{/* <div contenteditable="true">{props.product?.body_html}</div> */}
								<div className="h-[32px] flex-center my-[14.5px]">
									<p className="w-[130px] text-[14px] leading-[19.41px]">
										Number
									</p>
									<div className="flex-center h-[32px] ">
										<button
											onClick={() => {
												if (quantity > 1) {
													setQuantity(quantity - 1);
												}
											}}
											className="w-[32px] h-full mr-4 flex-center justify-center rounded-[6px] cursor-pointer border"
										>
											-
										</button>
										<div className="w-[80px] h-full mr-4 flex-center justify-center rounded-[6px] cursor-pointer border">
											{quantity}
										</div>
										<button
											onClick={() =>
												setQuantity(quantity + 1)
											}
											className="w-[32px] h-full mr-4 flex-center justify-center rounded-[6px] cursor-pointer border"
										>
											+
										</button>
									</div>
								</div>
								<button
									onClick={() => setShowPopupPurchase(true)}
									className="w-[190px] h-[48px] rounded-[8px] mt-[10px] bg-btn text-white lg:mt-[20px]"
								>
									Buy Now
								</button>
							</div>
						</div>
					</div>

					<Footer />
				</>
			)}
			{showPopupPurchase && (
				<PopupPurchase
					id={parseInt(`${props.product?.variants[0].id}`)}
					setShowPopupPurchase={setShowPopupPurchase}
					quantity={quantity}
					price={`${props.product?.variants[0].price}`}
					imageUrl={`${
						props.product?.image?.src ||
						"/assets/images/green-shop.png"
					}`}
				/>
			)}
		</div>
	);
};

export default ProductDetail;
ProductDetail.Layout = MainLayout;
