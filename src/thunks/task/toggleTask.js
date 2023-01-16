import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { itemToggled } from "../../features/items/itemsSlice";

export const toggleTask = createAsyncThunk(
	"items/toggleItem",
	async (arg, thunkAPI) => {
		console.log("THUNK: toggling item...");
		try {
			const { uid, completed, taskId: key } = arg;

			const updates = {};
			updates["tasks/" + uid + "/" + key + "/completed"] = completed;

			await update(ref(rtdb), updates);
			console.log("THUNK: task's completed prop updated in tasks.");

			thunkAPI.dispatch(itemToggled({ id: key, completed: completed }));
		} catch (error) {
			console.log(error);
		}
	}
);
