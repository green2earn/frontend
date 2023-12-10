import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ProjectCategory from "./ProjectCategory";
import useAutosizeTextArea from "@/utils/useAutosizeTextArea";
import UploadLogo from "./UploadLogo";
import UploadPhoto from "./UploadPhoto";
import ProjectInfo from "./ProjectInfo";
import Button from "../Button";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { toggleAddProjectPage } from "@/stores/toggleSlice";
import { categoryApi } from "@/api-client/categories-api";
import { CategoryResponse } from "@/models/category";
import Status from "./Status";
import { CreateProjectPayload } from "@/models/project";
import { toast } from "react-toastify";
import { createProject } from "@/api-client/green-point-api";

const AddProject = () => {
	const isUpdated = false;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const textAreaRef1 = useRef<HTMLTextAreaElement>(null);
	const textAreaRef2 = useRef<HTMLTextAreaElement>(null);
	const [category_id, setCategory_Id] = useState<string>("");
	const [catergories, setCategories] = useState<CategoryResponse[]>([]);
	const [projectName, setProjectName] = useState<string>("");
	const [projectOverview, setProjectOverview] = useState<string>("");
	const [projectDetail, setProjectDetail] = useState<string>("");
	const [logo, setLogo] = useState<string>("");
	const [projectPhoto, setProjectPhoto] = useState<string[]>([]);
	const [startingDate, setStartingDate] = useState<string>("");
	const [address, setAddress] = useState<string>("");
	const [long, setLong] = useState<string>("");
	const [lat, setLat] = useState<string>("");
	
	const isAuthenticated = useAppSelector(
		(state) => state.auth.isLoggedin
	);
	
	const findAllCategories = async () => {
		try {
			const { data } = await categoryApi.getAllCategories();
			setCategories(data);
		} catch (error) {
			console.log(error);
		}
	};

	   useEffect(() => {
		if (isAuthenticated) {
			   findAllCategories();
		} 
 }, [isAuthenticated]);

	useAutosizeTextArea(textAreaRef1.current, projectOverview);

	const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = evt.target?.value;

		setProjectOverview(val);
	};
	const dispatch = useAppDispatch();

	const handleAddProject = async () => {
		setIsLoading(true);
		try {
			const payload: CreateProjectPayload = {
				status: "Pending",
				name: projectName,
				actived_at: startingDate,
				logo: logo,
				image_url: projectPhoto,
				brief_description: projectOverview,
				detail_description: projectDetail,
				other_description: "",
				address: address,
				longtitude: Number(long),
				latitude: Number(lat),
				category_id: Number(category_id),
			};
			const data = await createProject(payload);
			setIsLoading(false);
			if (data.status == 201) {
				toast.success("You just created a project");
			}
		} catch (error) {
			setIsLoading(false);
		}
	};

	return (
		<div className="  px-5 py-3 border-l-[1px]  shadow-md  bg-white  z-30">
			<div className="flex items-center justify-between ">
				<h1 className=" w-[60%] text-right text-[28px]">
					Add new project
				</h1>
				<svg
					onClick={() => dispatch(toggleAddProjectPage())}
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
			<div className="flex-center justify-center">
				<div className=" relative w-[80%] border  p-7">
					<div className="flex-center ">
						<label className="w-[20%]">Project Name </label>
						<input
							name="ProjectName"
							value={projectName}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setProjectName(e.target.value)}
							type="text"
							className=" outline-none w-[60%] leading-[40px] px-4 border-b-[1px] focus:outline-none "
						/>
					</div>
					<div className="flex-center mt-7 ">
						<label className="w-[20%]">Project Overview</label>
						<textarea
							ref={textAreaRef1}
							value={projectOverview}
							onChange={handleChange}
							className=" outline-none w-[60%] resize-none border-b-[1px] focus:outline-none "
						/>
					</div>
					<div className="flex-center mt-5 ">
						<label className="w-[20%]">Project Detail</label>
						<textarea
							ref={textAreaRef2}
							value={projectDetail}
							onChange={(
								e: React.ChangeEvent<HTMLTextAreaElement>
							) => setProjectDetail(e.target.value)}
							className=" outline-none resize-none w-[60%] border-b-[1px] focus:outline-none "
						/>
					</div>
					{isUpdated && <Status />}
					<ProjectCategory
						categories={catergories}
						category_id={category_id}
						setCatogory_Id={setCategory_Id}
					/>
					<div className="flex-center mt-5">
						<label className="w-[20%]">Starting Date </label>
						<input
							name="startingDate"
							value={startingDate}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => setStartingDate(e.target.value)}
							type="date"
							className=" outline-none w-[60%] leading-[40px] px-4 border focus:outline-none "
						/>
					</div>
					<UploadLogo setLogo={setLogo} />
					<UploadPhoto setProjectPhoto={setProjectPhoto} />
					<ProjectInfo
						address={address}
						setAddress={setAddress}
						long={long}
						setLong={setLong}
						lat={lat}
						setLat={setLat}
					/>
					<div className="flex-center justify-center mt-3">
						<Button
							onClick={handleAddProject}
							type="button"
							isLoading={isLoading}
							disabled={isLoading}
							className=" flex-center justify-center rounded-lg px-5 py-2 text-white bg-blue-500 min-w-[10px]"
						>
							Add
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AddProject;