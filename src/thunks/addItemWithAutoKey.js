import { createAsyncThunk } from "@reduxjs/toolkit";
import addItemWithAutoKeyToRTDB from "../firebase-rtdb-crud/addItemWithAutoKey";
import { itemAdded } from "../features/items/itemsSlice";

export const addItemWithAutoKey = createAsyncThunk(
	"items/add",
	async (arg, thunkAPI) => {
		console.log("THUNK: adding item...");
		try {
			const itemKey = await addItemWithAutoKeyToRTDB(arg.reference, arg.item);
			console.log("THUNK: item added.");
			thunkAPI.dispatch(itemAdded({ id: itemKey, item: arg.item }));
		} catch (error) {
			console.log(error);
		}
	}
);
