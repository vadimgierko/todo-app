import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { update, ref } from "firebase/database";
import { itemDeleted } from "../../features/items/itemsSlice";

export const deleteTask = createAsyncThunk(
	"items/delete",
	async (arg, thunkAPI) => {
		console.log("THUNK: deleting item...");
		try {
			const { uid, taskId: key, listId } = arg;
			const updates = {};
			updates["tasks/" + uid + "/" + key] = null;
			updates["lists/" + uid + "/" + listId + "/tasks/" + key] = null;

			await update(ref(rtdb), updates);
			console.log("THUNK: item deleted.");
			thunkAPI.dispatch(itemDeleted({ id: key }));
		} catch (error) {
			console.log(error);
		}
	}
);
