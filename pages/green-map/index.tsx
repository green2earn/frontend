import { GreenMapLayout } from "@/components/layout/GreenMapLayout";
import { loadMapApi } from "@/utils";
import Map from "@/components/greenmap/MapComponent";
import React, { useEffect, useState } from "react";
import { resGreenPoint } from "@/models/common";
import type { GetServerSideProps } from "next";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/stores/store";

export default function GreenMap({
	greenPoints,
}: {
	greenPoints: resGreenPoint;
}) {
	const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const begin = async () => {
			setScriptLoaded(false);
			const googleMapScript = await loadMapApi();
			await googleMapScript.addEventListener("load", function () {
				setScriptLoaded(true);
			});
		};
		if (typeof window !== "undefined") {
			begin();
		}
		return () => {
			setScriptLoaded(false);
		};
	}, []);

	return (
		<div className="static">
			{scriptLoaded ? (
				<Map listGreenPoints={greenPoints} />
			) : (
				<div className="w-full h-[calc(100vh-100px)] flex justify-center items-center translate-y-[-10%]">
					<Loading />
				</div>
			)}
		</div>
	);
}
GreenMap.Layout = GreenMapLayout;

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}api/v1/projects`
	);
	let data = await res.json();
	let greenPoints: resGreenPoint = {
		solar_all: [],
		solar_pending: [],
		solar_verify: [],
		solar_onchain: [],
		wind_all: [],
		wind_pending: [],
		wind_verify: [],
		wind_onchain: [],
		shop_all: [],
		shop_pending: [],
		shop_verify: [],
		shop_onchain: [],
		charge_all: [],
		charge_pending: [],
		charge_verify: [],
		charge_onchain: [],
		factory_all: [],
		factory_pending: [],
		factory_verify: [],
		factory_onchain: [],
	};
	data.map((greenPoint: any) => {
		greenPoint["count"] = 0;
		if (greenPoint["status"] && greenPoint["status"] === "Pending") {
			if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 1
			) {
				greenPoints.solar_pending.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 2
			) {
				greenPoints.wind_pending.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 3
			) {
				greenPoints.shop_pending.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 4
			) {
				greenPoints.charge_pending.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 5
			) {
				greenPoints.factory_pending.push(greenPoint);
			}
		} else if (greenPoint["status"] && greenPoint["status"] === "Verify") {
			if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 1
			) {
				greenPoints.solar_verify.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 2
			) {
				greenPoints.wind_verify.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 3
			) {
				greenPoints.shop_verify.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 4
			) {
				greenPoints.charge_verify.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 5
			) {
				greenPoints.factory_verify.push(greenPoint);
			}
		} else if (greenPoint["status"] && greenPoint["status"] === "OnChain") {
			if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 1
			) {
				greenPoints.solar_onchain.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 2
			) {
				greenPoints.wind_onchain.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 3
			) {
				greenPoints.shop_onchain.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 4
			) {
				greenPoints.charge_onchain.push(greenPoint);
			} else if (
				greenPoint["category"] &&
				greenPoint["category"]["id"] &&
				greenPoint["category"]["id"] === 5
			) {
				greenPoints.factory_onchain.push(greenPoint);
			}
		}
	});
	return {
		props: {
			greenPoints: greenPoints,
		},
	};
};
