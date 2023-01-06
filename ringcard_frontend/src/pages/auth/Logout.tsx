import axios from "axios";
import { useEffect } from "react";

function Logout() {
	useEffect(() => {
		axios
			.get("/logout")
			.then((res) => {
				window.location.replace("/loginForm");
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	return <></>;
}

export default Logout;
