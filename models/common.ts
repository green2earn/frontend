import { NextPage } from "next";
import { AppProps } from "next/app";
import { type } from "os";
import { ReactElement, ReactNode } from "react";
export interface LayoutProps {
	children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
	Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export type GreenPoint = {
	lat: number;
	lng: number;
	count: number;
};

interface Category {
	id: number;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date;
	title: string;
	description: string;
	is_active: boolean;
}

export type ResGreenPoint = {
	status: "Pending" | "Verify" | "OnChain";
	actived_at: Date;
	verified_at: Date;
	onchain_at: Date;
	performance: string;
	logo: string;
	image_url: string;
	website: string;
	phone_number: string;
	brief_description: string;
	detail_description: string;
	other_description: string;
	address: string;
	longitude: number;
	latitude: number;
	reduction_co2: number;
	reduction_co2_actual: number;
	reduction_co2_onchain: number;
	total_token_earned: number;
	id: number;
	count: number;
	name: string;
	category: Category;
};

export interface IMap {
	listGreenPoints: resGreenPoint;
}

export interface IMarker {
	address: any;
	latitude: number;
	longitude: number;
}

export type GoogleLatLng = google.maps.LatLng;
export type GoogleMap = google.maps.Map;
export type GoogleMarker = google.maps.Marker;
export type GooglePolyline = google.maps.Polyline;

export type Location = {
	lat: number;
	lng: number;
};

export interface resGreenPoint {
	solar_all: ResGreenPoint[];
	solar_pending: ResGreenPoint[];
	solar_verify: ResGreenPoint[];
	solar_onchain: ResGreenPoint[];
	wind_all: ResGreenPoint[];
	wind_pending: ResGreenPoint[];
	wind_verify: ResGreenPoint[];
	wind_onchain: ResGreenPoint[];
	shop_all: ResGreenPoint[];
	shop_pending: ResGreenPoint[];
	shop_verify: ResGreenPoint[];
	shop_onchain: ResGreenPoint[];
	charge_all: ResGreenPoint[];
	charge_pending: ResGreenPoint[];
	charge_verify: ResGreenPoint[];
	charge_onchain: ResGreenPoint[];
	factory_all: ResGreenPoint[];
	factory_pending: ResGreenPoint[];
	factory_verify: ResGreenPoint[];
	factory_onchain: ResGreenPoint[];
}

export interface locationsGP {
	solar: GoogleLatLng[];
	wind: GoogleLatLng[];
	shop: GoogleLatLng[];
	charge: GoogleLatLng[];
	factory: GoogleLatLng[];
}

export interface markerGP {
	solar: GoogleMarker[];
	wind: GoogleMarker[];
	shop: GoogleMarker[];
	charge: GoogleMarker[];
	factory: GoogleMarker[];
}
