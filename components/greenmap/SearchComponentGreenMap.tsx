import { searchGreenPoints } from "@/api-client/green-point-api";
import React, { useEffect, useState } from "react";

export default function SearchComponentGreenMap() {
	const [typeSearch, setTypeSearch] = useState<"greenpoint" | "location">(
		"greenpoint"
	);
	const [showButtonTypeSearch, setShowButtonTypeSearch] =
		useState<boolean>(false);
	const [searchClass, setSearchClass] = useState<string>(
		"w-[400px] mx-[10px] h-12 bg-white rounded-2xl shadow justify-start items-center gap-2.5 flex flex-row mt-[16px] drop_shadow_right relative"
	);
	const [showContentSearch, setShowContentSearch] = useState<boolean>(false);
	const [inputSearch, setInputSearch] = useState<string>("");
	const [resSearch, setResSearch] = useState<Array<{ name: string }>>([]);
	useEffect(() => {
		const getResSearch = async () => {
			const res = await searchGreenPoints({ name: inputSearch });
			if (res.status === 200) {
				setResSearch(res.data);
			}
		};
		getResSearch();
	}, [inputSearch]);
	return (
		<div className={searchClass}>
			<button
				onClick={() => setShowButtonTypeSearch((preState) => !preState)}
				className="relative w-[200px] h-full"
			>
				<div className="flex flex-row items-center justify-between">
					<div className="text-[14px] text-zinc-800 font-normal px-[10px]">
						{typeSearch === "greenpoint"
							? "Green Points"
							: "Location"}
					</div>
					<img
						src="/assets/images/icon_dropdown.svg"
						alt=""
						className="h-min"
					/>
				</div>
				{showButtonTypeSearch && (
					<div className="absolute top-full w-[110%] h-[100px] bg-white rounded-[16px] drop_show_around">
						<button
							onClick={() => setTypeSearch("greenpoint")}
							className="w-full h-[50%] text-left text-[14px] text-zinc-800 font-normal hover:bg-slate-300 px-[10px] rounded-t-[16px]"
						>
							Green Points
						</button>
						<button
							onClick={() => setTypeSearch("location")}
							className="w-full h-[50%] text-left text-[14px] text-zinc-800 font-normal hover:bg-slate-300 px-[10px] rounded-b-[16px] "
						>
							Location
						</button>
					</div>
				)}
			</button>
			<div className="h-[20px] border-l-[1px] border-slate-300"></div>
			<input
				type="text"
				placeholder="Search Green Points"
				className="search-input rounded-r-[16px]"
				onFocus={() => {
					setSearchClass(
						"w-[400px] mx-[10px] h-12 bg-white rounded-t-2xl shadow justify-start items-center gap-2.5 flex flex-row mt-[16px] drop_shadow_right relative"
					);
					setShowContentSearch(true);
				}}
				onBlur={() => {
					setShowContentSearch(false);
					setSearchClass(
						"w-[400px] mx-[10px] h-12 bg-white rounded-2xl shadow justify-start items-center gap-2.5 flex flex-row mt-[16px] drop_shadow_right relative"
					);
				}}
				value={inputSearch}
				onChange={(e) => setInputSearch(e.target.value)}
			/>
			<button className="h-min pr-[10px]">
				<img src="/assets/images/search_icon.svg" alt="" />
			</button>
			{showContentSearch && (
				<div className="w-[400px] h-min bg-white absolute top-[100%] left-0  py-[10px] border-t-[1px] border-slate-300 ">
					<div className="flex flex-col overflow-auto hide-scrollbar max-h-[250px] h-min">
						{resSearch.length > 0 &&
							resSearch.map((res) => {
								return (
									<button className="text-zinc-800 text-[14px] font-normal py-[10px] text-left hover:bg-slate-300 px-[20px]">
										{res.name}
									</button>
								);
							})}
					</div>
				</div>
			)}
		</div>
	);
}
