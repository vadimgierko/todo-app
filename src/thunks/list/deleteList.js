import { createAsyncThunk } from "@reduxjs/toolkit";
import { rtdb } from "../../firebaseConfig";
import { update, ref } from "firebase/database";
import { listDeleted } from "../../features/lists/listsSlice";
import { deleteTask } from "../task/deleteTask";

// DELETES ALL LIST'S TASKS FROM /TASKS BY TASK ID, THEN
// DELETES LIST FROM /LISTS
export const deleteList = createAsyncThunk(
	"lists/delete",
	async (arg, thunkAPI) => {
		console.log("THUNK: deleting list...");
		try {
			const { uid, list, listId: key } = arg;
			const updates = {};

			if (list.tasks && Object.keys(list.tasks).length) {
				console.log(
					"There are tasks in the list",
					list.title,
					key,
					". Delete those tasks first..."
				);
				await Promise.all(
					Object.keys(list.tasks).map(async (taskId) =>
						thunkAPI.dispatch(
							deleteTask({ uid: uid, taskId: taskId, listId: key })
						)
					)
				)
					.then(async () => {
						console.log(
							"All tasks from list",
							list.title,
							key,
							"were deleted. Delete the list now..."
						);
						updates["lists/" + uid + "/" + key] = null;
						await update(ref(rtdb), updates);
						console.log("THUNK: list", list.title, key, "deleted.");
						thunkAPI.dispatch(listDeleted({ id: key }));
					})
					.catch((error) => console.log(error.message));
			} else {
				console.log(
					"There are NO tasks in the list",
					list.title,
					key,
					". Delete the list now..."
				);
				updates["lists/" + uid + "/" + key] = null;
				await update(ref(rtdb), updates);
				console.log("THUNK: list", list.title, key, "deleted.");
				thunkAPI.dispatch(listDeleted({ id: key }));
			}
		} catch (error) {
			console.log(error);
		}
	}
);
