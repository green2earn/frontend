import axios from "axios";
import { GreenPoint, ResGreenPoint } from "../models/common";
import * as geolib from "geolib";
export const loadMapApi = () => {
	const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API}&libraries=geometry,places&language=vi&region=vi&v=quarterly`;
	const scripts = document.getElementsByTagName("script");
	// Go through existing script tags, and return google maps api tag when found.
	for (let i = 0; i < scripts.length; i++) {
		if (scripts[i].src.indexOf(mapsURL) === 0) {
			scripts[i].remove();
		}
	}

	const googleMapScript = document.createElement("script");
	googleMapScript.src = mapsURL;
	googleMapScript.async = true;
	googleMapScript.defer = true;
	window.document.body.appendChild(googleMapScript);
	return googleMapScript;
};

export function calculateDistance(coord1: any, coord2: any) {
	// Haversine formula to calculate the distance between two coordinates
	const R = 6371; // Radius of the Earth in kilometers
	const dLat = deg2rad(coord2.lat - coord1.lat);
	const dLng = deg2rad(coord2.longitude - coord1.longitude);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(coord1.lat)) *
			Math.cos(deg2rad(coord2.lat)) *
			Math.sin(dLng / 2) *
			Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance;
}

function deg2rad(degrees: any) {
	return degrees * (Math.PI / 180);
}

export function processCoordinates(coordinates: Array<ResGreenPoint>, l: any) {
	const processedCoordinates: Array<ResGreenPoint> = [];
	let arrTemp = JSON.parse(JSON.stringify(coordinates));

	for (let i = 0; i < arrTemp.length; i++) {
		for (let j = i + 1; j < arrTemp.length; j++) {
			const coord1 = arrTemp[i];
			const coord2 = arrTemp[j];

			const distance = calculateDistance(coord1, coord2);
			if (distance <= l) {
				const midLng = (coord1.longitude + coord2.longitude) / 2;
				const midLat = (coord1.latitude + coord2.latitude) / 2;
				const midCount = coord1.count + coord2.count;

				// Update the coordinates with the midpoint values
				coord1.longitude = midLng;
				coord1.latitude = midLat;
				coord1.count = midCount;

				//remove coord2 in array
				arrTemp.splice(j, 1);
				j -= 1;
			}
		}

		processedCoordinates.push({
			longitude: arrTemp[i].longitude,
			latitude: arrTemp[i].latitude,
			count: arrTemp[i].count,
			...arrTemp,
		});
	}
	return processedCoordinates;
}

export function calculateDistanceFromPixel(
	pixelDistance: number,
	zoom: number
) {
	const circumference = 40075; // Chu vi của Trái Đất (tại bề mặt) - xấp xỉ 40,075 km
	const distance =
		(pixelDistance * circumference) / (256 * Math.pow(2, zoom)) / 1000;
	return distance;
}
export const determineCompass = () => {};
export default function truncate(str: String, n: number) {
	return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
//export const x = geolib.getCompassDirection();
export const coordinateToAddressAddGreenPoint = async ({
	latitude,
	longitude,
}: {
	latitude: number;
	longitude: number;
}): Promise<string | null> => {
	return new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder();
		const latLng = new google.maps.LatLng(latitude, longitude);
		geocoder.geocode({ location: latLng }, function (results, status) {
			if (status === "OK" && results) {
				if (results.length > 0) {
					const addressComponents = results[0].address_components;
					let province = "";

					for (let i = 0; i < addressComponents.length; i++) {
						const component = addressComponents[i];
						const types = component.types;

						if (types.includes("administrative_area_level_1")) {
							province = component.long_name;
							break;
						}
					}

					console.log("Province: " + province);
					resolve(province);
				} else {
					console.log("No results found.");
					resolve(null);
				}
			} else {
				console.log("Geocoder failed due to: " + status);
				reject("Geocoder failed due to: " + status);
			}
		});
	});
};

export const caculationCost = (
	square: number,
	price0FSolaPanel: number,
	roofType: number
) => {
	// Check if the inputs are valid numbers
	if (isNaN(square) || isNaN(price0FSolaPanel)) {
		throw new Error("Invalid input. All arguments must be valid numbers.");
	}

	const commonCost = ((square * 3) / 7) * price0FSolaPanel;
	const inverter = (commonCost * 30) / 100;
	if (roofType == 0) {
		return commonCost + inverter + 500000 * square;
	} else if (roofType == 1) {
		return commonCost + inverter + 600000 * square;
	} else {
		return commonCost + inverter + 550000 * square;
	}
};
export const caculatElectricityOutput = (
	min: number,
	max: number,
	square: number,
	typeOfLauncher: number
) => {
	if (
		isNaN(min) ||
		isNaN(max) ||
		isNaN(square) ||
		isNaN(typeOfLauncher) ||
		min > max
	) {
		throw new Error("Invalid input. All arguments must be valid numbers.");
	}
	const average = (min + max) / 2;
	const E = (square * average) / 7;
	if (typeOfLauncher == 1) {
		return Math.round(E * 1943);
	}
	if (typeOfLauncher == 2) {
		return Math.round(E * 1644);
	}
	if (typeOfLauncher == 3) {
		return Math.round(E * 1783);
	}
};

export const getQueryVariable = (arg: any) => {
	const query = window.location.search.substring(1);
	const vars = query.split("&");

	for (let i = 0; i < vars.length; i++) {
		const pair = vars[i].split("=");
		if (pair[0] == arg) {
			return pair[1];
		}
	}

	return false;
};

export const yearlySolarEnergyProduction = (
	area: number,
	s: number,
	maxSunshineHoursPerYear: number,
	minSunshineHoursPerYear: number,
	panelCapicity: number,
	quanlity: string,
	percent: number
) => {
	const averageSunshineHouursPerYear =
		(minSunshineHoursPerYear + maxSunshineHoursPerYear) / 2;
	const panelCount = Math.round((area * 3) / 7 / 1.3);
	const yearlySolarDraw =
		panelCount * (panelCapicity * averageSunshineHouursPerYear);
	if (quanlity == "High-End") {
		return Math.round(yearlySolarDraw * 0.85 * 0.95 * percent);
	}
	if (quanlity == "Mid-Range") {
		return Math.round(yearlySolarDraw * 0.7 * 0.95 * percent);
	}
	if (quanlity == "Low-End") {
		return Math.round(yearlySolarDraw * 0.6 * 0.95 * percent);
	}
};
export const anualVenue = (
	area: number,
	s: number,
	maxSunshineHoursPerYear: number,
	minSunshineHoursPerYear: number,
	panelCapicity: number,
	quanlity: string,
	percent: number
) => {
	const averageSunshineHouursPerYear =
		(minSunshineHoursPerYear + maxSunshineHoursPerYear) / 2;
	const panelCount = Math.round((area * 3) / 7 / 1.3);
	const yearlySolarDraw =
		panelCount * (panelCapicity * averageSunshineHouursPerYear);
	if (quanlity == "High-End") {
		return Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074 * percent);
	}
	if (quanlity == "Mid-Range") {
		return Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074 * percent);
	}
	if (quanlity == "Low-End") {
		return Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074 * percent);
	}
	return 0;
};
export const installationCostTotal = (
	area: number,
	s: number,
	panelPrice: number,
	rooftype: string,
	percent: number
) => {
	const panelCount = Math.round((area * 3) / 7 / 1.3);
	const panelsCost = panelCount * panelPrice;
	const inverterCost = panelsCost * 0.3;
	if (rooftype == "Metal Roof") {
		const installCost = 20.5 * area;
		return Math.round((panelsCost + installCost + inverterCost) * percent);
	}
	if (rooftype == "Concrete Roof") {
		const installCost = 22.56 * area;
		return Math.round((panelsCost + installCost + inverterCost) * percent);
	}
	if (rooftype == "Mixed Roof") {
		const installCost = 23 * area;
		return Math.round((panelsCost + installCost + inverterCost) * percent);
	}
	if (rooftype == "Tile Roof With Dormer Window") {
		const installCost = 23.5 * area;
		return Math.round((panelsCost + installCost + inverterCost) * percent);
	}
	if (rooftype == "Simple Tile Roof") {
		const installCost = 23 * area;
		return Math.round((panelsCost + installCost + inverterCost) * percent);
	}
	return 0;
};

export const paybackTime = (
	area: number,
	s: number,
	maxSunshineHoursPerYear: number,
	minSunshineHoursPerYear: number,
	panelCapicity: number,
	quanlity: string,
	panelPrice: number,
	rooftype: string,
	percent: number
) => {
	const averageSunshineHouursPerYear =
		(minSunshineHoursPerYear + maxSunshineHoursPerYear) / 2;
	const panelCount = Math.round((area * 3) / 7 / 1.3);
	const yearlySolarDraw = panelCount * (0.55 * averageSunshineHouursPerYear);

	const panelsCost = panelCount * 147;
	const inverterCost = panelsCost * 0.3;
	let cost;
	if (rooftype == "Metal Roof") {
		const installCost = 20.5 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
	if (rooftype == "Concrete Roof") {
		const installCost = 22.56 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = (totalCost / revenue) * 12 * percent);
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
	if (rooftype == "Mixed Roof") {
		const installCost = 23 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = (totalCost / revenue) * 12 * percent);
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
	if (rooftype == "Tile Roof With Dormer Window") {
		const installCost = 23.5 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = (totalCost / revenue) * 12 * percent);
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
	if (rooftype == "Simple Tile Roof") {
		const installCost = 23 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = (totalCost / revenue) * 12 * percent);
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
	if (rooftype == "Others") {
		const installCost = 25 * area;
		const totalCost = Math.round(panelsCost + installCost + inverterCost);
		if (quanlity == "High-End") {
			const revenue = Math.round(yearlySolarDraw * 0.85 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
		if (quanlity == "Mid-Range") {
			const revenue = Math.round(yearlySolarDraw * 0.7 * 0.95 * 0.074);
			return (cost = (totalCost / revenue) * 12 * percent);
		}
		if (quanlity == "Low-End") {
			const revenue = Math.round(yearlySolarDraw * 0.6 * 0.95 * 0.074);
			return (cost = Math.round((totalCost / revenue) * 12 * percent));
		}
	}
};
export function capitalizeWords(input: string): string {
	return input
		.toLowerCase() // Đảm bảo tất cả các ký tự đều viết thường trước
		.replace(/(^|\s)\S/g, (match) => match.toUpperCase()); // Chuyển chữ cái đầu của mỗi từ thành chữ in hoa
}
