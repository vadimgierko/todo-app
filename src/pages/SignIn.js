import AuthPage from "../components/templates/AuthPage";
import signIn from "../auth/signIn";

export default function SignIn() {
	return (
		<AuthPage
			className="signin-page"
			pageTitle="Sign In"
			submitText="sign in"
			onSubmit={signIn}
		/>
	);
}
