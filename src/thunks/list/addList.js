import { createAsyncThunk } from "@reduxjs/toolkit";
import { listAdded } from "../../features/lists/listsSlice";
import addItemWithAutoKey from "../../firebase-rtdb-crud/addItemWithAutoKey";

export const addList = createAsyncThunk("lists/add", async (arg, thunkAPI) => {
	console.log("THUNK: adding a todo list...");
	try {
		const key = await addItemWithAutoKey(arg.reference, arg.list);
		console.log("THUNK: todo list added.");
		thunkAPI.dispatch(listAdded({ id: key, list: arg.list }));
	} catch (error) {
		console.log(error);
	}
});
