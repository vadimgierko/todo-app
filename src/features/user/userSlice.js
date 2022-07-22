import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: {
		email: "",
		id: "",
	},
	pending: false, // pending = true when the data is fetching, deleting, adding or updating
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		startPending: (state) => {
			state.pending = true;
		},
		stopPending: (state) => {
			state.pending = false;
		},
		userSignedIn: (state, action) => {
			state.value.email = action.payload.email;
			state.value.id = action.payload.id;
		},
		userLoggedOut: (state) => {
			state.value.email = "";
			state.value.id = "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { startPending, stopPending, userSignedIn, userLoggedOut } =
	userSlice.actions;

export default userSlice.reducer;
