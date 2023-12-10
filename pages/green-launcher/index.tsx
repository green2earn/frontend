declare let window: any;
import Loading from "@/components/Loading";
import GreenLauncherMainComponent from "@/components/greenlauncher/GreenLauncherMainComponent";
import { GreenLauncherLayout } from "@/components/layout/GreenLauncherLayout";
import {
	setAddress,
	setDisplayLayout,
	setDisplayMap,
	setDisplayRoofType,
	setDisplayStep1,
	setPropertyType,
	setQuanlity,
} from "@/stores/activeButtonSlice";
import { setDraw } from "@/stores/drawSlice";
import {
	refreshState,
	setShowInformationPopup,
} from "@/stores/greenLauncherSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/stores/store";
import React, { useEffect, useState } from "react";

const GreenLauncher = () => {
	const { scriptLoadedForLauncher } = useAppSelector(
		(state: RootState) => state.greenLauncher
	);
	const dispatch = useAppDispatch();
	const [googleLoaded, setGoogleLoaded] = useState(false);
	const [flag, setFlag] = useState<boolean>(false);
	useEffect(() => {
		dispatch(setDisplayLayout(false));
		dispatch(setDisplayStep1(false));
		dispatch(setAddress(""));
		dispatch(setDisplayRoofType(false));
		dispatch(setDisplayMap(false));
		dispatch(setDraw(false));
		dispatch(setPropertyType(""));
		dispatch(setQuanlity("High-End"));
	});

	useEffect(() => {
		dispatch(setShowInformationPopup(false));
		const loadGoogleMapsScript = (): Promise<void> => {
			return new Promise((resolve, reject) => {
				if (window.google) {
					// Google Maps script is already loaded
					resolve();
				} else {
					// Google Maps script is not yet loaded, create a script element and append it to the document
					const script = document.createElement("script");
					script.src = `https:maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_KEY_GOOGLE_MAP_API}&libraries=geometry,places&language=vi&region=vi&v=quarterly`;
					script.async = true;
					script.defer = true;
					script.onload = () => {
						resolve();
					};
					script.onerror = () => {
						reject(new Error("Failed to load Google Maps script."));
					};
					document.head.appendChild(script);
				}
			});
		};
		loadGoogleMapsScript()
			.then(() => {
				setGoogleLoaded(true);
			})
			.catch((error) => {
				console.error(error);
			});
		setFlag(!flag);
		return () => {
			dispatch(refreshState());
		};
	}, []);

	return (
		<div className="static">
			<>
				{scriptLoadedForLauncher && googleLoaded ? (
					<GreenLauncherMainComponent
						mapType={window.google.maps.MapTypeId.SATELLITE}
						mapTypeControl={false}
					/>
				) : (
					<div className="w-screen h-screen flex-col flex-center justify-center">
						<Loading />
						<span>Loading....</span>
					</div>
				)}
			</>
		</div>
	);
};

export default GreenLauncher;

GreenLauncher.Layout = GreenLauncherLayout;
