import axios from "axios";

// Tạo một hàm async để gửi request tới Geocoding API
export async function geocodeAddress(
	address: string
): Promise<{ lat: number; lng: number } | null> {
	try {
		const response = await axios.get(
			"https://maps.googleapis.com/maps/api/geocode/json",
			{
				params: {
					address: address,
					key: process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API,
					// key: "AIzaSyDzAq4aB-Fc8xCHetUAwrCNR0Nnu28VSag",
				},
			}
		);

		const results = response.data.results;
		if (results.length > 0) {
			const location = results[0].geometry.location;
			const latitude = location.lat;
			const longitude = location.lng;
			return { lat: latitude, lng: longitude };
		} else {
			console.log("Không tìm thấy kết quả.");
			return null;
		}
	} catch (error) {
		console.error("Đã xảy ra lỗi khi gửi request:", error);
		return null;
	}
}
