import { useSelector } from "react-redux";
// auth:
import logOut from "../../../auth/logOut";
// mui components:
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
// mui icons:
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// custom components:
import SideMenuList from "./SideMenuList";

const PAGES_LINKS = {
	public: [{ name: "About", link: "/", icon: <InfoOutlinedIcon /> }],
	private: [
		{ name: "Tasks", link: "/items", icon: <FormatListBulletedIcon /> },
	],
};

const AUTH_LINKS = {
	public: [
		{ name: "Sign In", link: "/signin", icon: <LoginIcon /> },
		{ name: "Sign Up", link: "/signup", icon: <LoginIcon /> },
	],
	private: [
		{ name: "Log Out", link: "/", icon: <LogoutIcon />, action: logOut },
	],
};

export default function SideMenu({ isOpen, toggleSideMenu }) {
	const user = useSelector((state) => state.user.value);

	return (
		<Drawer anchor="left" open={isOpen} onClose={toggleSideMenu}>
			<Box
				onClick={toggleSideMenu}
				onKeyDown={toggleSideMenu}
				sx={{ width: 250 }}
			>
				<Toolbar>
					<Typography variant="h6" component="div">
						Todo App
					</Typography>
				</Toolbar>
				{/* PUBLIC PAGES LINKS */}
				<Divider />
				<SideMenuList listItems={PAGES_LINKS.public} onClick={toggleSideMenu} />
				{/* PRIVATE PAGES LINKS */}
				<Divider />
				{user.id && (
					<SideMenuList
						listItems={PAGES_LINKS.private}
						onClick={toggleSideMenu}
					/>
				)}
				{/* AUTH LINKS */}
				<Divider />
				<SideMenuList
					listItems={user.id ? AUTH_LINKS.private : AUTH_LINKS.public}
					onClick={toggleSideMenu}
				/>
			</Box>
		</Drawer>
	);
}
