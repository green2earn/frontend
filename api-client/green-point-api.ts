import { ResGreenPoint } from "@/models/common";
import axiosClient from "./axios-client";

export function createProject(data: any) {
	return axiosClient.post("/projects", data);
}

export function getListGreenPoints() {
	return axiosClient.get("/projects");
}

export function searchGreenPoints(data: any) {
	return axiosClient.get("/projects", { params: data });
}

export function getDetailGreenPoint(id: number) {
	return axiosClient.get<number, any>(`/projects/${id}`);
}
