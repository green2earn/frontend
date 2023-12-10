import { CancelTokenSource } from "axios";

export interface GetPresignedURL {
	fileName: string;
	fileType: string;
	fileSize: string;
}
export interface UploadProgress {
	loaded: number;
	total: number;
	percentCompleted: number;
}
export interface FileUploadItem {
	file: File;
	progress: UploadProgress;
	cancelTokenSource: CancelTokenSource;
	isDone?: boolean;
	isCancelled?: boolean;
}
interface Location {
	lat: number;
	lng: number;
}

interface Viewport {
	northeast: Location;
	southwest: Location;
}

interface Geometry {
	location: Location;
	location_type: string;
	viewport: Viewport;
	bounds?: Viewport;
}
interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

interface Result {
	address_components: AddressComponent[];
	formatted_address: string;
	geometry: Geometry;
	place_id: string;
	types: string[];
}

export interface GeocodeResponse {
	results: Result[];
	status: string;
}
