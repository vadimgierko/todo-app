import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthForm from "../organisms/AuthForm";
// mui:
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Container } from "@mui/system";

export default function AuthPage({
	className,
	pageTitle,
	submitText,
	onSubmit = (userData) => console.log(userData),
}) {
	const user = useSelector((state) => state.user.value);
	const navigate = useNavigate();

	function handleSubmit(e, userData) {
		e.preventDefault();
		onSubmit(userData);
		navigate(submitText === "sign in" ? "/items" : "/");
	}

	useEffect(() => {
		if (user.id) {
			navigate("/items");
		}
	}, [navigate, user.id]);

	return (
		<Container
			className={className}
			component="div"
			maxWidth="sx"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Typography component="h1" variant="h5" sx={{ mt: 8 }}>
				{pageTitle}
			</Typography>
			<AuthForm submitText={submitText} onSubmit={handleSubmit} />
			<AdditionalText
				question={
					submitText === "sign in"
						? "Don't have an account?"
						: "Already have an account?"
				}
				CTA={submitText === "sign in" ? "Sign Up!" : "Sign In!"}
				link={submitText === "sign in" ? "/signup" : "/signin"}
			/>
		</Container>
	);
}

function AdditionalText({ question, CTA, link }) {
	return (
		<Typography variant="body2" element="p" sx={{ my: 2 }}>
			{question}{" "}
			<Link component={RouterLink} to={link}>
				{CTA}
			</Link>
		</Typography>
	);
}
