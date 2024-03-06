import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./contexts/useDarkMode";
import { StoreProvider } from "./contexts/useStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

// React.StrictMode is off to prevent the double fetching data from database in dev mode.

root.render(
	<BrowserRouter basename={process.env.PUBLIC_URL}>
		<DarkModeProvider>
			<StoreProvider>
				<App />
			</StoreProvider>
		</DarkModeProvider>
	</BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
