import { createAsyncThunk } from "@reduxjs/toolkit";
import deleteItemFromRTDB from "../firebase-rtdb-crud/deleteItem";
import { itemDeleted } from "../features/items/itemsSlice";

// arg: {reference, itemKey}
export const deleteItem = createAsyncThunk(
	"items/fetch",
	async (arg, thunkAPI) => {
		console.log("THUNK: deleting item...");
		try {
			await deleteItemFromRTDB(arg.reference);
			console.log("THUNK: item deleted.");
			thunkAPI.dispatch(itemDeleted({ id: arg.itemKey }));
		} catch (error) {
			console.log(error);
		}
	}
);
