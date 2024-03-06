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
		case "TASK_UPDATED":
			return {
				...prevState,
				tasks: {
					...prevState.tasks,
					[action.payload.id]: {
						...prevState.tasks[action.payload.id],
						value: action.payload.value,
					},
				},
			};
		case "TASK_ADDED":
			const { task, taskId, listId } = action.payload;

			return {
				...prevState,
				lists: {
					...prevState.lists,
					[listId]: {
						...prevState.lists[listId],
						tasks: {
							...prevState.lists[listId].tasks,
							[taskId]: true,
						},
					},
				},
				tasks: {
					...prevState.tasks,
					[taskId]: task,
				},
			};
		case "TASK_TOGGLED":
			return {
				...prevState,
				tasks: {
					...prevState.tasks,
					[action.payload.id]: {
						...prevState.tasks[action.payload.id],
						completed: action.payload.completed,
					},
				},
			};
		case "TASK_DELETED":
			const updatedTasks = { ...prevState.tasks };
			delete updatedTasks[action.payload.taskId];

			const updatedList = { ...prevState.lists[action.payload.listId] };
			delete updatedList.tasks[action.payload.taskId];

			return {
				...prevState,
				tasks: updatedTasks,
				lists: {
					...prevState.lists,
					[action.payload.listId]: updatedList,
				},
			};
		default:
			return prevState;
	}
}
