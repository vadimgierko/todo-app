import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { DarkModeProvider } from "./contexts/useDarkMode";

const root = ReactDOM.createRoot(document.getElementById("root"));

// React.StrictMode is off to prevent the double fetching data from database in dev mode.
// Uncomment this code when build.

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(
	<HashRouter>
		<DarkModeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</DarkModeProvider>
	</HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
