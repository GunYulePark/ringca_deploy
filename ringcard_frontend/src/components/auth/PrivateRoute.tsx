// PrivateRoute.js

import React from "react";

export interface Props {
	authenticated: boolean;
	component: React.ReactElement;
	noAuthComponent: React.ReactElement;
}

function PrivateRoute(props: Props): React.ReactElement | null {
	const authenticated = props.authenticated;
	const component = props.component;
	const noAuthComponent = props.noAuthComponent;
	return authenticated ? component : noAuthComponent;
}

export default PrivateRoute;
