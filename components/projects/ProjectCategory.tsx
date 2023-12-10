import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../Button";
import { CategoryResponse } from "@/models/category";

interface ICategoryIDProps {
	categories?: CategoryResponse[];
	category_id: string;
	setCatogory_Id: Dispatch<SetStateAction<string>>;
}

const ProjectCategory = (props: ICategoryIDProps) => {
	const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

	const handleChooseOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.setCatogory_Id(e.target.value);
	};

	return (
		<div className="flex mt-7 w-full">
			<h3 className="w-[20%]">Category </h3>
			<div className="w-[60%] border">
				<div className="p-3">
					<div className="  grid grid-cols-2 ">
						<span className="p-2  border-r-[1px] col-span-1 border-t-[1px] border-x-[1px]">
							All categories
						</span>
						<span className="p-2 text-blue-500 col-span-1  border-b-[1px]">
							Most used
						</span>
					</div>
					<div className="border-b-[1px] border-x-[1px] p-3">
						{Number(props.category_id) >= 1 && (
							<div className="flex text-blue-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 "
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4.5 12.75l6 6 9-13.5"
									/>
								</svg>

								<span>
									{  props.categories &&
										props.categories[
											Number(props.category_id) - 1
										]?.title
									}
								</span>
							</div>
						)}
					</div>
					<div className="mt-2  cursor-pointer ">
						<div className="w-2/3">
							<select
								onChange={handleChooseOption}
								className="w-full h-[40px] border px-3 rounded-md mt-3"
							>
								<option>---Select---</option>
								{  props.categories && props.categories.map((c) => (
									<option value={c.id} key={c.id}>
										{c.title}
									</option>
								))}
							</select>
						</div>
						<div
							onClick={() => setIsDisplayed(!isDisplayed)}
							className="flex text-blue-500 underline mt-5 font-medium"
						>
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
									d="M12 6v12m6-6H6"
								/>
							</svg>
							<span>Add New Categories</span>
						</div>
						{isDisplayed && (
							<>
								<input
									type="text"
									placeholder="Enter title of category"
									className="h-[30px] w-full border px-3 rounded-md mt-3"
								/>
								<textarea className=" outline-none w-full mt-3 leading-[40px] px-4 border focus:outline-none " />
							</>
						)}

						{isDisplayed && (
							<Button
								type="button"
								className="border-[1px] flex-center justify-center min-w-[180px]  mt-4 py-2 text-white bg-blue-500 rounded-md"
							>
								Add New Category
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectCategory;