import { rtdb } from "../firebaseConfig";
import { ref, get } from "firebase/database";

export default async function fetchItem(reference) {
	try {
		const snapshot = await get(ref(rtdb, reference));
		if (snapshot.exists()) {
			const data = snapshot.val();
			console.log("DATA WAS FETCHED: ITEM FROM", reference);
			console.log("fetchedItem:", data);
			return data;
		} else {
			console.log("There are no item at", reference);
			return null;
		}
	} catch (error) {
		return alert(error.message);
	}
}
