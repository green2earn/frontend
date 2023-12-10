import { uploadFileToBE } from "@/api-client/file-api";
import constants from "@/constants/media";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

interface Iprops {
	setLogo: Dispatch<SetStateAction<string>>;
}

const UploadLogo = (props: Iprops) => {
	const [image, setImage] = useState<File>();

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		try {
			if (!event.target.files) return;
			const file = event.target.files[0];
			if (
				file &&
				(file?.size > constants.maxSizeUploadPhoto ||
					!file.type.includes("image"))
			) {
				toast.error(
					"File can not excced 5MB || File support only .png,.jpeg format",
					{ position: "top-center" }
				);
			} else {
				const { data } = await uploadFileToBE(
					file.name,
					file.size,
					file.type
				);
				console.log(data);

				const { url, fields } = data;
				const formData = new FormData();
				Object.keys(data.fields).forEach((key) => {
					formData.append(key, fields[key]);
				});

				formData.append("file", file);

				const response = await axios({
					method: "POST",
					url: url,
					data: formData,
				});
				const eventSource = new EventSource(
					"http://18.190.126.196:3005/api/v1/notifications"
				);
				if (typeof eventSource !== "undefined") {
					console.log("ok");
					eventSource.onmessage = (event) => {
						if (event.data) {
							const imageURL = `${url}/${fields.key}`;
							props.setLogo(imageURL);
							eventSource.close();
						}
					};
				} else {
					toast.error("Upload error");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex mt-7 w-full ">
			<h3 className="w-[20%]">Logo of Project </h3>
			<div className="w-[60%] ">
				<input
					type="file"
					onChange={handleFileChange}
					onClick={(e) => ((e.target as any).value = null)}
				/>
			</div>
		</div>
	);
};

export default UploadLogo;
