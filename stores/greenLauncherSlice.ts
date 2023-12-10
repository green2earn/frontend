import { CaculationSummary } from "@/models/greenLauncher";
import { ProductToGreenLauncher } from "./../models/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GreenLauncherState = {
	scriptLoadedForLauncher: boolean;
	activeButtonAddPoint: boolean;
	activeButtonAddProduct: string;
	activeButtonAddInterver: string;
	product: ProductToGreenLauncher;
	inverter: ProductToGreenLauncher;
	results: CaculationSummary;
	isEdited: boolean;
	showInformationPopup: boolean;
	contentInformationPopup: {
		type: "warm_deposit" | "create_token";
		data: {
			required_deposit?: string;
			total_construction_cost?: string;
			title?: string;
			code?: string;
			id?: number;
		};
	} | null;
};

const initialState: GreenLauncherState = {
	scriptLoadedForLauncher: false,
	activeButtonAddPoint: false,
	activeButtonAddProduct: "1",
	activeButtonAddInterver: "1",
	isEdited: false,
	product: {
		id: "1",
		title: "Solar Panel LONGI LR4-72HPH 450M (450W)",
		price: "3650000",
	},
	inverter: {
		id: "1",
		title: "Inverter hòa lưới 3 pha 20kW SENERGY SE 20KTL-D3",
		price: "64000000",
	},
	results: {
		title: "",
		region_id: "",
		typeOfUsingE: {
			title: "",
			id: "",
		},
		launcherType: "",
		roof_type: "",
		area: 0,
		radiant_per_day: 0,
		average_power: 0,
		average_revenue: 0,
		Total_cost: 0,
		payback_time: 0,
	},
	showInformationPopup: false,
	contentInformationPopup: null,
};

export const greenLauncherSlice = createSlice({
	name: "greenLauncher",
	initialState,
	reducers: {
		setScriptLoadedForLauncher: (
			state,
			actions: PayloadAction<boolean>
		) => {
			state.scriptLoadedForLauncher = actions.payload;
		},
		setActiveButtonAddPointForGreenLauncher: (state) => {
			state.activeButtonAddPoint = !state.activeButtonAddPoint;
		},
		setActiveButtonAddProductToGreenLauncher: (
			state,
			actions: PayloadAction<ProductToGreenLauncher>
		) => {
			(state.product = {
				id: actions.payload.id,
				title: actions.payload.title,
				price: actions.payload.price,
			}),
				(state.activeButtonAddProduct = actions.payload.id);
		},
		setActiveButtonAddInterverToGreenLauncher: (
			state,
			actions: PayloadAction<ProductToGreenLauncher>
		) => {
			(state.inverter = {
				id: actions.payload.id,
				title: actions.payload.title,
				price: actions.payload.price,
			}),
				(state.activeButtonAddInterver = actions.payload.id);
		},
		setToggleIsEdited: (state, actions: PayloadAction<boolean>) => {
			state.isEdited = actions.payload;
		},
		showResults: (state, actions: PayloadAction<CaculationSummary>) => {
			state.results = {
				title: actions.payload.title,
				region_id: actions.payload.region_id,
				typeOfUsingE: {
					title: actions.payload.typeOfUsingE.title,
					id: actions.payload.typeOfUsingE.id,
				},
				roof_type: actions.payload.roof_type,
				launcherType: actions.payload.launcherType,
				area: actions.payload.area,
				radiant_per_day: actions.payload.radiant_per_day,
				average_power: actions.payload.average_power,
				average_revenue: actions.payload.average_revenue,
				Total_cost: actions.payload.Total_cost,
				payback_time: actions.payload.payback_time,
			};
		},
		setShowInformationPopup: (state, actions: PayloadAction<boolean>) => {
			state.showInformationPopup = actions.payload;
		},
		setContentInformationPopup: (
			state,
			actions: PayloadAction<{
				type: "warm_deposit" | "create_token";
				data: {
					required_deposit?: string;
					total_construction_cost?: string;
					title?: string;
					code?: string;
					id?: number;
				};
			} | null>
		) => {
			state.contentInformationPopup = actions.payload;
		},
		refreshState: (state) => {
			state = initialState;
		},
	},
});

export const {
	setScriptLoadedForLauncher,
	setToggleIsEdited,
	setActiveButtonAddPointForGreenLauncher,
	setActiveButtonAddProductToGreenLauncher,
	setActiveButtonAddInterverToGreenLauncher,
	showResults,
	setShowInformationPopup,
	setContentInformationPopup,
	refreshState,
} = greenLauncherSlice.actions;
export default greenLauncherSlice.reducer;
