import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	listsFetched,
} from "../../features/lists/listsSlice";

export const fetchLists = createAsyncThunk(
	"lists/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending todo lists...");
		thunkAPI.dispatch(startPending());
		try {
			const lists = await fetchItems(arg.reference);
			console.log("THUNK: pending todo lists is over. Data fetched:", lists);
			if (lists) {
				thunkAPI.dispatch(listsFetched(lists));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
