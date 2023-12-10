import { useState } from "react";

const Status = () => {
	const [status, setStatus] = useState<string>("Pending");
	return (
		<div className="flex mt-7 w-full">
			<h3 className="w-[20%]">Status</h3>
			<div className="w-[60%] flex-center ">
				<div className="flex items-center mb-4  mr-[30px]">
					<input
						id="inline-2-radio"
						type="radio"
						checked={status === "Pending"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setStatus(e.target.value)
						}
						value="Pending"
						name="inline-radio-group"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor="inline-2-radio"
						className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Pending
					</label>
				</div>
				<div className="flex items-center mb-4  mr-[30px]">
					<input
						id="inline-2-radio"
						type="radio"
						checked={status === "Verify"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setStatus(e.target.value)
						}
						value="Verify"
						name="inline-radio-group"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor="inline-2-radio"
						className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						Verify
					</label>
				</div>
				<div className="flex items-center mb-4  mr-[30px]">
					<input
						id="inline-2-radio"
						type="radio"
						checked={status === "OnChain"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setStatus(e.target.value)
						}
						value="OnChain"
						name="inline-radio-group"
						className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>
					<label
						htmlFor="inline-2-radio"
						className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						OnChain
					</label>
				</div>
			</div>
		</div>
	);
};

export default Status;
