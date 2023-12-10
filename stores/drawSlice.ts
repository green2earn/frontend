import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type DrawState = {
	polylines: Array<Array<{ lat: number; lng: number }>>;
	addNewPolyline: boolean;
	currentCoordinatePolyline: Array<{ lat: number; lng: number }>;
	currentEditPolyline: Array<{ lat: number; lng: number }>;
	totalArea: number;
	draw:boolean
};

const initialState: DrawState = {
	polylines: [],
	addNewPolyline: false,
	currentCoordinatePolyline: [],
	currentEditPolyline: [],
	totalArea: 0,
	draw:false
};
type editPolylines = {
	coord: Array<{ lat: number; lng: number }>;
	index: number;
};
type deletePolyline = {
	coord: Array<{ lat: number; lng: number }>;
	index: number;
	area: number;
};

export const drawSlice = createSlice({
	name: "greenLauncher",
	initialState,
	reducers: {
		addPolyline: (
			state,
			actions: PayloadAction<Array<{ lat: number; lng: number }>>
		) => {
			state.polylines.push(actions.payload);
		},
		refreshPolyline: (state) => {
			state.polylines = [];
			state.totalArea = 0;
			state.currentCoordinatePolyline = [];
		},
		deletePolyline: (state, actions: PayloadAction<deletePolyline>) => {
			state.totalArea -= actions.payload.area;
			state.polylines = state.polylines.filter(
				(_, index) => index !== actions.payload.index
			);
			state.currentCoordinatePolyline =
				state.currentCoordinatePolyline.filter(
					(_, index) => index !== actions.payload.index
				);
		},
		editPolylines: (state, actions: PayloadAction<editPolylines>) => {
			const { coord, index } = actions.payload;
			let temp_arr = [...state.polylines];
			temp_arr[index] = coord;
			state.polylines = temp_arr;
		},
		setStartNewPolyline: (state, actions: PayloadAction<boolean>) => {
			state.addNewPolyline = actions.payload;
		},
		setCurrentCoordinatePolyline: (
			state,
			actions: PayloadAction<Array<{ lat: number; lng: number }>>
		) => {
			state.currentCoordinatePolyline = actions.payload;
		},
		setCurrentEditPolyline: (
			state,
			actions: PayloadAction<Array<{ lat: number; lng: number }>>
		) => {
			state.currentEditPolyline = actions.payload;
		},
		setTotalArea(state, actions: PayloadAction<number>) {
			state.totalArea = actions.payload;
		},
		setDraw(state, actions: PayloadAction<boolean>) {
			state.draw = actions.payload
		}
	},
});

export const {
	addPolyline,
	setStartNewPolyline,
	setCurrentCoordinatePolyline,
	setCurrentEditPolyline,
	editPolylines,
	setTotalArea,
	refreshPolyline,
	deletePolyline,
	setDraw
} = drawSlice.actions;
export default drawSlice.reducer;
