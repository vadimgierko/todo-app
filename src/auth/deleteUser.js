import { auth } from "../firebaseConfig";
import { deleteUser } from "firebase/auth";

// NOTE: do not use this function, until update to delete all user's data
// check TODO comment inside deleteUserAccount()

export default async function deleteUserAccount() {
	/*
	TODO:
	* all user's data must be deleted before user would be deleted
	* consider forcing user to resign in
	  to prevent not deleting user after deleting all data,
	  because of not recent log
	*/
	const user = auth.currentUser;

	try {
		if (user) {
			await deleteUser(user);
			console.log("User was deleted.");
		} else {
			alert("You need to log in or log in again to delete your user account!");
		}
	} catch (error) {
		return alert(error.message);
	}
}
