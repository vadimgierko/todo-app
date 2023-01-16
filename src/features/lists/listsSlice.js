import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {}, // lists are stored in object under the unique firebase key (id)
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const listsSlice = createSlice({
	name: "lists",
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
		//=========================== LISTS CRUD ================================//
		listsFetched: (state, action) => {
			//state.pending = false; // no need, because there is stopPending() in the thunk
			state.value = action.payload;
		},
		//=========================== LIST CRUD =================================//
		listFetched: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.list;
		},
		listAdded: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.list;
		},
		// update the whole list:
		listUpdated: (state, action) => {
			state.pending = false;
			state.value[action.payload.id] = action.payload.list;
		},
		listDeleted: (state, action) => {
			state.pending = false;
			delete state.value[action.payload.id];
		},
		listTitleUpdated: (state, action) => {
			state.pending = false;
			const list = state.value[action.payload.id];
			list.title = action.payload.title;
		},
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
	listsFetched,
	listFetched,
	listAdded,
	listUpdated,
	listDeleted,
	listTitleUpdated,
	resetState,
} = listsSlice.actions;

export default listsSlice.reducer;
