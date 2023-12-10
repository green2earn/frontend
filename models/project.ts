export interface CreateProjectPayload {
	status: string;
	name: string;
	actived_at: string;
	logo: string;
	image_url: string[];
	website?: string;
	phone_number?: string;
	brief_description: string;
	detail_description: string;
	other_description: string;
	address: string;
	longtitude: number;
	latitude: number;
	category_id: number;
}
