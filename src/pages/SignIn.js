import AuthPage from "../components/templates/AuthPage";
import signIn from "../auth/signIn";

export default function SignIn() {
	return (
		<AuthPage pageTitle="Sign In" submitText="sign in" onSubmit={signIn} />
	);
}
