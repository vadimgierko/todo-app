import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {
		// template todos:
		// casdcaeascasdcas: {
		// 	value: "add mui to last remaining components",
		// 	completed: true,
		// },
		// casdwerascasdcas: {
		// 	value: "update readme",
		// 	completed: false,
		// },
		// casdcaefghasdcas: {
		// 	value: "publish gh pages",
		// 	completed: false,
		// },
	}, // items are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		// Redux Toolkit allows us to write "mutating" logic in reducers. It
		// doesn't actually mutate the state because it uses the Immer library,
		// which detects changes to a "draft state" and produces a brand new
		// immutable state based off those changes
		//============================ PENDING =================================//
		startPending: (state) => {
			state.pending = true;
		},
		stopPending: (state) => {
			state.pending = false;
		},
		//=========================== ITEMS CRUD ================================//
		itemsFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== ITEM CRUD =================================//
		itemFetched: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.item;
		},
		itemAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.item;
		},
		// update the whole item:
		itemUpdated: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.item;
		},
		itemDeleted: (state, action) => {
			state.pending = false;
			delete state.value[action.payload.id];
		},
		//======================== MORE SPECIFIC ACTIONS ========================//
		// this is the example of more specific update action:
		// update item value:
		itemValueUpdated: (state, action) => {
			state.pending = false;
			const item = state.value[action.payload.id];
			item.value = action.payload.value;
		},
		// this is the example of more specific update action:
		// toggle item (completed: !completed):
		itemToggled: (state, action) => {
			state.pending = false;
			const item = state.value[action.payload.id];
			item.completed = action.payload.completed;
		},
		//=========== RESET ITEMS STATE =======================/
		resetState: (state, action) => {
			state.value = {};
			state.pending = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	startPending,
	stopPending,
	itemsFetched,
	itemFetched,
	itemAdded,
	itemUpdated,
	itemDeleted,
	itemValueUpdated,
	itemToggled,
	resetState,
} = itemsSlice.actions;

export default itemsSlice.reducer;
