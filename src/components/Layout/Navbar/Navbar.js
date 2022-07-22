import { useSelector } from "react-redux";
// contexts:
import { useDarkMode } from "../../../contexts/useDarkMode";
// custom components:
import UserIconMenu from "./UserIconMenu";
// mui:
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Typography from "@mui/material/Typography";

export default function Navbar({ toggleSideMenu }) {
	const { darkMode, switchMode } = useDarkMode();
	const user = useSelector((state) => state.user.value);

	return (
		<AppBar position="fixed" component="header" color="grey">
			<Container maxWidth="sm" disableGutters={true}>
				<Toolbar component="nav">
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={toggleSideMenu}
					>
						<MenuIcon />
					</IconButton>
					{/* <Typography variant="h6">Redux MUI Todo App</Typography> */}
					{/* empty box to push what's next to the right */}
					<Box sx={{ flexGrow: 1 }}></Box>
					<Typography component="span" variant="body1" sx={{ mr: 1 }}>
						{user.email}
					</Typography>
					<UserIconMenu />
					<IconButton size="large" color="inherit" onClick={switchMode}>
						{darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
					</IconButton>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
