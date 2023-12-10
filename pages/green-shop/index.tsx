import Carousel from "@/components/greenshop/Carousel";
import Filter from "@/components/greenshop/Filter";
import { MainLayout } from "@/components/layout/MainLayout";
import React, { useEffect } from "react";
import Products from "../../components/greenshop/Products";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import FeaturedProduct from "@/components/greenshop/FeaturedProduct";
import QuestionModal from "@/components/greenshop/QuestionModal";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import { setClickButtonBuy } from "@/stores/greenShopSlide";

const GreenShop = () => {
	const { clickButtonBuy } = useAppSelector(
		(state: RootState) => state.greenShop
	);
	const { wallet, isLoading } = useAppSelector(
		(state: RootState) => state.nearWallet
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const functionSignin = async () => {
			if (!isLoading && clickButtonBuy) {
				// await wallet?.signIn();
			}
		};
		functionSignin();
	}, [clickButtonBuy, isLoading]);
	useEffect(() => {
		dispatch(setClickButtonBuy(false));
	}, []);
	return (
		<div className="w-screen  bg-[#e9e9eb]">
			<Carousel />
			<h2 className="text-center lg:h-[73px] my-[40px] lg:leading-[73px] text-[55px] text-[#323232] font-[600]">
				Top categories on{" "}
				<span className="text-[#09A507]">Green2Earn</span>
			</h2>
			<div className="grid grid-cols-3 gap-x-4 h-[405px] grid-rows-1 px-[120px]">
				<div className=" relative col-span-2 row-span-1 border rounded-[8px] ">
					<Image
						src="/assets/images/slide7.png"
						alt=" "
						fill
						className="rounded-[8px]"
					/>
					<span className="absolute left-[32px] top-[352px] font-[600] text-white">
						Solar Energy
					</span>
				</div>
				<div className=" relative col-span-1 row-span-1  grid gap-y-4 grid-rows-2 rounded-[8px]">
					<div className=" relative  row-span-1 border rounded-[8px]">
						<Image
							src="/assets/images/slide6.png"
							alt=" "
							fill
							className="rounded-[8px]"
						/>
						<span className="absolute left-[17px] top-[148px] font-[600] text-white">
							Wind Energy
						</span>
					</div>
					<div className=" relative  row-span-1 border rounded-[8px]">
						<Image
							src="/assets/images/slide5.png"
							alt=" "
							fill
							className="rounded-[8px]"
						/>
						<span className="absolute left-[17px] top-[148px] text-white">
							Green Bycicle
						</span>
					</div>
				</div>
			</div>
			<h3 className="ml-[120px] mt-[40px] text-[30px]">For you</h3>
			<Products />
			<Footer />
			{/* <QuestionModal /> */}
		</div>
	);
};

export default GreenShop;
GreenShop.Layout = MainLayout;
