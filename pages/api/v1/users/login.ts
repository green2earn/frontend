import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";
import jwtDecode from "jwt-decode";
import { UserDecoded } from "@/models/auth";

type Data = any;

export const config = {
	api: {
		bodyParser: false,
	},
};

const proxy = httpProxy.createProxyServer();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method !== "POST") {
		return res.status(404).json({ message: "method not supported" });
	}
	return new Promise((resolve) => {
		// don't send cookies to API server
		req.headers.cookie = "";

		const handleLoginResponse: ProxyResCallback = (
			proxyRes,
			req: any,
			response: any
		) => {
			let body = "";
			proxyRes.on("data", function (chunk) {
				body += chunk;
			});
			proxyRes.on("end", function () {
				try {
					const data = JSON.parse(body);

					if (data.access_token && data.refresh_token) {
						const user = jwtDecode<UserDecoded>(data.access_token);

						const cookies = new Cookies(req, response, {
							// secure: process.env.NODE_ENV !== 'development',
							secure: false,
						});
						cookies.set("access_token", data.access_token, {
							httpOnly: true,
							sameSite: "lax",
							// expires: new Date(expiredAt),
						});
						cookies.set("refresh_token", data.refresh_token, {
							httpOnly: true,
							sameSite: "lax",
							// expires: new Date(expiredAt),
						});

						(res as NextApiResponse)
							.status(200)
							.json({
								statusCode: 200,
								message: "Login successfully",
								data: user,
							});
					} else {
						(res as NextApiResponse).json({
							statusCode: 422,
							message: "Email or passwors is not correct",
						});
					}
				} catch (error) {
					(res as NextApiResponse)
						.status(500)
						.json({ message: "something went wrong" });
				}

				resolve(true);
			});
		};
		proxy.once("proxyRes", handleLoginResponse);
		proxy.web(req, res, {
			target: process.env.NEXT_PUBLIC_API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		});
	});
}
