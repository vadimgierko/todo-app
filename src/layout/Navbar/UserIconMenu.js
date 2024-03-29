import { useState } from "react";
// auth:
import logOut from "../../auth/logOut";
// mui:
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
// mui icons:
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
// custom components:
import UserIconMenuList from "./UserIconMenuList";
import { useStore } from "../../contexts/useStore";

const LINKS = {
	public: [
		{ name: "Sign In", link: "/signin", icon: <LoginIcon /> },
		{ name: "Sign Up", link: "/signup", icon: <LoginIcon /> },
	],
	private: [
		{ name: "Log Out", link: "/", icon: <LogoutIcon />, action: logOut },
	],
};

export default function UserIconMenu() {
	const { store } = useStore();
	const { user } = store;
	const [anchor, setAnchor] = useState(null);

	function handleIconClick(e) {
		setAnchor(e.currentTarget);
	}

	function handleMenuClick() {
		setAnchor(null);
	}

	return (
		<Box>
			<IconButton size="large" color="inherit" onClick={handleIconClick}>
				<AccountCircle />
			</IconButton>
			<Menu open={Boolean(anchor)} anchorEl={anchor} onClose={handleMenuClick}>
				<UserIconMenuList
					listItems={user ? LINKS.private : LINKS.public}
					onClick={handleMenuClick}
				/>
			</Menu>
		</Box>
	);
}
