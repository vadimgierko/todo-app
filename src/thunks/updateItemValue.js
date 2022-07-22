import { createAsyncThunk } from "@reduxjs/toolkit";
// to update item value (instead of updating the whole item)
// we still use updateItem() from /firebase-rtdb-crud/updateItem:
import updateItemInRTDB from "../firebase-rtdb-crud/updateItem";
import { itemValueUpdated } from "../features/items/itemsSlice";

// arg = {reference, itemKey, value}
export const updateItemValue = createAsyncThunk(
	"items/updateValue",
	async (arg, thunkAPI) => {
		console.log("THUNK: updating item value...");
		try {
			await updateItemInRTDB(arg.reference, arg.value);
			console.log("THUNK: item value updated.");
			thunkAPI.dispatch(
				itemValueUpdated({ id: arg.itemKey, value: arg.value })
			);
		} catch (error) {
			console.log(error);
		}
	}
);
