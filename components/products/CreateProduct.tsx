import { Dispatch, SetStateAction, useState, useRef } from "react";
import { useAppDispatch } from "@/stores/store";
import { toggleCreateProductPage } from "@/stores/toggleSlice";
import { uploadFileToBE } from "@/api-client/file-api";
import axios from "axios";
import Loading from "../Loading";
import { createProduct } from "@/api-client/products-api";
import { toast } from "react-toastify";

const CreateProduct = () => {
	const dispatch = useAppDispatch();
	const [title, setTittle] = useState<string>("");
	const [body_html, setBodyHtml] = useState<string>("");
	const [vendor, setVendor] = useState<string>("");
	const [product_type, setProductType] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [inventory_quantity, setInventoryQuantity] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingLogo, setLoadingLogo] = useState<boolean>(false);
	const logoInputRef = useRef<HTMLInputElement>(null);
	const [selectedLogo, setSelectedLogo] = useState<string>("");

	const buttonUploadImg = () => {
		try {
			logoInputRef.current?.click();
		} catch (error) {
			console.log("error", error);
		}
	};
	const handleUploadFile = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			setLoadingLogo(true);
			if (event.target.files) {
				const response = await uploadFileToBE(
					event.target.files[0].name,
					event.target.files[0].size,
					event.target.files[0].type
				);
				const { url, fields } = response.data;

				// Step 2: Use the pre-signed URL and fields to make the POST request to AWS S3.
				const formData = new FormData();

				Object.keys(fields).forEach((key) => {
					formData.append(key, fields[key]);
				});

				formData.append("file", event.target.files[0]);

				const uploadResponse = await axios.post(url, formData);
				setSelectedLogo(url + "/" + fields.key);
				console.log('url + "/" + fields.key', url + "/" + fields.key);
			}
			setLoadingLogo(false);
		} catch (error) {
			console.log("error", error);
		}
	};
	const createNewProduct = async () => {
		setLoading(true);
		const res = await createProduct({
			title,
			body_html,
			vendor,
			product_type,
			price,
			inventory_quantity,
			selectedLogo,
		});
		console.log("res", res);
		if (res.status === 201) {
			toast.success("Created A New Product Successfully");
		} else {
			toast.error("Created A New Product Failure");
		}
		setLoading(false);
		dispatch(toggleCreateProductPage());
	};
	return (
		<div className=" px-5 py-3 border-l-[1px]  shadow-md  bg-white  z-30">
			<div className="flex items-center justify-between">
				<h1 className=" w-full text-center text-[28px]">
					Create new product
				</h1>
				<div className="fixed top-3 right-7">
					<svg
						onClick={() => dispatch(toggleCreateProductPage())}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 cursor-pointer"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>
			</div>
			<div className="flex justify-center mt-7">
				{loading ? (
					<div className="h-screen">
						<Loading />
					</div>
				) : (
					<div className="w-[70%] border p-7">
						<div className="flex-center ">
							<label className="w-[20%]">Product title:</label>
							<input
								type="text"
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none"
								value={title}
								onChange={(e) => setTittle(e.target.value)}
							/>
						</div>
						<div className="flex-center mt-7 ">
							<label className="w-[20%]">
								Product description:
							</label>
							<textarea
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none "
								value={body_html}
								onChange={(e) => setBodyHtml(e.target.value)}
							/>
						</div>
						<div className="flex-center mt-7">
							<label className="w-[20%]">Vendor:</label>
							<input
								type="text"
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none"
								value={vendor}
								onChange={(e) => setVendor(e.target.value)}
							/>
						</div>
						<div className="flex-center mt-7">
							<label className="w-[20%]">Type:</label>
							<input
								type="text"
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none"
								value={product_type}
								onChange={(e) => setProductType(e.target.value)}
							/>
						</div>
						<div className="flex-center mt-7">
							<label className="w-[20%]">Price:</label>
							<input
								type="text"
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className="flex-center mt-7">
							<label className="w-[20%]">
								Inventory Quantity:
							</label>
							<input
								type="number"
								className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none"
								value={
									inventory_quantity === 0
										? undefined
										: inventory_quantity
								}
								onChange={(e) =>
									setInventoryQuantity(
										parseInt(e.target.value)
									)
								}
							/>
						</div>
						{/* <Setprice /> */}
						{/* <Inventory /> */}
						{/* <Category /> */}
						{/* <UploadMedia /> */}
						<input
							type="file"
							placeholder="Add your logo"
							className="hidden"
							ref={logoInputRef}
							onChange={handleUploadFile}
						/>
						{loadingLogo ? (
							<div className="w-full my-7">
								<Loading />
							</div>
						) : (
							<button
								onClick={buttonUploadImg}
								className="flex flex-row items-center justify-center mt-7 w-full"
							>
								<div className="w-[100px] h-[100px] rounded-[8px] border-[1px]">
									{selectedLogo ? (
										<img
											src={selectedLogo}
											alt=""
											className="w-[100px] h-[100px] rounded-[8px] border-[1px]"
										/>
									) : (
										<img
											src="/assets/images/icon_upload_img.svg"
											alt=""
											className="w-full h-full"
										/>
									)}
								</div>
								<div className="text-neutral-600 text-[16px] font-normal ml-[10px]">
									{!selectedLogo
										? "Add product's image"
										: "Replace with a new image"}
								</div>
							</button>
						)}
						<div className="flex-center justify-center mt-3">
							<button
								onClick={() =>
									dispatch(toggleCreateProductPage())
								}
								className="border-black border-[1px] rounded-[16px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#525252] bg-[#C2C2C2] mx-[5px] hover:border-[1px] hover:border-white hover:text-black"
							>
								Cancer
							</button>
							<button
								onClick={createNewProduct}
								className="hover:bg-[#09A507] hover:text-white rounded-[16px] border-[1px] h-[35px] text-[16px] py-[3px] px-[15px] text-[#09A507] border-[#09A507] mx-[5px]"
							>
								Create
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default CreateProduct;
