export interface FormOfUsingElectricityResponse {
	id: number;
	created_at: string;
	updated_at: string;
	title: string;
	description: string;
}

export interface LauncherTypeResponse {
	id: number;
	created_at: string;
	updated_at: string;
	title: string;
	description: string;
	revenue_per_day: string;
}
export interface CreateGreenLauncher {
	title: string;
	status: string;
	roof_type: number;
	area: number;
	region_id: number;
	points: string;
	category_id: number;
	launcher_type_id: number;
}
export interface SolarRadiationResponse {
	id: number;
	created_at: string;
	updated_at: string;
	region: string;
	min_sunny_hours_of_year: number;
	max_sunny_hours_of_year: number;
	mint_intensity: number;
	max_intensity: number;
	performance: string;
}
export interface CaculationSummary {
	title: string;
	region_id: string;
	typeOfUsingE: {
		title: string;
		id: string;
	};
	launcherType: string;
	area: number;
	roof_type?: string;
	radiant_per_day: number;
	average_power: number;
	average_revenue: number;
	Total_cost: number;
	payback_time: number;
}
 export interface Point {
	lat: number;
	lng: number;
  }
  
  interface User {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	email: string;
	password: string;
	avatar: string | null;
	first_name: string | null;
	last_name: string | null;
	role: string;
	used_memory: string;
  }
  
  interface Category {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	title: string;
	description: string;
	is_active: boolean;
  }
  
  interface LauncherType {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	title: string;
	description: string;
	revenue_per_day: string;
  }
  
  interface LauncherCost {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	title: string;
	description: string | null;
	cost: string;
  }
  
  export interface SolarSetup {
	id: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
	code: string;
	title: string;
	status: string;
	roof_type: number;
	actived_at: string | null;
	verified_at: string | null;
	onchain_at: string | null;
	area: number;
	revenue_per_day: string;
	total_construction_cost: string;
	payback_time: number;
	points: Point[][];
	user: User;
	category: Category;
	launcher_type: LauncherType;
	launcher_costs: LauncherCost[];
	  nverter_cost: LauncherCost; // Assuming each solar setup has one inverter cost
    construction_cost: LauncherCost
  }
  
