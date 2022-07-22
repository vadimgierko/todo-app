import { useState } from "react";
// custom components:
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import SideMenu from "./SideMenu/SideMenu";
// mui:
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

export default function Layout({ children }) {
	const [openSideMenu, setOpenSideMenu] = useState(false);

	function toggleSideMenu() {
		setOpenSideMenu(!openSideMenu);
	}

	return (
		<Box
			component="div"
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<CssBaseline />
			<Navbar toggleSideMenu={toggleSideMenu} />
			<SideMenu isOpen={openSideMenu} toggleSideMenu={toggleSideMenu} />
			<Container component="main" maxWidth="sm">
				{/* empty Toolbar to push the content down */}
				<Toolbar />
				{children}
			</Container>
			<Footer />
		</Box>
	);
}
