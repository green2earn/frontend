import { EmptyLayout } from "@/components/layout/EmptyLayout";
import { AppPropsWithLayout } from "@/models/common";
import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { persistor, store } from "@/stores/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/Loading";
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import React from "react";
import { alephzeroTestnet, UseInkathonProvider } from "@scio-labs/use-inkathon";
import { getDeployments } from "@/contracts/polkadot/utils/getDeployments";
export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout;

	return (
		<Provider store={store}>
			<UseInkathonProvider
				appName="Green2Earn"
				defaultChain={alephzeroTestnet}
				deployments={getDeployments()}
			>
				<Head>
					<link rel="icon" href="/assets/images/LogoG2E.png" />
				</Head>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<Layout>
						<ScrollToTop />
						<Component {...pageProps} />
						<ToastContainer />
					</Layout>
				</PersistGate>
			</UseInkathonProvider>
		</Provider>
	);
}
