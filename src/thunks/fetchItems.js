import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItemsFromRTDB from "../firebase-rtdb-crud/fetchItems";
import {
	startPending,
	stopPending,
	itemsFetched,
} from "../features/items/itemsSlice";

export const fetchItems = createAsyncThunk(
	"items/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const items = await fetchItemsFromRTDB(arg.reference);
			console.log("THUNK: pending is over. Data fetched:", items);
			if (items) {
				thunkAPI.dispatch(itemsFetched(items));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
