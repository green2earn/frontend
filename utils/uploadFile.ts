import { uploadFileToBE } from "@/api-client/file-api";
import { toast } from "react-toastify";

export const getPresignedURL = async (file: File) => {
	try {
		const { data } = await uploadFileToBE(file.name, file.size, file.type);
		const { url, fields } = data;
		const formData = new FormData();
		Object.keys(data.fields).forEach((key) => {
			formData.append(key, fields[key]);
		});

		formData.append("file", file);
		return { formData, url, fields };
	} catch (error) {
		toast.error("Error getting presigned URL");
		return null;
	}
};
