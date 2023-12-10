import { createOrder, updateOrder } from "@/api-client/orders-api";
import { createTransaction } from "@/api-client/transaction-api";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { createDraftOrder } from "@/api-client/draft-order-api";
import { useRouter } from "next/router";
import {
	useInkathon,
	useRegisteredContract,
	contractTx,
} from "@scio-labs/use-inkathon";
import { toast } from "react-toastify";

interface Prop {
	setShowPopupPurchase: (value: boolean) => void;
	id: number;
	quantity: number;
	price: string;
	imageUrl: string;
}

export const PopupPurchase: React.FC<Prop> = ({
	id,
	setShowPopupPurchase,
	quantity,
	price,
	imageUrl,
}) => {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const [order, setOrder] = useState<any>();
	const [transaction, setTransaction] = useState<any>();
	const [numberPage, setNumberPage] = useState<1 | 2>(1);
	const [email, setEmail] = useState<string>("");
	const [first_name, setFirstName] = useState<string>("");
	const [last_name, setLastName] = useState<string>("");
	const [shipping_address_first_name, setShippingAddressFirstName] =
		useState<string>("");
	const [shipping_address_last_name, setshippingAddressLastName] =
		useState<string>("");
	const [shipping_address_address1, setShippingAddressAddress1] =
		useState<string>("");
	const [shipping_address_phone, setShippingAddressPhone] =
		useState<string>("");
	const [shipping_address_city, setShippingAddressCity] =
		useState<string>("");
	const [shipping_address_province, setShippingAddressProvince] =
		useState<string>("");
	const [shipping_address_country, setShippingAddressCountry] =
		useState<string>("");
	const [shipping_address_zip, setShippingAddressZip] = useState<string>("");
	const [cardNumber, setCardNumber] = useState<string>("");
	const [expirationDate, setExpirationDate] = useState<string>("");
	const [securityCode, setSecurityCode] = useState<string>("");
	const [nameOnCard, setNameOnCard] = useState<string>("");
	const { contract } = useRegisteredContract("greenShopContract");
	const { api, activeAccount, activeSigner } = useInkathon();

	const createOrderFunction = async () => {
		try {
			setLoading(true);
			const res = await createDraftOrder({
				variant_id: id,
				quantity: quantity,
				price,
				shipping_address_first_name,
				shipping_address_last_name,
				shipping_address_address1,
				shipping_address_phone,
				shipping_address_city,
				shipping_address_province,
				shipping_address_country,
				shipping_address_zip,
				email,
				first_name,
				last_name,
			});
			if (res.status === 201) {
				setOrder(res.data.draft_order);
				setTransaction(res.data.transaction);
			}
			setLoading(false);
		} catch (error) {
			console.log("error", error);
		}
	};
	const payNowFunction = async () => {
		try {
			setLoading(true);
			if (order && transaction) {
				const res = await createTransaction({
					order_id: order.order_id,
					currency: order.currency,
					amount: transaction.amount,
					parent_id: transaction.id,
				});
				if (res.status === 201 && res.data.status === "success") {
					if (!activeAccount || !contract || !activeSigner || !api) {
						toast.error("Wallet not connected. Try again…");
						return;
					}
					const respolkadot = await contractTx(
						api,
						activeAccount.address,
						contract,
						"mint_token",
						{},
						[activeAccount.address, parseInt(res.data.amount)]
					);
					if (respolkadot.result) {
						router.push(`/thankyou/${order.order_id}`);
					}
				}
			}
			setLoading(false);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div className="w-screen h-full layer absolute top-0 left-0 flex justify-center items-center">
			<div className="w-[50%] h-min min-h-[50vh] max-h-[80vh] bg-white fixed top-[100px] overflow-auto hide-scrollbar rounded-[10px]">
				{loading ? (
					<div className="w-full h-[50vh] flex flex-col justify-center items-center">
						<Loading />
						<div className="text-green-500 text-[18px]">
							Loading...
						</div>
					</div>
				) : (
					<>
						{numberPage === 1 ? (
							<>
								<div className="pt-[10px] pb-[15px] text-[24px] font-normal text-[#09A507] text-center w-full sticky top-0 bg-white drop-shadow-lg border-b-[1px] z-[1000]">
									Create Order
									<button
										onClick={() =>
											setShowPopupPurchase(false)
										}
										className="absolute top-[-5px] right-0"
									>
										<img
											src="/assets/images/icon_close.svg"
											alt=""
											className="p-[17px] hover:cursor-pointer hover:bg-slate-300 rounded-se-[16px]"
										/>
									</button>
								</div>
								<div className="w-full mt-[5px] px-[15px] pb-[15px]  flex flex-col overflow-auto hide-scrollbar">
									<div className="text-[#181818] text-[18px] text-normal mb-[8px]">
										Contact
									</div>

									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Email*"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="First Name*"
										value={first_name}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Last Name*"
										value={last_name}
										onChange={(e) =>
											setLastName(e.target.value)
										}
									/>

									<div className="text-[#181818] text-[18px] text-normal mt-[20px] mb-[8px]">
										Shipping Address
									</div>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="First Name*"
										value={shipping_address_first_name}
										onChange={(e) =>
											setShippingAddressFirstName(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Last Name*"
										value={shipping_address_last_name}
										onChange={(e) =>
											setshippingAddressLastName(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Address*"
										value={shipping_address_address1}
										onChange={(e) =>
											setShippingAddressAddress1(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Phone*"
										value={shipping_address_phone}
										onChange={(e) =>
											setShippingAddressPhone(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="City*"
										value={shipping_address_city}
										onChange={(e) =>
											setShippingAddressCity(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Province*"
										value={shipping_address_province}
										onChange={(e) =>
											setShippingAddressProvince(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Country*"
										value={shipping_address_country}
										onChange={(e) =>
											setShippingAddressCountry(
												e.target.value
											)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Zip Code*"
										value={shipping_address_zip}
										onChange={(e) =>
											setShippingAddressZip(
												e.target.value
											)
										}
									/>
								</div>
							</>
						) : (
							<>
								<div className="pt-[10px] pb-[15px] text-[24px] font-normal text-[#09A507] text-center w-full sticky top-0 bg-white drop-shadow-lg border-b-[1px] z-[1000]">
									Payment
									<button
										onClick={() =>
											setShowPopupPurchase(false)
										}
										className="absolute top-[-5px] right-0"
									>
										<img
											src="/assets/images/icon_close.svg"
											alt=""
											className="p-[17px] hover:cursor-pointer hover:bg-slate-300 rounded-se-[16px]"
										/>
									</button>
								</div>
								<div className="w-full mt-[5px] px-[15px] pb-[15px]  flex flex-col overflow-auto hide-scrollbar">
									<div className="text-[#181818] text-[18px] text-normal mt-[20px] mb-[8px]">
										Credit card
									</div>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Card number"
										value={cardNumber}
										onChange={(e) =>
											setCardNumber(e.target.value)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Expiration date (MM / YY)"
										value={expirationDate}
										onChange={(e) =>
											setExpirationDate(e.target.value)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Security code"
										value={securityCode}
										onChange={(e) =>
											setSecurityCode(e.target.value)
										}
									/>
									<input
										type="text"
										className="border-[1px] rounded-[16px] h-[51px] text-[16px] text-normal text-[#525252] px-[13px] placeholder:text-[16px] placeholder:text-normal placeholder:text-[#525252] my-[4px]"
										placeholder="Name on card"
										value={nameOnCard}
										onChange={(e) =>
											setNameOnCard(e.target.value)
										}
									/>
								</div>
							</>
						)}
						<div className="w-full sticky bottom-0 bg-white z-[1000] py-[10px] flex flex-row-reverse px-[15px]">
							<button
								onClick={async () => {
									if (numberPage === 1) {
										await createOrderFunction();
										setNumberPage(2);
									} else {
										await payNowFunction();
									}
								}}
								// onClick={() => mintToken(100)}
								className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507]  mx-[5px]"
							>
								{numberPage === 1 ? "Next" : "Pay Now"}
							</button>
							{numberPage !== 1 && (
								<button
									onClick={() => {
										setNumberPage(1);
									}}
									className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507]  mx-[5px]"
								>
									Back
								</button>
							)}
							<button
								onClick={() => setShowPopupPurchase(false)}
								className="border-black border-[1px] rounded-[16px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#525252] bg-[#C2C2C2] mx-[5px] hover:border-[1px] hover:border-white hover:text-black"
							>
								Cancel
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};
