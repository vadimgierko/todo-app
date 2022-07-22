import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function About() {
	return (
		<Box component="div" className="about-page">
			<Typography variant="h4" component="h1" sx={{ my: 2 }}>
				About
			</Typography>
			<Typography paragraph={true} variant="body1">
				This is basic <strong>Single Page CRUD App</strong> template starter
				built with <strong>React & Redux (Toolkit)</strong> integrated with{" "}
				<strong>Firebase Realtime Database</strong> with basic routes set with{" "}
				<strong>React Router</strong> &{" "}
				<strong>UI using MaterialUI (MUI)</strong>.
			</Typography>
			<Typography paragraph={true} variant="body1">
				Click here to see the{" "}
				<Link
					href="https://github.com/vadimgierko/react-redux-router-firebase-auth-rtdb-crud-mui-app"
					target="_blank"
				>
					repository code on GitHub
				</Link>
				.
			</Typography>
		</Box>
	);
}
