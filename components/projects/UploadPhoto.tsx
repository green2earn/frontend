import constants from "@/constants/media";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import { isVideo } from "@/utils/validateAuthForm";
import { FileUploadItem, UploadProgress } from "@/models/media";
import axios from "axios";
import { getPresignedURL } from "@/utils/uploadFile";
import ProgressBar from "../ProgressBar";

interface Iprops {
	setProjectPhoto: Dispatch<SetStateAction<string[]>>;
}

const UploadPhoto = (props: Iprops) => {
	const [videoType, setVideoType] = useState<string>("");
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [preview, setPreview] = useState<string>("");
	const [previewVideo, setPreviewVideo] = useState<string>("");
	const [fileUploadItems, setFileUploadItems] = useState<FileUploadItem[]>(
		[]
	);

	const fileRef = useRef<HTMLInputElement>(null);
	const handleChooseVideoType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();
		setVideoType(e.target.value);
	};
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (!event.target.files) return;
		const file = event.target.files[0];
		if (file?.type.includes("image")) {
			if (file?.size > constants.maxSizeUploadPhoto) {
				toast.error("File can not excced 5MB ");
			} else {
				setPreview(URL.createObjectURL(file));
				const newUploadItems: FileUploadItem = {
					file,
					progress: {
						loaded: 0,
						total: file.size,
						percentCompleted: 0,
					},
					cancelTokenSource: axios.CancelToken.source(),
				};
				setFileUploadItems((prevUploadItems) => [
					...prevUploadItems,
					newUploadItems,
				]);
			}
		}
		if (file?.type.includes("video")) {
			if (file?.size > constants.maxSizeUploadVide) {
				toast.error("File can not excced 500MB ");
			} else {
				setPreviewVideo(URL.createObjectURL(file));
				//setCollectVideo([URL.createObjectURL(file), ...collectVideo])
				const newUploadItems: FileUploadItem = {
					file,
					progress: {
						loaded: 0,
						total: file.size,
						percentCompleted: 0,
					},
					cancelTokenSource: axios.CancelToken.source(),
				};
				setFileUploadItems((prevUploadItems) => [
					...prevUploadItems,
					newUploadItems,
				]);
			}
		}
	};

	useEffect(() => {
		return () => {
			preview && URL.revokeObjectURL(preview);
			previewVideo && URL.revokeObjectURL(previewVideo);
		};
	}, [preview, previewVideo]);

	const handleToggleToUpdatefile = () => {
		fileRef.current?.click();
	};

	const handleDelete = (item: number) => {
		const newMedia = [...fileUploadItems];
		newMedia.splice(item, 1);
		setFileUploadItems(newMedia);
	};
	const handleUploadFileToS3 = async () => {
		setIsUploading(true);
		setIsLoading(true);
		const filesToUpload = fileUploadItems.filter(
			(item) => !item.isDone && !item.isCancelled
		);

		if (filesToUpload.length > 0) {
			for (const fileItem of filesToUpload) {
				const data = await getPresignedURL(fileItem.file);
				try {
					await axios.post(data?.url, data?.formData, {
						cancelToken: fileItem.cancelTokenSource.token,
						onUploadProgress: (progressEvent) => {
							const loaded = progressEvent.loaded;
							const total = progressEvent.total as number;
							const percentCompleted = Math.round(
								(loaded / total) * 100
							);
							setFileUploadItems((prev) =>
								prev.map((item) =>
									item.file === fileItem.file
										? {
												...item,
												progress: {
													loaded,
													total,
													percentCompleted,
												},
										  }
										: item
								)
							);
						},
					});
					const imageURL = `${data?.url}/${data?.fields.key}`;
					props.setProjectPhoto((pre) => [...pre, imageURL]);
					setFileUploadItems((prev) =>
						prev.map((item) =>
							item.file === fileItem.file
								? { ...item, isDone: true }
								: item
						)
					);
				} catch (error) {
					if (axios.isCancel(error)) {
						toast.error(
							`File upload canceled:${fileItem.file.name}`
						);
						setFileUploadItems((prev) =>
							prev.map((item) =>
								item.file === fileItem.file
									? { ...item, isCancelled: true }
									: item
							)
						);
					} else {
						toast.error("Error uploading file");
					}
				} finally {
				}
			}
		} else {
			toast.error("You have no file to upload");
		}
		setIsLoading(false);
	};
	const handleCancel = (file: File) => {
		const uploadItem = fileUploadItems.find(
			(upload) => upload.file === file
		);
		uploadItem?.cancelTokenSource.cancel();
	};

	return (
		<div className="flex mt-7 w-full">
			<h3 className="w-[20%]">Upload Media </h3>
			<div className="w-[60%] border p-3">
				<div>
					<select
						onChange={handleChooseVideoType}
						className="w-full border"
					>
						<option value="">Select file source</option>
						<option value="Upload from your computer">
							Upload from your computer
						</option>
						<option value="External URL">External URL</option>
					</select>
					<span className="text-[#555666] italic text-[12px] mt-1">
						{" "}
						Select your prefred vide type
					</span>
				</div>
				{fileUploadItems.length > 0 && (
					<div className="border">
						<div className="w-full h-[200px]  grid grid-rows-2 grid-cols-4 gap-y-2">
							{fileUploadItems?.map((i, index) => (
								<div
									key={index}
									className="row-span-1 col-span-1  p-1"
								>
									<div className="relative h-full w-full">
										{isVideo(i.file) ? (
											<video
												width="100%"
												height="100%"
												controls
											>
												<source
													src={URL.createObjectURL(
														i.file
													)}
													type="video/mp4"
												/>
											</video>
										) : (
											<img
												src={URL.createObjectURL(
													i.file
												)}
												alt=""
												className="h-full w-full fill object-contain border"
											/>
										)}
										{!isUploading && (
											<svg
												onClick={() =>
													handleDelete(index)
												}
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6 absolute text-red-600 right-0 top-0 cursor-pointer"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										)}
									</div>
									{i.progress.percentCompleted < 100 &&
										i.progress.percentCompleted > 0 && (
											<div className="flex-center  cursor-pointer">
												<ProgressBar
													progress={
														i.progress
															.percentCompleted
													}
												/>
												<span
													onClick={() =>
														handleCancel(i.file)
													}
													className="ml-1 text-red-500 font-bold"
												>
													cancel
												</span>
											</div>
										)}
									{i.isDone && (
										<h6 className="text-center text-green-500">
											Done
										</h6>
									)}
								</div>
							))}
						</div>
						<div className="flex-center justify-center mt-3">
							{}
							<Button
								type="button"
								isLoading={isLoading}
								disabled={isLoading}
								onClick={handleUploadFileToS3}
								className=" flex-center justify-center mb-2 rounded-sm py-2 px-3 text-white bg-blue-500 min-w-[130px]"
							>
								Upload
							</Button>
						</div>
					</div>
				)}
				{videoType === "Upload from your computer" && (
					<div className="flex-center py-6 justify-center border-[2px] border-dotted border-blue-500 bg-white">
						<div className="flex-center flex-col justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-10 h-10 text-blue-500"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
								/>
							</svg>
							<span className="text-[#555666] italic text-[12px] mt-1">
								{" "}
								File format:png,jpeg ...
							</span>
							<input
								ref={fileRef}
								hidden
								accept="audio/*,video/*,image/*"
								type="file"
								onClick={(e) =>
									((e.target as any).value = null)
								}
								onChange={handleFileChange}
							/>
							<h4
								onClick={handleToggleToUpdatefile}
								className="border-[1px] mt-2 cursor-pointer px-3 text-blue-600 py-1 rounded-sm border-blue-500"
							>
								Choose file
							</h4>
						</div>
					</div>
				)}
				{videoType === "External URL" && (
					<div className=" mt-3">
						<input
							className="w-full pl-2 border"
							type="text"
							placeholder={videoType}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadPhoto;
