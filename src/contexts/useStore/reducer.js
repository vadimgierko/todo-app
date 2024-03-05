import { initStore } from "./initState";

export default function reducer(prevState, action) {
	switch (action.type) {
		case "USER_SIGNED_IN":
			return {
				user: action.payload.user,
				lists: action.payload.lists,
				tasks: action.payload.tasks,
			};
		case "USER_LOGGED_OUT":
			return initStore;
		case "LIST_ADDED":
			return {
				...prevState,
				lists: { ...prevState.lists, [action.payload.id]: action.payload.list },
			};
		case "LIST_TITLE_UPDATED":
			return {
				...prevState,
				lists: {
					...prevState.lists,
					[action.payload.id]: {
						...prevState.lists[action.payload.id],
						title: action.payload.title,
					},
				},
			};
		case "LIST_DELETED":
			const updatedLists = { ...prevState.lists };
			delete updatedLists[action.payload];

			return { ...prevState, lists: updatedLists };

		case "TASK_DELETED":
			const updatedTasks = { ...prevState.tasks };
			delete updatedTasks[action.payload.taskId];

			// TODO: delete from list !!!

			return {
				...prevState,
				tasks: updatedTasks,
			};
		default:
			return prevState;
	}
}
