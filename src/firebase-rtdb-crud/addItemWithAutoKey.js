import { rtdb } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import generateFirebaseKeyFor from "./generateFirebaseKeyFor";

export default async function addItemWithAutoKey(reference, item) {
	try {
		const newKey = generateFirebaseKeyFor(reference);
		const updatedRef = reference + "/" + newKey;
		await set(ref(rtdb, updatedRef), item);
		//console.log("Item was successfully added to", updatedRef);
		// return item's key, because it's needed in addItemWithAutoKey() thunk:
		return newKey;
	} catch (error) {
		return alert(error.message);
	}
}
