import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
import Cookies from "cookies";
import jwtDecode from "jwt-decode";
import { UserDecoded } from "@/models/auth";
import { toast } from "react-toastify";

// type Data = {
// 	name: string
// }

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	let cookies = new Cookies(req, res);
	const accessToken = cookies.get("access_token");
	const refreshToken = cookies.get("refresh_token");
	if (accessToken) {
		try {
			const decoded = jwtDecode<UserDecoded>(accessToken);
			const accessTokenExpired =
				Date.now() >= (decoded.exp as number) * 1000;
			if (accessTokenExpired) {
				if (refreshToken) {
					try {
						const decodedRefreshToken =
							jwtDecode<UserDecoded>(refreshToken);

						const refreshTokenExpired =
							Date.now() >=
							(decodedRefreshToken.exp as number) * 1000;
						if (refreshTokenExpired) {
							// res.redirect("/login");
						} else {
							fetch(
								"http://18.190.126.196:3005/api/v1/users/refresh-token",
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										Authorization:
											"Bearer " +
											cookies.get("refresh_token"),
									},
									body: JSON.stringify({}),
								}
							)
								.then(async (response) => {
									const res = await response.json();
									const newAccessToken = res.access_token;
									const newRefreshToken = res.refresh_token;
									cookies.set(
										"access_token",
										newAccessToken,
										{
											secure: true,
											httpOnly: true,
											sameSite: "strict",
										}
									);
									cookies.set(
										"refresh_token",
										newRefreshToken,
										{
											secure: true,
											httpOnly: true,
											sameSite: "strict",
										}
									);
									return newAccessToken;
								})
								.then((response) => {
									return new Promise(async (resolve) => {
										req.headers.Authorization = `Bearer ${response}`;
										req.headers.cookie = "";
										proxy.web(req, res, {
											target: process.env
												.NEXT_PUBLIC_API_URL,
											changeOrigin: true,
											selfHandleResponse: false,
										});
										proxy.once("proxyRes", () => {
											resolve(true);
										});
									});
								})
								.catch((error) => {
									console.log("error:", error);
								});
						}
					} catch (error) {
						console.log("error", error);
					}
				} else {
					toast.error("You are not authorized");
				}
			} else {
				return new Promise(async (resolve) => {
					if (accessToken) {
						req.headers.Authorization = `Bearer ${accessToken}`;
					}
					req.headers.cookie = "";

					proxy.web(req, res, {
						target: process.env.NEXT_PUBLIC_API_URL,
						changeOrigin: true,
						selfHandleResponse: false,
					});

					proxy.once("proxyRes", () => {
						resolve(true);
					});
				});
			}
		} catch (error) {}
	} else {
		// res.redirect("/login");
	}
}
