import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import itemsReducer from "../features/items/itemsSlice";
import listsSlice from "../features/lists/listsSlice";

export default configureStore({
	reducer: {
		user: userSlice,
		lists: listsSlice,
		items: itemsReducer,
	},
});
