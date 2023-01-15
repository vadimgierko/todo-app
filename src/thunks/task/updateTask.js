import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { ref, update } from "firebase/database";
import { itemValueUpdated } from "../../features/items/itemsSlice";

export const updateTask = createAsyncThunk(
	"items/update",
	async (arg, thunkAPI) => {
		console.log("THUNK: updating task...");
		try {
			const uid = arg.uid;
			const value = arg.value;
			const key = arg.taskId;

			const updates = {};
			updates["tasks/" + uid + "/" + key + "/value"] = value;

			await update(ref(rtdb), updates);
			console.log("THUNK: task's value updated in tasks.");
			thunkAPI.dispatch(itemValueUpdated({ id: key, value: value }));
		} catch (error) {
			console.log(error);
		}
	}
);
