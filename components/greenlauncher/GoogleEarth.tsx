import { useEffect } from "react";

export default function GoogleEarth() {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://www.google.com/earth/enterprise/earth_enterprise_plugin.js?api=${process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API}`;
		script.async = true;
		script.defer = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div
			id="google-earth-container"
			style={{ width: "100%", height: "600px" }}
		></div>
	);
}
