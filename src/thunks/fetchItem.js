import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchItemFromRTDB from "../firebase-rtdb-crud/fetchItem";
import {
	startPending,
	stopPending,
	itemFetched,
} from "../features/items/itemsSlice";

// arg = {reference, itemKey}
export const fetchItem = createAsyncThunk(
	"item/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: pending...");
		thunkAPI.dispatch(startPending());
		try {
			const item = await fetchItemFromRTDB(arg.reference);
			console.log("THUNK: pending is over. Data fetched:", item);
			if (item) {
				thunkAPI.dispatch(itemFetched({ id: arg.itemKey, item: item }));
			}
		} catch (error) {
			console.log(error);
		}
		thunkAPI.dispatch(stopPending());
	}
);
