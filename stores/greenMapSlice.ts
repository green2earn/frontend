import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GoogleMap } from "@/models/common";

type GreenMapState = {
	isPopupAddGreenPoint: boolean;
	isPopupInfoGreenPoint: boolean;
	location: {
		lat: number | null;
		lng: number | null;
		address: string | null;
	};
	resultCreateGreenPoint: string | null;
	idInfoGP: number | null;
	activeButtonSolar: boolean;
	activeButtonWind: boolean;
	activeButtonShop: boolean;
	activeButtonCharge: boolean;
	activeButtonFactory: boolean;
	activeButtonAddPoint: boolean;
	mapComponent: GoogleMap | null;
	mapState: {
		center_lat: number | null;
		center_lng: number | null;
		zoom: number | null;
	};
};

const initialState: GreenMapState = {
	isPopupAddGreenPoint: false,
	isPopupInfoGreenPoint: false,
	location: { lat: null, lng: null, address: null },
	resultCreateGreenPoint: null,
	idInfoGP: null,
	activeButtonSolar: false,
	activeButtonWind: false,
	activeButtonShop: false,
	activeButtonCharge: false,
	activeButtonFactory: false,
	activeButtonAddPoint: false,
	mapComponent: null,
	mapState: {
		center_lat: null,
		center_lng: null,
		zoom: null,
	},
};

export const greenMapSlice = createSlice({
	name: "toggle",
	initialState,
	reducers: {
		popupAddGreenPoint: (state) => {
			state.isPopupAddGreenPoint = !state.isPopupAddGreenPoint;
		},
		popupInfoGreenPoint: (state, actions: PayloadAction<boolean>) => {
			state.isPopupInfoGreenPoint = actions.payload;
		},
		setLocation(
			state,
			actions: PayloadAction<{
				lat: number;
				lng: number;
				address: string;
			}>
		) {
			state.location.lat = actions.payload.lat;
			state.location.lng = actions.payload.lng;
			state.location.address = actions.payload.address;
		},
		setResultCreateGreenPoint: (state, actions: PayloadAction<string>) => {
			state.resultCreateGreenPoint = actions.payload;
		},
		setIdInfoGP: (state, actions: PayloadAction<number | null>) => {
			state.idInfoGP = actions.payload;
		},
		setActiveButton: (
			state,
			actions: PayloadAction<
				"solar" | "wind" | "shop" | "charge" | "factory"
			>
		) => {
			if (actions.payload === "solar") {
				state.activeButtonSolar = !state.activeButtonSolar;
			} else if (actions.payload === "wind") {
				state.activeButtonWind = !state.activeButtonWind;
			} else if (actions.payload === "shop") {
				state.activeButtonShop = !state.activeButtonShop;
			} else if (actions.payload === "charge") {
				state.activeButtonCharge = !state.activeButtonCharge;
			} else if (actions.payload === "factory") {
				state.activeButtonFactory = !state.activeButtonFactory;
			}
		},
		setActiveButtonAddPoint: (state) => {
			state.activeButtonAddPoint = !state.activeButtonAddPoint;
		},
		setMapComponent(state, actions: PayloadAction<GoogleMap>) {
			state.mapComponent = actions.payload;
		},
		setMapState(
			state,
			actions: PayloadAction<{
				center_lat: number;
				center_lng: number;
				zoom: number;
			}>
		) {
			state.mapState = actions.payload;
		},
	},
});

export const {
	popupAddGreenPoint,
	popupInfoGreenPoint,
	setLocation,
	setResultCreateGreenPoint,
	setIdInfoGP,
	setActiveButton,
	setActiveButtonAddPoint,
	setMapComponent,
	setMapState,
} = greenMapSlice.actions;
export default greenMapSlice.reducer;
