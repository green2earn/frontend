import Link from "next/link";
import { setClickButtonBuy } from "@/stores/greenShopSlide";
import { RootState, useAppDispatch } from "@/stores/store";
import { useSelector } from "react-redux";

const ProductItem = ({ item, index }: { item: any; index: any }) => {
	const dispatch = useAppDispatch();
	const { wallet } = useSelector((state: RootState) => state.nearWallet);
	const convertToNear = (x: number) => {
		return Math.round(x / 23500 / 1.2 / 50);
	};
	const handleClickButtonBuyItem = () => {
		if (!wallet?.accountId) {
			dispatch(setClickButtonBuy(true));
		}
	};
	return (
		<div className="lg:col-span-1 overflow-hidden lg:row-span-1 relative rounded-sm shadow-md item hover:border-[#00dd53] transition duration-[.8] cursor-pointer ease-in-out hover:scale-[1.05]  hover:border-[1.6px]  lg:h-[300px] ">
			<div className="absolute top-0 left-0 w-full h-full flex-center rounded-[8px]  bg-white flex-col justify-around">
				<img
					className="item-img rounded-[8px]"
					src={item?.image?.src || "/assets/images/green-shop.png"}
					alt=""
				/>
				<div className="item-title text-center pb-[0px]">
					<h1 className="font-semibold text-[20px] mb-[10px]">{item?.title}</h1>
					<p className="item-price">
						{`$${
							item?.variants?.length > 0
								? item?.variants[0].price
								: null
						}`}
					</p>
				</div>

				<div className="item-footer flex-center ">
					<button className="btn btn-success">Learn more</button>
					<button className="btn btn-border">
						<Link href={`/green-shop/${index}`}>Buy</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
