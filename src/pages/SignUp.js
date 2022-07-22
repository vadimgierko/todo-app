import AuthPage from "../components/templates/AuthPage";
import signUp from "../auth/signUp";

export default function SignUp() {
	return (
		<AuthPage
			className="signup-page"
			pageTitle="Sign Up"
			submitText="sign up"
			onSubmit={signUp}
		/>
	);
}
