import constants from "@/constants/media";
import { toast } from "react-toastify";
import * as yup from "yup";

export const schema = yup.object({
	name: yup
		.string()
		.required("Your name is required")
		.min(2, "Username must be at least 2 characters long")
		.max(30, "Username can not exceed 30 characters long"),
	email: yup
		.string()
		.required("Email is required")
		.email("Email format is invalid"),
	password: yup
		.string()
		.required("Password is required")
		.min(5, "Password must be at least 5 characters long."),
	confirm_password: yup
		.string()
		.required("Enter your password is required")
		.oneOf([yup.ref("password")], "Password is not correct"),
});

export type Schema = yup.InferType<typeof schema>;
export const loginSchema = schema.omit(["name", "confirm_password"]);
export type LoginSchema = yup.InferType<typeof loginSchema>;

export const isVideo = (mediaFile: File) => {
	return mediaFile && mediaFile.type.split("/")[0] === "video";
};
