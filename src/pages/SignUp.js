import AuthPage from "../components/templates/AuthPage";
import signUp from "../auth/signUp";

export default function SignUp() {
	return (
		<AuthPage pageTitle="Sign Up" submitText="sign up" onSubmit={signUp} />
	);
}
