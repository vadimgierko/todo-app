import { createAsyncThunk } from "@reduxjs/toolkit";
import updateItemInRTDB from "../firebase-rtdb-crud/updateItem";
import { itemUpdated } from "../features/items/itemsSlice";

// arg = {reference, itemKey, item}
export const updateItem = createAsyncThunk(
	"items/update",
	async (arg, thunkAPI) => {
		console.log("THUNK: updating item...");
		try {
			await updateItemInRTDB(arg.reference, arg.item);
			console.log("THUNK: item updated.");
			thunkAPI.dispatch(itemUpdated({ id: arg.itemKey, item: arg.item }));
		} catch (error) {
			console.log(error);
		}
	}
);
