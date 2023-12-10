import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import toggleSlice from "./toggleSlice";
import authSlice from "./authSlice";
import greenMapSlice from "./greenMapSlice";
import greenLauncherSlice from "./greenLauncherSlice";
import activeButtonSlice from "./activeButtonSlice";
import drawSlice from "./drawSlice";
import nearWalletSlice from "./nearWalletSlice";
import greenShopSlice from "./greenShopSlide";
import etherWalletSlice from "./etherWalletSlice";
import polkadotApiSlice from "./polkadotApiSlice";

const persistConfig = {
	key: "root",
	storage: storage,
	blacklist: ["activeButton", "draw"],
};

const reducers = combineReducers({
	toggle: toggleSlice,
	auth: authSlice,
	map: greenMapSlice,
	greenLauncher: greenLauncherSlice,
	activeButton: activeButtonSlice,
	draw: drawSlice,
	nearWallet: nearWalletSlice,
	greenShop: greenShopSlice,
	etherWallet: etherWalletSlice,
	polkadotApi: polkadotApiSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
function createImmerReducer(inboundState: unknown): any {
	throw new Error("Function not implemented.");
}
