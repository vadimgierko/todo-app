import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	itemsFetched,
} from "../../features/items/itemsSlice";

export const fetchTasks = createAsyncThunk(
	"items/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: fetching tasks...");
		thunkAPI.dispatch(startPending());
		try {
			const items = await fetchItems(arg.reference);
			console.log("THUNK: pending tasks is over. Data fetched:", items);
			if (items) {
				thunkAPI.dispatch(itemsFetched(items));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
