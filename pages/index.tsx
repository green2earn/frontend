import { MainLayout } from "@/components/layout/MainLayout";
import { loadMapApi } from "@/utils";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Home from "@/components/home/Home";
import { RootState, useAppDispatch } from "@/stores/store";
import { setScriptLoadedForLauncher } from "@/stores/greenLauncherSlice";
// import { WsProvider, ApiPromise } from "@polkadot/api";
// import { setAccountsPolkadot, setpolkadotApi } from "@/stores/polkadotApiSlice";
import { useSelector } from "react-redux";

export default function HomeMain() {
	const dispatch = useAppDispatch();
	const { api } = useSelector((state: RootState) => state.polkadotApi);
	const [distanceInKm, setDistanceInKm] = useState<number>(-1);
	const [accounts, setAccounts] = useState<any[]>([]);

	// const setupPolkadotAPI = async () => {
	// 	const wsProvider = new WsProvider("ws://127.0.0.1:9944");
	// 	const api = await ApiPromise.create({ provider: wsProvider });
	// 	dispatch(setpolkadotApi(api));
	// };
	// const handleConnectionPolkadot = async () => {
	// 	try {
	// 		if (typeof window !== "undefined") {
	// 			const { web3Enable, web3Accounts } = await import(
	// 				"@polkadot/extension-dapp"
	// 			);
	// 			const extensions = await web3Enable("Green2Earn");
	// 			if (!extensions) {
	// 				throw Error("NO_EXTENSION_FOUND");
	// 			}
	// 			const allAccounts = await web3Accounts();
	// 			console.log("allAccounts", allAccounts);
	// 			dispatch(setAccountsPolkadot(allAccounts));
	// 		}
	// 	} catch (error) {
	// 		console.log("error", error);
	// 	}
	// };

	useEffect(() => {
		// setupPolkadotAPI();
		// handleConnectionPolkadot();
		const googleMapScript = loadMapApi();
		googleMapScript.addEventListener("load", function () {
			dispatch(setScriptLoadedForLauncher(true));
		});
	}, []);
	// useEffect(() => {
	// 	console.log("api", api);
	// 	(async () => {
	// 		const token = await api?.query.assets.metadata(1);
	// 		console.log("token", token?.toHuman());
	// 	})();
	// }, [api]);

	return (
		<div>
			<Head>
				<title>Green2Earn/Home</title>
				<meta name="description" content="Page description" />
				<script
					dangerouslySetInnerHTML={{
						__html: `
                (function(d, t) {
                  var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                  v.onload = function() {
                    window.voiceflow.chat.load({
                      verify: { projectID: "656f08d582132c7842216411" },
                      url: 'https://general-runtime.voiceflow.com/',
                      versionID: 'production'
                    });
                  }
                  v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
                  v.type = "text/javascript";
                  s.parentNode.insertBefore(v, s);
                })(document, 'script');
              `,
					}}
				/>
			</Head>
			<Home />
		</div>
	);
}
HomeMain.Layout = MainLayout;
