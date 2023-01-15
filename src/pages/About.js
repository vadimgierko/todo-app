import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const PARAGRAPHS = [
	"This installable web app (SPA/PWA) enables you to manage your todo lists	containing tasks.",
	"The app was built using React, Redux, React Router, MUI, Firebase & deployed with GitHub Pages.",
	"If you're using Google Chrome, You can download the app by clicking “install” icon on the right-hand side of URL. The install icon looks	like an ‘install icon’ symbol inside a computer screen icon, usually to the left of the share this page icon. Install may be accessed by tapping or clicking the install icon.",
];

function Paragraph({ children }) {
	return (
		<Typography paragraph={true} variant="body1">
			{children}
		</Typography>
	);
}

export default function About() {
	return (
		<Box component="div" className="about-page">
			<Typography variant="h4" component="h1" sx={{ my: 2 }}>
				About the app
			</Typography>
			{PARAGRAPHS?.map((p, i) => (
				<Paragraph key={"p" + i}>{p}</Paragraph>
			))}
			<Paragraph>
				Click here to see the{" "}
				<Link href="https://github.com/vadimgierko/todo-app" target="_blank">
					app's repository code on GitHub
				</Link>
				.
			</Paragraph>
		</Box>
	);
}
