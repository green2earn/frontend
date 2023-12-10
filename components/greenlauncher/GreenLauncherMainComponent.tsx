import {
	GoogleLatLng,
	GoogleMap,
	GoogleMarker,
	IMarker,
	Location,
} from "@/models/common";
import {
	RootState,
	store,
	useAppDispatch,
	useAppSelector,
} from "@/stores/store";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import PopUp from "./PopUp";
import Dimension from "./Dimension";
import Loading from "../Loading";
import {
	addPolyline,
	editPolylines,
	setTotalArea,
} from "@/stores/drawSlice";
import DisplayStep1 from "./DisplayStep1";
import RoofType from "./RoofType";
interface Iprops {
	mapType: google.maps.MapTypeId;
	mapTypeControl?: boolean;
}
const zoomDefault = 19;

const GreenLauncherMainComponent = ({ mapType, mapTypeControl }: Iprops) => {
	const { polylines, currentEditPolyline, currentCoordinatePolyline } =
		useSelector((state: RootState) => state.draw);
	const greenLauncherMapRef = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<GoogleMap>();
	const [displayStep1, setDisplayStep1] =useState<boolean>(false);
	// const [draw, setDraw] = useState<boolean>(false);
	const [displayProject, setDisplayProject] = useState<boolean>(false);
	const [displaySearchComp, setDisplaySearchComp] = useState<boolean>(true);
	const [homeLocation, setHomeLocation] = useState<Location>();
	const [addedMarker, setAddedMarker] = useState<IMarker>();
	const [setUpSolar, setSetupSolar] = useState<boolean>(false);
	const [dataAddedMarker, setDataAddedMarker] = useState<GoogleMarker>();
	const [showResults, setShowResults] = useState<boolean>(false);
	const{draw} = useAppSelector(state=>state.draw)
	// const [clickListener, setClickListener] = useState<any>(null);
	const{displayRoofType} = useAppSelector(state=>state.activeButton)
	// const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>(
	// 	new google.maps.InfoWindow({ maxWidth: 260 })
	// );
	const{displayMap} = useAppSelector(state=>state.activeButton)
	const [markers, setMarkers] = useState<GoogleMarker[]>([]);
	const dispatch = useAppDispatch();
	const [currentLocation, setCurrentLocation] = useState<Location>();
	const [markerCenterPolygon, setMarkerCenterPolygon] =
		useState<google.maps.Marker | null>(new google.maps.Marker());
	const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
	const [markerCluster, setMarkerCluster] = useState<any>();
	const [flag, setFlag] = useState<boolean>(false);
	const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
		if (greenLauncherMapRef.current) {
			setMap(
				new window.google.maps.Map(greenLauncherMapRef.current, {
					zoom: zoomLevel,
					center: address,
					mapTypeControl: false,
					streetViewControl: true,
					rotateControl: false,
					scaleControl: false,
					fullscreenControl: false,
					panControl: false,
					zoomControl: true,
					gestureHandling: "greedy",
					mapTypeId: mapType,
					draggableCursor: "auto",
					draggingCursor: "pointer",
					styles: [
						{
							featureType: "poi",
							elementType: "labels",
							stylers: [{ visibility: "off" }],
						},
					],
				})
			);
		}
	};
	const defaultMapStart = (): void => {
		const defaultAddress = currentLocation
			? new google.maps.LatLng(currentLocation?.lat, currentLocation?.lng)
			: homeLocation
			? new google.maps.LatLng(homeLocation?.lat, homeLocation?.lng)
			: // : new google.maps.LatLng(10.826721289712577, 106.63145566849501);
			  new google.maps.LatLng(8.644137, 111.919352);

		initMap(zoomDefault, defaultAddress);
	};

	const addMarkerInfoWindow = (dataMarker: IMarker): void => {
		
		const marker: GoogleMarker = new google.maps.Marker({
			    position: new google.maps.LatLng(
				dataMarker.latitude,
				dataMarker.longitude
			),
			map: map,
			icon: {
				url: window.location.origin + "/assets/images/icon_marker.svg",
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(48, 48),
			},
		});
		setDataAddedMarker(marker);
		// const contentInfoWindow = document.createElement("div");
		// contentInfoWindow.classList.add("content-info-window");
		// const { address_components } = dataMarker.address;
		// let titleContentInfoWindow = "";
		// if (
		// 	address_components &&
		// 	Array.isArray(address_components) &&
		// 	address_components.length > 2
		// ) {
		// 	titleContentInfoWindow = address_components[1]?.long_name || "";
		// }
		// contentInfoWindow.innerHTML =
		// 	`<div style="font-style: normal;
		// font-weight: 700;
		// font-size: 16px;
		// line-height: 19px;
		// color: #181818;">${titleContentInfoWindow}</div>` +
		// 	`<div style="font-style: normal;
		// font-weight: 400;
		// font-size: 14px;
		// line-height: 17px;">${dataMarker.address?.formatted_address || ""}</div>`
		// // <button id="Add-Points-Info-Window" class="button-green-map-add-points-info-window">
		// // 	<div class="flex flex-row items-center font-semibold text-[16px]">
		// // 		<span class="mr-[6px]">Add Points</span>
		// // 		<img src="/assets/images/add_green_point_icon.svg" alt="" class="ml-[6px]"/>
		// // 	</div>
		// // </button>;
		// infoWindow.setContent(contentInfoWindow);
		// infoWindow.open({
		// 	anchor: marker,
		// 	shouldFocus: false,
		// });
		// google.maps.event.addListener(infoWindow, "domready", () => {
		// 	const button = document.getElementById("Add-Points-Info-Window");
		// 	if (button) {
		// 		button.addEventListener("click", () => {
		// 			const markerPosition = marker.getPosition();
		// 			if (markerPosition) {
		// 				const latitude = markerPosition.lat();
		// 				const longitude = markerPosition.lng();
		// 				dispatch(popupAddGreenPoint());
		// 				dispatch(
		// 					setLocation({
		// 						lat: latitude,
		// 						lng: longitude,
		// 						address: dataMarker.address?.formatted_address,
		// 					})
		// 				);
		// 			}
		// 		});
		// 	}
		// });

		let tempt_markers = markers;
		tempt_markers.push(marker);
		setMarkers(tempt_markers);
	};
	// const coordinateToAddressAddGreenPoint = async (
	// 	coordinate: GoogleLatLng
	// ) => {
	// 	const geocoder = new google.maps.Geocoder();
	// 	await geocoder.geocode(
	// 		{ location: coordinate },
	// 		function (results, status) {
	// 			if (status === "OK" && results) {
	// 				setAddedMarker({
	// 					address: results[0],
	// 					latitude: coordinate.lat(),
	// 					longitude: coordinate.lng(),
	// 				});
	// 			}
	// 		}
	// 	);
	// };
	let newPolyline = new google.maps.Polyline({
		strokeColor: "#FFB300",
		strokeOpacity: 1.0,
		strokeWeight: 3,
		map: map,
		path: [],
		editable: true, // Cho phép chỉnh sửa các điểm trong currentPolyline
	});
	let editPolyline = new google.maps.Polyline({
		strokeColor: "#FFB300",
		strokeOpacity: 1.0,
		strokeWeight: 3,
		map: map,
		path: [],
		editable: true, // Cho phép chỉnh sửa các điểm trong currentPolyline
	});
	let currentPolygon: google.maps.Polygon | null = new google.maps.Polygon({
		strokeColor: "#FFB300",
		strokeOpacity: 0.8,
		strokeWeight: 3,
		fillColor: "#FFB300",
		fillOpacity: 0.1,
	});
	function updatePolygon(currentPolyline: google.maps.Polyline) {
		// Nếu có ít nhất 3 điểm trong currentPolyline, tạo currentPolygon từ các điểm này
		if (
			currentPolyline &&
			currentPolygon &&
			currentPolyline.getPath().getLength() >= 3
		) {
			// Xóa tất cả các markerCenterPolygon cũ
			// markerCluster?.clearMarkers();
			const path = currentPolyline?.getPath();
			currentPolygon?.setPaths(path);
			map && currentPolygon?.setMap(map);
			//         // Xác định điểm trung tâm của Polygon
			const bounds = new google.maps.LatLngBounds();
			currentPolygon?.getPath().forEach((latLng) => {
				bounds.extend(latLng);
			});
			const center = bounds.getCenter();
			// Tạo Marker và đặt vào tọa độ trung tâm của Polygon
			markerCenterPolygon?.setPosition(center);
			map && markerCenterPolygon?.setMap(map);
			markerCenterPolygon?.setLabel({
				text:
					google.maps.geometry.spherical
						.computeArea(currentPolygon.getPath())
						.toFixed(0) + "m2",
				color: "black",
				fontSize: "16px",
				className: "bg-[#FFB300]",
				fontWeight: "bold",
			});
			markerCenterPolygon?.setIcon("/assets/images/a");
			markerCluster?.addMarker(markerCenterPolygon);
		}
	}
	const startNewPolyline = (
		coord: Array<{ lat: number; lng: number }>,
		index: number,
		flagAddNew?: boolean
	) => {
		// Tắt lắng nghe sự kiện click của tất cả các polyline cũ
		map && google.maps.event.clearListeners(map, "click");
		flagAddNew && dispatch(addPolyline(coord));
		coord && editPolyline.setPath(coord);
		map &&
			google.maps.event.addListener(
				map,
				"click",
				(event: google.maps.MapMouseEvent) => {
					editPolyline
						.getPath()
						.push(event.latLng as google.maps.LatLng);
					const coordinates = editPolyline
						.getPath()
						.getArray()
						.map((latLng) => ({
							lat: latLng.lat(),
							lng: latLng.lng(),
						}));
					dispatch(editPolylines({ coord: coordinates, index }));
					updatePolygon(editPolyline);
				}
			);
		google.maps.event.addListener(editPolyline.getPath(), "set_at", () => {
			const coordinates = editPolyline
				.getPath()
				.getArray()
				.map((latLng) => ({
					lat: latLng.lat(),
					lng: latLng.lng(),
				}));
			dispatch(editPolylines({ coord: coordinates, index }));
			updatePolygon(editPolyline);
		});
		google.maps.event.addListener(
			editPolyline.getPath(),
			"insert_at",
			() => {
				const coordinates = editPolyline
					.getPath()
					.getArray()
					.map((latLng) => ({
						lat: latLng.lat(),
						lng: latLng.lng(),
					}));
				dispatch(editPolylines({ coord: coordinates, index }));
				updatePolygon(editPolyline);
			}
		);
		google.maps.event.addListener(
			editPolyline.getPath(),
			"remove_at",
			() => {
				const coordinates = editPolyline
					.getPath()
					.getArray()
					.map((latLng) => ({
						lat: latLng.lat(),
						lng: latLng.lng(),
					}));
				dispatch(editPolylines({ coord: coordinates, index }));
				updatePolygon(editPolyline);
			}
		);
	};

	const startMapForGreenLauncher = () => {
		if (!map) {
			defaultMapStart();
		} else {
			if (displaySearchComp) {
				const div_popup = document.createElement("div");
				const controlPositionLeftCenter =
					google.maps.ControlPosition.LEFT_CENTER;
				map.controls[controlPositionLeftCenter].push(div_popup);
				ReactDOM.render(
					<Provider store={store}>
						<PopUp
							setAddedMaker={setAddedMarker}
							setDisplaySearchComp={setDisplaySearchComp}
							displaySearchComp={displaySearchComp}
							addedMarker={addedMarker}
						/>
					</Provider>,
					div_popup
				);
			
			} else {
			
				// dispatch(setActiveButtonAddPointForGreenLauncher());
				const removeCustomControl = () => {
					const popupNode =
						map?.controls[
							google.maps.ControlPosition.LEFT_CENTER
						].pop();
					if (popupNode && popupNode.parentNode) {
						ReactDOM.unmountComponentAtNode(popupNode);
					} else {
						<Loading />;
					}
					setTimeout(removeCustomControl, 1000);
				};
				// if (displayStep1) {
				const div_displayStep1 = document.createElement("div");
				const controlPositionTopRight =
					google.maps.ControlPosition.TOP_RIGHT;
				div_displayStep1.classList.add("displayStep1");
				map.controls[controlPositionTopRight].push(div_displayStep1);
				ReactDOM.render(
					<Provider store={store}>
						<DisplayStep1  setDisplayStep1={setDisplayStep1} displayStep1={displayStep1} />
					</Provider>,
					div_displayStep1
				);

				const div_displayRoofType = document.createElement("div");
				const controlPositionTopCenter =
					google.maps.ControlPosition.TOP_CENTER;
				div_displayRoofType.classList.add("displayRoofType");
				map.controls[controlPositionTopCenter].push(div_displayRoofType);
				ReactDOM.render(
					<Provider store={store}>
						<RoofType />
					</Provider>,
				div_displayRoofType
				);
				// }
				// if (showResults) {
				// 	const div_results = document.createElement("div");
				// 	const controlPositionLeftCenter =
				// 		google.maps.ControlPosition.LEFT_CENTER;
				// 	div_results.classList.add("result_container");
				// 	map.controls[controlPositionLeftCenter].push(div_results);
				// 	ReactDOM.render(
				// 		<Provider store={store}>
				// 			<FinalResults
				// 				setShowResults={setShowResults}
				// 				setDisplayProject={setDisplayProject}
				// 				setSetupSolar={setSetupSolar}
				// 				setDraw={setDraw}
				// 				addedMarker={addedMarker}
				// 			/>
				// 		</Provider>,
				// 		div_results
				// 	);
			
				// }
			}
	}
		};
		useEffect(() => {
			map && google.maps.event.clearListeners(map, "click");
			// vẽ lại polyline muốn chỉnh sửa
			newPolyline.setPath(currentEditPolyline);
			updatePolygon(newPolyline);
			// Xóa polygon muốn chỉnh sửa (polygon này được vẽ trước đó)
			polygons.length > 0 &&
				polygons.forEach((polygon) => {
					let coord = polygon
						.getPath()
						?.getArray()
						.map((latLng) => ({
							lat: latLng.lat(),
							lng: latLng.lng(),
						}));
					if (
						JSON.stringify(coord) ===
						JSON.stringify(currentEditPolyline)
					) {
						polygon.setMap(null);
					}
				});
			// Tắt lắng nghe sự kiện click của tất cả các polyline cũ
			map && google.maps.event.clearListeners(map, "click");
			map &&
				google.maps.event.addListener(
					map,
					"click",
					(event: google.maps.MapMouseEvent) => {
						// Thêm điểm vào polyline mới nhất
						newPolyline
							.getPath()
							.push(event.latLng as google.maps.LatLng);
						updatePolygon(newPolyline);
					}
				);
			google.maps.event.addListener(newPolyline.getPath(), "set_at", () => {
				updatePolygon(newPolyline);
			});
			google.maps.event.addListener(
				newPolyline.getPath(),
				"insert_at",
				() => {
					updatePolygon(newPolyline);
				}
			);
			google.maps.event.addListener(
				newPolyline.getPath(),
				"remove_at",
				() => {
					updatePolygon(newPolyline);
				}
			);
		}, [currentEditPolyline]);
		useEffect(() => {
			if (polylines.length > 0) {
				// Tính lại totalArea
				let totalArea = 0;
				polylines.forEach((p) => {
					if (p)
						totalArea += parseInt(
							google.maps.geometry.spherical
								?.computeArea(p)
								.toFixed(0)
						);
				});
				dispatch(setTotalArea(totalArea));
				polygons.length > 0 &&
					polygons.forEach((polygon) => {
						// Xóa polygon khỏi bản đồ
						polygon.setMap(null);
						polygon.setPath([]);
						polygon.setPaths([]);
					});
				// Xóa danh sách polygons trong state
				setPolygons([]);
				polylines.forEach((coordinate) => {
					let presentPolygon: google.maps.Polygon | null =
						new google.maps.Polygon({
							strokeColor: "#FFB300",
							strokeOpacity: 0.8,
							strokeWeight: 3,
							fillColor: "#FFB300",
							fillOpacity: 0.1,
							paths: coordinate,
						});
					map && presentPolygon?.setMap(map);
					let polygonsTemp = polygons;
					polygonsTemp.push(presentPolygon);
					setPolygons(polygonsTemp);
					// Xác định điểm trung tâm của Polygon
					const bounds = new google.maps.LatLngBounds();
					presentPolygon?.getPath()?.forEach((latLng) => {
						bounds.extend(latLng);
					});
					const center = bounds.getCenter();

					// Tạo Marker và đặt vào tọa độ trung tâm của Polygon
					// let markerCenterPolygon = new google.maps.Marker();
					// markerCenterPolygon?.setPosition(center);
					// map && markerCenterPolygon?.setMap(map);
					// markerCenterPolygon?.setLabel({
					// 	text:
					// 		google.maps.geometry.spherical
					// 			.computeArea(presentPolygon.getPath())
					// 			.toFixed(0) + "m2",
					// 	color: "black",
					// 	fontSize: "16px",
					// 	className: "bg-[#FFB300]",
					// 	fontWeight: "bold",
					// });
					// markerCenterPolygon?.setIcon("/assets/images/a");
					// markerCluster?.addMarker(markerCenterPolygon);
				});
				setFlag(!flag);
			} else {
				polygons.length > 0 &&
					polygons.forEach((polygon) => {
						// Xóa polygon khỏi bản đồ
						polygon.setMap(null);
						polygon.setPath([]);
						polygon.setPaths([]);
					});
				// Xóa danh sách polygons trong state
				setPolygons([]);
				setFlag(!flag);
			}
		}, [polylines]);
		useEffect(() => {
			if (map) {
				if (!draw) {
					const timeout = setTimeout(() => {
						map?.controls[
							google.maps.ControlPosition.TOP_LEFT
						].removeAt(0);
					}, 100);
					return () => clearTimeout(timeout);
				} else {
					if (draw) {
						const div_dimension = document.createElement("div");
						const controlPositionTopLeft =
							google.maps.ControlPosition.TOP_LEFT;
						map.controls[controlPositionTopLeft].push(div_dimension);
						ReactDOM.render(
							<Provider store={store}>
								<Dimension
									addNewButtonClick={startNewPolyline}
									currentPolygon={currentPolygon}
									markerCenterPolygon={markerCenterPolygon}
									setMarkerCenterPolygon={setMarkerCenterPolygon}
									editPolyline={editPolyline}
									flag={flag}
									setFlag={setFlag}
								/>
							</Provider>,
							div_dimension
						);
					}
				}
			}
		}, [draw]);
		useEffect(() => {
			if (!showResults && map) {
				const timeout = setTimeout(() => {
					map?.controls[google.maps.ControlPosition.LEFT_CENTER].removeAt(
						0
					);
				}, 100);
				return () => clearTimeout(timeout);
			}
		}, [showResults]);
		// useEffect(() => {
		// 	if (map) {
		// 		const markerCluster = new MarkerClusterer({
		// 			map: map,
		// 			markers: [],
		// 		});
		// 		setMarkerCluster(markerCluster);
		// 		if (activeButtonAddPoint) {
		// 			const click = google.maps.event.addListener(
		// 				map,
		// 				"click",
		// 				function (e: any) {
		// 					if (dataAddedMarker) {
		// 						dataAddedMarker.setMap(null);
		// 					}
		// 					if (activeButtonAddPoint) {
		// 						coordinateToAddressAddGreenPoint(e.latLng);
		// 					}
		// 				}
		// 			);
		// 			setClickListener(click);
		// 		} else {
		// 			infoWindow.close();
		// 			dataAddedMarker && dataAddedMarker.setMap(null);
		// 			map.setOptions({
		// 				draggableCursor: "auto",
		// 			});
		// 			const hasClickListener = google.maps.event.hasListeners(
		// 				map,
		// 				"click"
		// 			);
		// 			if (hasClickListener && clickListener) {
		// 				google.maps.event.removeListener(clickListener);
		// 			}
		// 		}
		// 	}
		// }, []);
		useEffect(() => {
	  
			if (addedMarker) {
				map?.setCenter(new google.maps.LatLng(
					addedMarker?.latitude as number,
					addedMarker?.longitude
				))
				for (let i: number = 1; i < 20; i++) {
					map?.setZoom(i + 1)
				}
				//map?.setZoom(19)
				map?.setHeading(90)
				map?.setTilt(45)
			}
		}, [addedMarker]);
		useEffect(() => {
			if (greenLauncherMapRef.current) {
				setMap(
					new window.google.maps.Map(greenLauncherMapRef.current, {
						zoom: 19,
						center: new google.maps.LatLng(
							addedMarker?.latitude as number,
							addedMarker?.longitude
						),
						mapTypeControl: false,
						streetViewControl: true,
						rotateControl: false,
						scaleControl: false,
						fullscreenControl: false,
						panControl: false,
						zoomControl: true,
						gestureHandling: "greedy",
						mapTypeId: mapType,
						draggableCursor: "auto",
						draggingCursor: "pointer",
						styles: [
							{
								featureType: "poi",
								elementType: "labels",
								stylers: [{ visibility: "off" }],
							},
						],
					})
				);
			}
		}, []);
		useEffect(() => {
			startMapForGreenLauncher();
		}, [map, displaySearchComp, draw, showResults, displayStep1,displayMap]);
		return (
			<div className="w-screen  flex h-screen ">
				{!displaySearchComp && (
					<div className="flex h-full relative">
						
						{/* <Sidebar
						showResults={showResults}
						setDraw={setDraw}
						draw={draw}
						setSetupSolar={setSetupSolar}
						setDisplaySearchContent={setDisplaySearchContent}
						displaySearchContent={displaySearchContent}
						setDisplayProject={setDisplayProject}
					/> */}

						{/* <SearchBar
						setAddedMaker={setAddedMarker}
						displaySearchContent={displaySearchContent}
						setDisplaySearchContent={setDisplaySearchContent}
					/> */}
						{/* <CreateGreenLauncherProject
						setDraw={setDraw}
						setAddedMaker={setAddedMarker}
						addedMarker={addedMarker}
						setUpSolar={setUpSolar}
						showResults={showResults}
						setShowResults={setShowResults}
						setSetupSolar={setSetupSolar}
						displayProject={displayProject}
						setDisplayProject={setDisplayProject}
					/>
					{isDisplayedPanelList && <SolarPannelList />}
					{isDisplayedInventerlList && <InterverList />} */}
					</div>
				)}

				<div
					ref={greenLauncherMapRef}
					className={`h-full  width-full`}
				>
					{" "}
				</div>
			</div>
		);
	
};

export default GreenLauncherMainComponent;
