import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRoutes } from "react-router-dom";
// contexts:
import { useDarkMode } from "./contexts/useDarkMode";
// components:
import Layout from "./layout";
// pages:
import About from "./pages/About";
import Items from "./pages/Items";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { fetchItems } from "./thunks/fetchItems";
import { resetState } from "./features/items/itemsSlice";
// mui:
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Lists from "./pages/Lists";
import List from "./pages/List";
import { fetchLists } from "./thunks/lists/fetchLists";

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
	const dispatch = useDispatch();

	const routes = useRoutes(ROUTES);

	// listen to the user logs in & out:
	useEffect(() => {
		const unsubscribe = () =>
			onAuthStateChanged(auth, (user) => {
				if (user) {
					// user is logged in
					const uid = user.uid;
					const email = user.email;
					dispatch(userSignedIn({ email: email, id: uid }));
					//========> UNCOMMENT THIS CODE TO FETCH AFTER APP MOUNTS & USER IS LOGGED:
					dispatch(fetchLists({ reference: "lists/" + uid }));
					//dispatch(fetchItems({ reference: "items/" + uid }));
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetState());
				}
			});
		return unsubscribe();
	}, [dispatch]);

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
