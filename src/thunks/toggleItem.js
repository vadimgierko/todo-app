import { createAsyncThunk } from "@reduxjs/toolkit";
// to update item value (instead of updating the whole item)
// we still use updateItem() from /firebase-rtdb-crud/updateItem:
import updateItemInRTDB from "../firebase-rtdb-crud/updateItem";
import { itemToggled } from "../features/items/itemsSlice";

// arg = {reference, itemKey, completed}
export const toggleItem = createAsyncThunk(
	"items/toggleItem",
	async (arg, thunkAPI) => {
		console.log("THUNK: toggling item...");
		try {
			await updateItemInRTDB(arg.reference, arg.completed);
			console.log("THUNK: item toggled.");
			thunkAPI.dispatch(
				itemToggled({ id: arg.itemKey, completed: arg.completed })
			);
		} catch (error) {
			console.log(error);
		}
	}
);
