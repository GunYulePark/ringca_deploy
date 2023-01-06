import "../../../styles/utils/BtnToTwitterLogin.css";

function BtnToTwitterLogin() {
	const { Client, auth } = require("twitter-api-sdk");

	const CONSUMER_KEY = process.env.REACT_APP_CONSUMER_KEY;
	const CONSUMER_SECRET = process.env.REACT_APP_CONSUMER_SECRET;
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
	const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
	const ACCESS_TOKEN_SECRET = process.env.REACT_APP_ACCESS_TOKEN_SECRET;
	const CALLBACK_URL = process.env.REACT_APP_CALLBACK_URL;
	const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

	const authClient = new auth.OAuth2User({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		callback: "http://localhost:3000/login/oauth2/code/twitter",
		scopes: ["tweet.read", "users.read", "tweet.write"],
	});

	const client = new Client(authClient);
	const STATE = "my-state";

	//Get authorization
	const authUrl = authClient.generateAuthURL({
		state: STATE,
		code_challenge: "challenge",
	});

	// const TWITTER_STATE = "twitter-increaser-state";
	const TWITTER_STATE = "state";
	const TWITTER_CODE_CHALLENGE = "challenge";
	const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
	const TWITTER_SCOPE = ["tweet.read", "users.read"].join(" ");
	// const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");

	function handleClick(e: any) {
		const getURLWithQueryParams = (
			baseUrl: string,
			params: Record<string, any>
		) => {
			const query = Object.entries(params)
				.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
				.join("&");

			return `${baseUrl}?${query}`;
		};
		const getTwitterOAuthUrl = (redirectUri: string) =>
			getURLWithQueryParams(TWITTER_AUTH_URL, {
				response_type: "code",
				client_id: CLIENT_ID,
				redirect_uri: redirectUri,
				scope: TWITTER_SCOPE,
				state: TWITTER_STATE,
				code_challenge: TWITTER_CODE_CHALLENGE,
				code_challenge_method: "plain",
			});

		// window.location.href=getTwitterOAuthUrl("http://localhost:3000/login/oauth2/code/twitter");
		window.location.href = authUrl;
	}
	return (
		<button className="BtnToTwitterLogin-btn" onClick={handleClick}>
			<img
				className="BtnToTwitterLogin-btn-img"
				src="/twitter_signin_btn.png"
				alt=""
			/>
		</button>
	);
}

export default BtnToTwitterLogin;
