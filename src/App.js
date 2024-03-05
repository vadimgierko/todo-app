import "./App.css";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";

// contexts:
import { useDarkMode } from "./contexts/useDarkMode";
// components:
import Layout from "./layout";
// pages:
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Lists from "./pages/Lists";
import List from "./pages/List";
import GTD from "./pages/GTD";
// mui:
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// mui themes:
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

// react router routes:
const ROUTES = [
	{
		path: "/",
		element: <About />,
	},
	{
		path: "/gtd-guide",
		element: <GTD />,
	},
	{
		path: "/lists",
		element: <Lists />,
	},
	{
		path: "/lists/:id",
		element: <List />,
	},
	{
		path: "signin",
		element: <SignIn />,
	},
	{
		path: "signup",
		element: <SignUp />,
	},
];

export default function App() {
	const { darkMode, switchMode } = useDarkMode(); // darkMode === false by default
	const routes = useRoutes(ROUTES);

	// DARK MODE:
	useEffect(() => {
		const userPrefersDarkMode = () =>
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		console.log("Does user prefer dark mode?", userPrefersDarkMode());

		if (userPrefersDarkMode()) {
			if (darkMode) return;
			switchMode();
		}
	}, []);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<div className="App">
				<CssBaseline />
				<Layout>{routes}</Layout>
			</div>
		</ThemeProvider>
	);
}
