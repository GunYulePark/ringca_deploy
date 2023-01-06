import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useCookies } from "react-cookie";
import QuestionAnony from "../../anony/QuestionAnony";

function TwitterLoginProcess() {
	useEffect(() => {
		async function hi() {
			await BtnToTwitterLoginToken();
			await BtnToUserMe();
		}
		hi();
	});

	const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

	type ResponseList = {
		loginFirstTwitter: boolean;
		usernameTwitter: String;
	};
	const [response, setResponse] = useState<ResponseList>({
		loginFirstTwitter: false,
		usernameTwitter: "",
	});

	const { Client, auth } = require("twitter-api-sdk");

	const [accessToken, setAccessToken] = useState();
	const [userMe, setUserMe] = useState<any>([]);

	const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
	const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
	const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
	const ACCESS_TOKEN_SECRET = process.env.REACT_APP_ACCESS_TOKEN_SECRET;
	const CALLBACK_URL = process.env.REACT_APP_CALLBACK_URL;
	const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

	// const TWITTER_STATE = "twitter-increaser-state";
	const TWITTER_STATE = "state";
	const TWITTER_CODE_CHALLENGE = "challenge";
	const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
	const TWITTER_SCOPE = ["tweet.read", "users.read", "tweet.write"].join(" ");
	// const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");

	const [searchParams] = useSearchParams();
	const state = searchParams.get("state");
	const code = searchParams.get("code");

	const authClient = new auth.OAuth2User({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		callback: "http://localhost:3000/login/oauth2/code/twitter",
		scopes: ["tweet.read", "users.read", "tweet.write"],
	});

	const client = new Client(authClient);

	const params = {
		expansions: "author_id",
		"user.fields": ["username", "created_at"],
		"tweet.fields": ["geo", "entities", "context_annotations"],
	};

	function BtnToTwitterLoginToken() {
		const createFormParams = (params: any) => {
			return Object.keys(params)
				.map(
					(key) =>
						`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
				)
				.join("&");
		};

		if (code && CLIENT_ID) {
			const data = qs.stringify({
				code: code,
				grant_type: "authorization_code",
				client_id: CLIENT_ID,
				redirect_uri: "http://localhost:3000/login/oauth2/code/twitter",
				code_verifier: "challenge",
			});

			axios({
				method: "post",
				url: "https://ringca.herokuapp.com/https://api.twitter.com/2/oauth2/token",

				data: data,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}).then((res) => {
				console.log(res);
				console.log(res.data);
				console.log(res.data.access_token);
				setAccessToken(res.data.access_token);

				setCookie(
					"accessToken",
					{ accessToken: res.data.access_token },
					{ path: "/" }
				);
			});
		}
	}

	function BtnToUserMe() {
		console.log("BtnToUserMe start");
		axios({
			method: "get",
			url: "https://ringca.herokuapp.com/https://api.twitter.com/2/users/me",

			headers: {
				Authorization: "Bearer " + accessToken,
			},
		}).then(async (res) => {
			console.log("BtnToUserMe res start");
			console.log(res);
			console.log(res.data.data);
			setUserMe(res.data.data);
			await new Promise((r) => setTimeout(r, 100));
			console.log("BtnToUserMe res after timeout");
			axios
				.post("/login/user/me", res.data.data)
				.then(async (res) => {
					console.log("BtnToUserMe res after timeout after post");
					console.log(res.data.usernameTwitter);

					const data = {
						username: res.data.usernameTwitter,
						password: "twitterTemp",
					};
					await axios
						.post("/login", data, {
							headers: {
								"Content-Type": "multipart/form-data",
							},
						})
						.then((res) => {
							console.log("BtnToUserMe to login");
							console.log(res.data);
							window.location.replace("/home/unanswered");
						})
						.catch(function (error) {
							console.log(error.config);
						});
				})
				.catch(function (error) {
					console.log(error.config);
				});
		});
	}
	return (
		<div className="container">
			<div className="loading-message-box">
				<div className="loading-message-center">
					링카에 로그인 중입니다.
					<br />곧 됩니다. 잠시만 기다려주세요!
				</div>
			</div>
		</div>
	);
}

export default TwitterLoginProcess;
