import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRoutes } from "react-router-dom";
// contexts:
import { useDarkMode } from "./contexts/useDarkMode";
// components:
import Layout from "./components/Layout/Layout";
// pages:
import About from "./pages/About";
import Items from "./pages/Items";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Item from "./pages/Item";
// reducers actions:
import { userSignedIn, userLoggedOut } from "./features/user/userSlice";
import { fetchItems } from "./thunks/fetchItems";
import { resetState } from "./features/items/itemsSlice";
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
		path: "items",
		element: <Items />,
	},
	{
		path: "items/:itemKey",
		element: <Item />,
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
	const { darkMode } = useDarkMode();
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
					dispatch(fetchItems({ reference: "items/" + uid }));
				} else {
					// User is signed out
					dispatch(userLoggedOut());
					dispatch(resetState());
				}
			});
		return unsubscribe();
	}, [dispatch]);

	return (
		<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
			<div className="App">
				<CssBaseline />
				<Layout>{routes}</Layout>
			</div>
		</ThemeProvider>
	);
}
