import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { listTitleUpdated } from "../../features/lists/listsSlice";

export const updateListTitle = createAsyncThunk(
	"lists/update",
	async (arg, thunkAPI) => {
		console.log("THUNK: updating list title...");
		try {
			const { uid, title, listId: key } = arg;
			const updates = {};
			updates["lists/" + uid + "/" + key + "/title"] = title;

			await update(ref(rtdb), updates);
			console.log("THUNK: list's title updated in lists.");
			thunkAPI.dispatch(listTitleUpdated({ id: key, title: title }));
		} catch (error) {
			console.log(error);
		}
	}
);
