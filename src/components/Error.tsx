import { useRouteError } from "react-router-dom";

import "../styles/Error.css";

interface Error {
	statusText?: string;
	message?: string;
}

const Error = () => {
	const error = useRouteError() as Error;
	console.error(error);

	return (
		<div id="error">
			<h1>Ooops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
};

export default Error;
