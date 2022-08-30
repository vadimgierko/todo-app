import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";

export default function Footer() {
	return (
		<Container component="footer" maxWidth="sm" sx={{ mt: "auto" }}>
			<Divider />
			<Typography
				variant="body2"
				color="text.secondary"
				sx={{
					textAlign: "center",
					p: 2,
				}}
			>
				{"Copyright © "}
				<Link
					color="inherit"
					underline="hover"
					href="https://github.com/vadimgierko"
					target="_blank"
				>
					Vadim Gierko
				</Link>{" "}
				{new Date().getFullYear()}
			</Typography>
		</Container>
	);
}
