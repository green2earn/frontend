import axiosClient from "./axios-client";

export function uploadFileToBE(
	fileName: string,
	fileSize: number,
	fileType: string
) {
	return axiosClient.post("/public-file/get-presigned-url", {
		fileName,
		fileSize,
		fileType,
	});
}
