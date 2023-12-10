import React, { useEffect, useRef, useState } from "react";
import {
	IMap,
	IMarker,
	GoogleMarker,
	GoogleMap,
	GoogleLatLng,
	Location,
	locationsGP,
	markerGP,
} from "../../models/common";
import {
	popupAddGreenPoint,
	setLocation,
	setIdInfoGP,
	popupInfoGreenPoint,
	setActiveButton,
	setActiveButtonAddPoint,
	setMapComponent,
	setMapState,
} from "@/stores/greenMapSlice";
import { useAppDispatch, RootState } from "@/stores/store";
import ReactDOM from "react-dom";
import InformationGreenPoint from "../InformationGreenPoint";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ButtonOptionalStatus from "./ButtonOptionalStatus";
import { store } from "@/stores/store";
import { Provider } from "react-redux";
import ButtonActiveTypeGreenPoint from "./ButtonActiveTypeGreenPoint";
import ButtonAddGreenPoint from "./ButtonAddGreenPoint";
import SearchComponentGreenMap from "./SearchComponentGreenMap";
import ButtonTypeControlOptions from "./ButtonTypeControlOptions";

const Map: React.FC<IMap> = ({ listGreenPoints }) => {
	const {
		resultCreateGreenPoint,
		activeButtonSolar,
		activeButtonWind,
		activeButtonShop,
		activeButtonCharge,
		activeButtonFactory,
		activeButtonAddPoint,
		idInfoGP,
		isPopupInfoGreenPoint,
	} = useSelector((state: RootState) => state.map);
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLDivElement>(null);
	const [map, setMap] = useState<GoogleMap>();
	const [markers, setMarkers] = useState<GoogleMarker[]>([]);
	const [homeLocation, setHomeLocation] = useState<Location>();
	const [currentLocation, setCurrentLocation] = useState<Location>();
	const [clickListener, setClickListener] = useState<any>(null);
	const [addedMarker, setAddedMarker] = useState<IMarker>();
	const [dataAddedMarker, setDataAddedMarker] = useState<GoogleMarker>();
	const [markerClusterSolar, setMarkerClusterSolar] = useState<any>();
	const [markerClusterWind, setMarkerClusterWind] = useState<any>();
	const [markerClusterShop, setMarkerClusterShop] = useState<any>();
	const [markerClusterCharge, setMarkerClusterCharge] = useState<any>();
	const [markerClusterFactory, setMarkerClusterFactory] = useState<any>();
	const [
		showDropdownButtonOptionalStatus,
		setShowDropdownButtonOptionalStatus,
	] = useState<boolean>(false);
	const [contentButtonOptionalStatus, setContentButtonOptionalStatus] =
		useState<"NoContent" | "Pending" | "Verify" | "Onchain">("NoContent");
	const [flagLoadButtonOptionStatus, setFlagLoadButtonOptionStatus] =
		useState<boolean>(false);
	const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>(
		new google.maps.InfoWindow({ maxWidth: 260 })
	);
	const zoomDefault = 11;

	//setup các button và các tính năng khởi tạo cho map
	const startMap = (): void => {
		if (!map) {
			defaultMapStart();
		} else {
			map.addListener("center_changed", () => {
				let lat = map.getCenter()?.lat();
				let lng = map.getCenter()?.lng();
				let zoom = map.getZoom();
				if (lat && lng && zoom) {
					dispatch(
						setMapState({
							center_lat: lat,
							center_lng: lng,
							zoom: zoom,
						})
					);
				}
			});
			dispatch(setMapComponent(map));
			const rendererSolar = {
				render: ({ count, position }: { count: any; position: any }) =>
					new google.maps.Marker({
						label: {
							text: String(count),
							color: "white",
							fontSize: "10px",
							className: "marker-position",
						},
						icon: {
							url: `/assets/images/icon_solar.svg`,
							scaledSize: new google.maps.Size(45, 45),
						},
						position,
						// adjust zIndex to be above other markers
						zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
					}),
			};

			const rendererWind = {
				render: ({ count, position }: { count: any; position: any }) =>
					new google.maps.Marker({
						label: {
							text: String(count),
							color: "white",
							fontSize: "10px",
							className: "marker-position",
						},
						icon: {
							url: `/assets/images/icon_wind.svg`,
							scaledSize: new google.maps.Size(45, 45),
						},
						position,
						// adjust zIndex to be above other markers
						zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
					}),
			};
			const rendererShop = {
				render: ({ count, position }: { count: any; position: any }) =>
					new google.maps.Marker({
						label: {
							text: String(count),
							color: "white",
							fontSize: "10px",
							className: "marker-position",
						},
						icon: {
							url: `/assets/images/icon_shop.svg`,
							scaledSize: new google.maps.Size(45, 45),
						},
						position,
						// adjust zIndex to be above other markers
						zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
					}),
			};
			const rendererCharge = {
				render: ({ count, position }: { count: any; position: any }) =>
					new google.maps.Marker({
						label: {
							text: String(count),
							color: "white",
							fontSize: "10px",
							className: "marker-position",
						},
						icon: {
							url: `/assets/images/icon_charge.svg`,
							scaledSize: new google.maps.Size(45, 45),
						},
						position,
						// adjust zIndex to be above other markers
						zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
					}),
			};
			const rendererFactory = {
				render: ({ count, position }: { count: any; position: any }) =>
					new google.maps.Marker({
						label: {
							text: String(count),
							color: "white",
							fontSize: "10px",
							className: "marker-position",
						},
						icon: {
							url: `/assets/images/icon_factory.svg`,
							scaledSize: new google.maps.Size(45, 45),
						},
						position,
						// adjust zIndex to be above other markers
						zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
					}),
			};

			const markerClusterSolar = new MarkerClusterer({
				map: map,
				markers: [],
				renderer: rendererSolar,
			});
			setMarkerClusterSolar(markerClusterSolar);
			const markerClusterWind = new MarkerClusterer({
				map: map,
				markers: [],
				renderer: rendererWind,
			});
			setMarkerClusterWind(markerClusterWind);
			const markerClusterShop = new MarkerClusterer({
				map: map,
				markers: [],
				renderer: rendererShop,
			});
			setMarkerClusterShop(markerClusterShop);
			const markerClusterCharge = new MarkerClusterer({
				map: map,
				markers: [],
				renderer: rendererCharge,
			});
			setMarkerClusterCharge(markerClusterCharge);
			const markerClusterFactory = new MarkerClusterer({
				map: map,
				markers: [],
				renderer: rendererFactory,
			});
			setMarkerClusterFactory(markerClusterFactory);

			// const div_info_green_point = document.createElement("div");
			const div_search = document.createElement("div");
			const div_button_solar = document.createElement("div");
			const div_button_wind = document.createElement("div");
			const div_button_shop = document.createElement("div");
			const div_button_charge = document.createElement("div");
			const div_button_factory = document.createElement("div");

			const controlPositionTopLeft = google.maps.ControlPosition.TOP_LEFT;
			// map.controls[controlPositionTopLeft].push(div_info_green_point);
			map.controls[controlPositionTopLeft].push(div_search);
			map.controls[controlPositionTopLeft].push(div_button_solar);
			map.controls[controlPositionTopLeft].push(div_button_wind);
			map.controls[controlPositionTopLeft].push(div_button_shop);
			map.controls[controlPositionTopLeft].push(div_button_charge);
			map.controls[controlPositionTopLeft].push(div_button_factory);

			// ReactDOM.render(
			// 	<Provider store={store}>
			// 		<InformationGreenPoint />
			// 	</Provider>,
			// 	div_info_green_point
			// );
			ReactDOM.render(
				<Provider store={store}>
					<SearchComponentGreenMap />
				</Provider>,
				div_search
			);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonActiveTypeGreenPoint typeGP="solar" />
				</Provider>,
				div_button_solar
			);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonActiveTypeGreenPoint typeGP="wind" />
				</Provider>,
				div_button_wind
			);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonActiveTypeGreenPoint typeGP="shop" />
				</Provider>,
				div_button_shop
			);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonActiveTypeGreenPoint typeGP="charge" />
				</Provider>,
				div_button_charge
			);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonActiveTypeGreenPoint typeGP="factory" />
				</Provider>,
				div_button_factory
			);
			const divOptionalStatus = document.createElement("div");
			divOptionalStatus.classList.add("button-green-map-optinal-status");
			map.controls[controlPositionTopLeft].push(divOptionalStatus);
			setFlagLoadButtonOptionStatus((preState) => !preState);
			dispatch(setActiveButtonAddPoint());

			const controlPositionBottomLeft =
				google.maps.ControlPosition.BOTTOM_LEFT;
			const divTypeControl = document.createElement("div");
			// divTypeControl.classList.add("custom_Div_Type_Control");
			map.controls[controlPositionBottomLeft].push(divTypeControl);
			ReactDOM.render(
				<Provider store={store}>
					<ButtonTypeControlOptions />
				</Provider>,
				divTypeControl
			);
		}
	};

	const loadButtonOptionStatus = () => {
		const controlPositionTopLeft = google.maps.ControlPosition.TOP_LEFT;
		if (map) {
			const divOptionalStatus = map.controls[
				controlPositionTopLeft
			].getAt(map.controls[controlPositionTopLeft].getLength() - 1);
			if (divOptionalStatus) {
				ReactDOM.render(
					<ButtonOptionalStatus
						setShowDropdown={setShowDropdownButtonOptionalStatus}
						showDropdown={showDropdownButtonOptionalStatus}
						contentButton={contentButtonOptionalStatus}
						setContentButton={setContentButtonOptionalStatus}
					/>,
					divOptionalStatus
				);
			}
			let coordinates: locationsGP = {
				solar: [],
				wind: [],
				shop: [],
				charge: [],
				factory: [],
			};
			if (contentButtonOptionalStatus === "Verify") {
				if (
					!activeButtonSolar &&
					!activeButtonWind &&
					!activeButtonShop &&
					!activeButtonCharge &&
					!activeButtonFactory
				) {
					listGreenPoints.solar_verify.map((coordinate) => {
						coordinates.solar.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.wind_verify.map((coordinate) => {
						coordinates.wind.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.shop_verify.map((coordinate) => {
						coordinates.shop.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.charge_verify.map((coordinate) => {
						coordinates.charge.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.factory_verify.map((coordinate) => {
						coordinates.factory.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
				} else {
					activeButtonSolar &&
						listGreenPoints.solar_verify.map((coordinate) => {
							coordinates.solar.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonWind &&
						listGreenPoints.wind_verify.map((coordinate) => {
							coordinates.wind.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonShop &&
						listGreenPoints.shop_verify.map((coordinate) => {
							coordinates.shop.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonCharge &&
						listGreenPoints.charge_verify.map((coordinate) => {
							coordinates.charge.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonFactory &&
						listGreenPoints.factory_verify.map((coordinate) => {
							coordinates.factory.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
				}
			} else if (contentButtonOptionalStatus === "Onchain") {
				if (
					!activeButtonSolar &&
					!activeButtonWind &&
					!activeButtonShop &&
					!activeButtonCharge &&
					!activeButtonFactory
				) {
					listGreenPoints.solar_onchain.map((coordinate) => {
						coordinates.solar.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.wind_onchain.map((coordinate) => {
						coordinates.wind.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.shop_onchain.map((coordinate) => {
						coordinates.shop.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.charge_onchain.map((coordinate) => {
						coordinates.charge.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.factory_onchain.map((coordinate) => {
						coordinates.factory.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
				} else {
					activeButtonSolar &&
						listGreenPoints.solar_onchain.map((coordinate) => {
							coordinates.solar.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonWind &&
						listGreenPoints.wind_onchain.map((coordinate) => {
							coordinates.wind.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonShop &&
						listGreenPoints.shop_onchain.map((coordinate) => {
							coordinates.shop.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonCharge &&
						listGreenPoints.charge_onchain.map((coordinate) => {
							coordinates.charge.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonFactory &&
						listGreenPoints.factory_onchain.map((coordinate) => {
							coordinates.factory.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
				}
			} else {
				if (
					!activeButtonSolar &&
					!activeButtonWind &&
					!activeButtonShop &&
					!activeButtonCharge &&
					!activeButtonFactory
				) {
					listGreenPoints.solar_pending.map((coordinate) => {
						coordinates.solar.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.wind_pending.map((coordinate) => {
						coordinates.wind.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.shop_pending.map((coordinate) => {
						coordinates.shop.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.charge_pending.map((coordinate) => {
						coordinates.charge.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
					listGreenPoints.factory_pending.map((coordinate) => {
						coordinates.factory.push(
							new google.maps.LatLng(
								coordinate.latitude,
								coordinate.longitude
							)
						);
					});
				} else {
					activeButtonSolar &&
						listGreenPoints.solar_pending.map((coordinate) => {
							coordinates.solar.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonWind &&
						listGreenPoints.wind_pending.map((coordinate) => {
							coordinates.wind.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonShop &&
						listGreenPoints.shop_pending.map((coordinate) => {
							coordinates.shop.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonCharge &&
						listGreenPoints.charge_pending.map((coordinate) => {
							coordinates.charge.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
					activeButtonFactory &&
						listGreenPoints.factory_pending.map((coordinate) => {
							coordinates.factory.push(
								new google.maps.LatLng(
									coordinate.latitude,
									coordinate.longitude
								)
							);
						});
				}
			}
			addMarkers(coordinates);
		}
	};

	const addMarkers = (locations: locationsGP): void => {
		markerClusterSolar && markerClusterSolar.clearMarkers();
		markerClusterWind && markerClusterWind.clearMarkers();
		markerClusterShop && markerClusterShop.clearMarkers();
		markerClusterCharge && markerClusterCharge.clearMarkers();
		markerClusterFactory && markerClusterFactory.clearMarkers();

		let markerArr: markerGP = {
			solar: [],
			wind: [],
			shop: [],
			charge: [],
			factory: [],
		};
		locations.solar.length > 0 &&
			locations.solar.forEach((location) => {
				const marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: getIconAttributes("solar"),
				});
				markerArr.solar.push(marker);
			});
		locations.wind.length > 0 &&
			locations.wind.forEach((location) => {
				const marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: getIconAttributes("wind"),
				});
				markerArr.wind.push(marker);
			});
		locations.shop.length > 0 &&
			locations.shop.forEach((location) => {
				const marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: getIconAttributes("shop"),
				});
				markerArr.shop.push(marker);
			});
		locations.charge.length > 0 &&
			locations.charge.forEach((location) => {
				const marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: getIconAttributes("charge"),
				});
				markerArr.charge.push(marker);
			});
		locations.factory.length > 0 &&
			locations.factory.forEach((location) => {
				const marker = new google.maps.Marker({
					position: location,
					map: map,
					icon: getIconAttributes("factory"),
				});
				markerArr.factory.push(marker);
			});

		markerClusterSolar.addMarkers(markerArr.solar);
		markerClusterWind.addMarkers(markerArr.wind);
		markerClusterShop.addMarkers(markerArr.shop);
		markerClusterCharge.addMarkers(markerArr.charge);
		markerClusterFactory.addMarkers(markerArr.factory);
		[
			...markerArr.solar,
			...markerArr.wind,
			...markerArr.shop,
			...markerArr.charge,
			...markerArr.factory,
		].forEach((marker) => {
			marker.addListener("click", function () {
				if (map) {
					[
						...listGreenPoints.solar_pending,
						...listGreenPoints.solar_verify,
						...listGreenPoints.solar_onchain,
						...listGreenPoints.wind_pending,
						...listGreenPoints.wind_verify,
						...listGreenPoints.wind_onchain,
						...listGreenPoints.shop_pending,
						...listGreenPoints.shop_verify,
						...listGreenPoints.shop_onchain,
						...listGreenPoints.charge_pending,
						...listGreenPoints.charge_verify,
						...listGreenPoints.charge_onchain,
						...listGreenPoints.factory_pending,
						...listGreenPoints.factory_verify,
						...listGreenPoints.factory_onchain,
					].forEach((point) => {
						if (
							point.latitude == marker.getPosition()?.lat() &&
							point.longitude == marker.getPosition()?.lng()
						) {
							dispatch(setIdInfoGP(point.id));
							return;
						}
					});
					// thông tin green point
					let containerInfomationGreenPoint = null;
					const controlPosition =
						google.maps.ControlPosition.TOP_LEFT;
					const controls = map.controls[controlPosition];

					let tempArray = [];
					if (
						map.controls[
							google.maps.ControlPosition.TOP_LEFT
						].getLength() <= 7
					) {
						dispatch(popupInfoGreenPoint(true));
						while (controls.getLength() > 0) {
							tempArray.push(controls.removeAt(0));
						}
						containerInfomationGreenPoint =
							document.createElement("div");
						containerInfomationGreenPoint &&
							controls.push(containerInfomationGreenPoint);
						for (let i = 0; i < tempArray.length; i++) {
							const element = tempArray[i];
							if (element) {
								controls.push(element);
							}
						}
					} else {
						containerInfomationGreenPoint = controls.getAt(0);
					}

					ReactDOM.render(
						<Provider store={store}>
							<InformationGreenPoint />
						</Provider>,
						containerInfomationGreenPoint
					);

					// sử dụng cho react 18 nhưng hiện tại @types/react và @types/react-dom chưa hỗ trợ React 18 nên chấp nhận warning trên console.log
					// ReactDOM.createRoot(containerInfomationGreenPoint).render(
					// 	<InformationGreenPoint />
					// );
				}
			});
			let tempt_markers = markers;
			tempt_markers.push(marker);
			setMarkers(tempt_markers);
		});
	};

	// hàm lấy địa chỉ hiện tại của user và khởi tạo map (hàm chạy đầu tiên)
	const defaultMapStart = (): void => {
		const defaultAddress = currentLocation
			? new google.maps.LatLng(currentLocation?.lat, currentLocation?.lng)
			: homeLocation
			? new google.maps.LatLng(homeLocation?.lat, homeLocation?.lng)
			: new google.maps.LatLng(10.826721289712577, 106.63145566849501);
		initMap(zoomDefault, defaultAddress);
	};

	// hàm add addedMarker trên google map
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
		const contentInfoWindow = document.createElement("div");
		contentInfoWindow.classList.add("content-info-window");
		const { address_components } = dataMarker.address;
		let titleContentInfoWindow = "";
		if (
			address_components &&
			Array.isArray(address_components) &&
			address_components.length > 2
		) {
			titleContentInfoWindow = address_components[1]?.long_name || "";
		}
		contentInfoWindow.innerHTML =
			`<div style="font-style: normal;
		font-weight: 700;
		font-size: 16px;
		line-height: 19px;
		color: #181818;">${titleContentInfoWindow}</div>` +
			`<div style="font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;">${dataMarker.address?.formatted_address || ""}</div>
		<button id="Add-Points-Info-Window" class="button-green-map-add-points-info-window">
			<div class="flex flex-row items-center font-semibold text-[16px]">
				<span class="mr-[6px]">Add Points</span>
				<img src="/assets/images/add_green_point_icon.svg" alt="" class="ml-[6px]"/>
			</div>
		</button>`;
		infoWindow.setContent(contentInfoWindow);
		infoWindow.open({
			anchor: marker,
			shouldFocus: false,
		});

		google.maps.event.addListener(infoWindow, "domready", () => {
			const button = document.getElementById("Add-Points-Info-Window");
			if (button) {
				button.addEventListener("click", () => {
					const markerPosition = marker.getPosition();
					if (markerPosition) {
						const latitude = markerPosition.lat();
						const longitude = markerPosition.lng();
						dispatch(popupAddGreenPoint());
						dispatch(
							setLocation({
								lat: latitude,
								lng: longitude,
								address: dataMarker.address?.formatted_address,
							})
						);
					}
				});
			}
		});

		let tempt_markers = markers;
		tempt_markers.push(marker);
		setMarkers(tempt_markers);
	};

	// hàm chuyển đổi tọa độ sang địa chỉ và setAddedMarker
	const coordinateToAddressAddGreenPoint = async (
		coordinate: GoogleLatLng
	) => {
		const geocoder = new google.maps.Geocoder();
		await geocoder.geocode(
			{ location: coordinate },
			function (results, status) {
				if (status === "OK" && results) {
					setAddedMarker({
						address: results[0],
						latitude: coordinate.lat(),
						longitude: coordinate.lng(),
					});
				}
			}
		);
	};

	// hàm setup thuộc tính các icon sẽ được hiển thị của các green point
	const getIconAttributes = (
		type: "solar" | "wind" | "shop" | "charge" | "factory"
	) => {
		return {
			url: window.location.origin + `/assets/images/icon_${type}.svg`,
			size: new google.maps.Size(71, 71),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(48, 48),
		};
	};

	// hàm khởi tạo map
	const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
		if (ref.current) {
			setMap(
				new google.maps.Map(ref.current, {
					zoom: zoomLevel,
					minZoom: 5,
					center: address,
					disableDefaultUI: true,
					streetViewControl: true,
					rotateControl: false,
					scaleControl: false,
					fullscreenControl: false,
					panControl: false,
					zoomControl: true,
					gestureHandling: "greedy",
					mapTypeId: "roadmap",
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

	useEffect(loadButtonOptionStatus, [
		flagLoadButtonOptionStatus,
		showDropdownButtonOptionalStatus,
		contentButtonOptionalStatus,
		activeButtonSolar,
		activeButtonWind,
		activeButtonShop,
		activeButtonCharge,
		activeButtonFactory,
		resultCreateGreenPoint,
	]);

	// chạy hàm startMap khi map thay đổi
	useEffect(startMap, [map]);

	// kiểm tra khi nút add point được click thì hàm sẽ đổi con trỏ chuột và thực hiện addEventListen click cho map
	useEffect(() => {
		if (map) {
			if (activeButtonAddPoint) {
				const click = google.maps.event.addListener(
					map,
					"click",
					function (e: any) {
						if (dataAddedMarker) {
							dataAddedMarker.setMap(null);
						}
						if (activeButtonAddPoint) {
							coordinateToAddressAddGreenPoint(e.latLng);
						}
					}
				);
				setClickListener(click);
			} else {
				infoWindow.close();
				dataAddedMarker && dataAddedMarker.setMap(null);
				map.setOptions({
					draggableCursor: "auto",
				});
				const hasClickListener = google.maps.event.hasListeners(
					map,
					"click"
				);
				if (hasClickListener && clickListener) {
					google.maps.event.removeListener(clickListener);
				}
			}
		}
	}, [activeButtonAddPoint, dataAddedMarker]);

	// khi addedMarker có sự thây đổi thì addMarker vào map, marker và addedMarker khác nhau ở chỗ marker là cho những điểm có sẵn lấy tự backend về hiện lên, addedMarker là những điểm đang được tạo trên frontend chưa được gửi xuống backend
	useEffect(() => {
		if (addedMarker) {
			addMarkerInfoWindow(addedMarker);
		}
	}, [addedMarker]);

	useEffect(() => {
		if (idInfoGP === null && map) {
			if (
				map.controls[google.maps.ControlPosition.TOP_LEFT].getLength() >
				7
			) {
				map.controls[google.maps.ControlPosition.TOP_LEFT].removeAt(0);
				dispatch(popupInfoGreenPoint(false));
			}
		}
	}, [idInfoGP]);

	useEffect(() => {
		infoWindow.addListener("closeclick", () => {
			dataAddedMarker && dataAddedMarker.setMap(null);
		});
	}, [dataAddedMarker]);

	return (
		<div className="flex justify-center mt-[2px]">
			<div ref={ref} className="heigh_google_map w-full"></div>
		</div>
	);
};

export default Map;
