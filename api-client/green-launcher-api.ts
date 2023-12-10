import { CreateGreenLauncher, SolarSetup } from "./../models/greenLauncher";
import {
	FormOfUsingElectricityResponse,
	LauncherTypeResponse,
	SolarRadiationResponse,
} from "@/models/greenLauncher";
import axiosClient from "./axios-client";

export const greenLauncherApi = {
	getFormOfUsingElectricity() {
		return axiosClient.get<FormOfUsingElectricityResponse[] | []>(
			"http://18.190.126.196:3005/api/v1/form-of-electricity-use"
		);
	},
	getLauncherType() {
		return axiosClient.get<LauncherTypeResponse[] | []>(
			"http://18.190.126.196:3005/api/v1/launcher-type"
		);
	},
	getAllProject() {
		return axiosClient.get<SolarSetup[] | []>("/launcher-project");
	},
	getSolarRadiation(region: string) {
		return axiosClient.get<SolarRadiationResponse[] | []>(
			`http://18.190.126.196:3005/api/v1/solar-radiation/region/${region}`
		);
	},
	createGreenLauncher(data: CreateGreenLauncher) {
		return axiosClient.post<any>("/launcher-project", data);
	},
};
