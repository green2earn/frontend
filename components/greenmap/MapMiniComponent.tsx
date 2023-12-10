import { useEffect } from "react";
import Head from "next/head";


interface propMapMini {
	className: string;
	location: { lat: number | null; lng: number | null };
}

export default function MapMiniComponent(prop: propMapMini) {
	useEffect(() => {
		const mapElement = document.getElementById("map");

		if (!mapElement) {
			console.log("Map element not found");
			return;
		}
		const map = new google.maps.Map(mapElement, {
			// center: { lat: 10.826721289712577, lng: 106.63145566849501 },
			center: {
				lat: prop.location.lat ? prop.location.lat : 10.826721289712577,
				lng: prop.location.lng ? prop.location.lng : 106.63145566849501,
			},
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			streetViewControl: false,
			rotateControl: false,
			scaleControl: false,
			fullscreenControl: false,
			panControl: false,
			zoomControl: false,
			
		}
		)
		
		const marker = new google.maps.Marker({
			// position: { lat: 10.826721289712577, lng: 106.63145566849501 },
			position: {
				lat: prop.location.lat ? prop.location.lat : 10.826721289712577,
				lng: prop.location.lng ? prop.location.lng : 106.63145566849501,
			},
			map: map,
			icon: {
				url: window.location.origin + "/assets/images/icon_marker.svg",
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(48, 48),
			},
		});
	}, []);

	return (
		<div>
			<Head>
				<script
					type="text/javascript"
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API}`}
				/>
			</Head>
			<div
				id="map"
				style={{ height: "200px", width: "100%" }}
				className={prop.className}
			></div>
		</div>
	);
}
