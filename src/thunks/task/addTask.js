import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { ref, child, push, update } from "firebase/database";
import { itemAdded } from "../../features/items/itemsSlice";

// ADDS A NEW TASK TO TASKS,
// ADDS A NEW TASK ID TO LIST'S TASKS,
// RETURNS A NEW TAKS ID
export const addTask = createAsyncThunk("items/add", async (arg, thunkAPI) => {
	console.log("THUNK: adding task...");
	try {
		const uid = arg.uid;
		const task = arg.task;
		const listId = arg.listId;
		// Get a key for a new task:
		const key = push(child(ref(rtdb), "tasks/" + uid)).key;

		// Write the new task's data simultaneously in the tasks and the user's todo list:
		const updates = {};
		updates["tasks/" + uid + "/" + key] = task;
		updates["lists/" + uid + "/" + listId + "/tasks/" + key] = true;

		await update(ref(rtdb), updates);
		console.log("THUNK: task added to tasks & list's tasks index.");
		thunkAPI.dispatch(itemAdded({ id: key, item: arg.task }));

		return key;
	} catch (error) {
		console.log(error);
	}
});
