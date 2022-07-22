import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithGivenKeyToRTDB from "../firebase-rtdb-crud/addItemWithGivenKey";
import { itemAdded } from "../features/items/itemsSlice";

// arg = {reference, item, itemKey}
export const addItemWithGivenKey = createAsyncThunk(
	"items/add",
	async (arg, thunkAPI) => {
		console.log("THUNK: adding item...");
		try {
			await addItemWithGivenKeyToRTDB(arg.reference, arg.item);
			console.log("THUNK: item added.");
			thunkAPI.dispatch(itemAdded({ id: arg.itemKey, item: arg.item }));
		} catch (error) {
			console.log(error);
		}
	}
);
