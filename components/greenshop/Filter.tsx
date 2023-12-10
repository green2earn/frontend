const Filter = () => {
	return (
		<div className="w-full lg:h-[80px] flex-center border lg:px-[124px]">
			<form className="flex-center w-full h-full">
				<div className="flex w-[80%] ">
					<input
						className="h-[40px] w-[30%] border rounded-md pl-3"
						type="text"
						placeholder="Enter your search #"
					/>
					<div className="ml-[20px]">
						<select className="w-full h-[40px] border px-3 rounded-md ">
							<option>---Product type---</option>
							<option>Nang luong xanh</option>
						</select>
					</div>
				</div>
				<div className="w-[20%] flex-center justify-end">
					<button
						type="button"
						className="border h-[40px] px-[30px] bg-static rounded-md text-white"
					>
						{" "}
						Apply
					</button>
				</div>
			</form>
		</div>
	);
};

export default Filter;
