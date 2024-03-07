import { List, Store, Task } from "../../types";
import { initStore } from "./initState";

export type ReducerAction =
	| { type: "USER_SIGNED_IN"; payload: Store }
	| { type: "USER_LOGGED_OUT" }
	| { type: "LIST_ADDED"; payload: { id: string; list: List } }
	| {
			type: "LIST_TITLE_UPDATED";
			payload: { id: string; title: List["title"] };
	  }
	| { type: "LIST_DELETED"; payload: string }
	| { type: "TASK_UPDATED"; payload: { id: string; value: Task["value"] } }
	| {
			type: "TASK_ADDED";
			payload: { task: Task; taskId: string; listId: string };
	  }
	| {
			type: "TASK_TOGGLED";
			payload: { id: string; completed: Task["completed"] };
	  }
	| { type: "TASK_DELETED"; payload: { taskId: string; listId: string } };

export default function reducer(prevState: Store, action: ReducerAction) {
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
						...prevState.lists![action.payload.id],
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
						...prevState.tasks![action.payload.id],
						value: action.payload.value,
					},
				},
			};
		case "TASK_ADDED":
			return {
				...prevState,
				lists: {
					...prevState.lists,
					[action.payload.listId]: {
						...prevState.lists![action.payload.listId],
						tasks: {
							...prevState.lists![action.payload.listId].tasks,
							[action.payload.taskId]: true,
						},
					},
				},
				tasks: {
					...prevState.tasks,
					[action.payload.taskId]: action.payload.task,
				},
			};
		case "TASK_TOGGLED":
			return {
				...prevState,
				tasks: {
					...prevState.tasks,
					[action.payload.id]: {
						...prevState.tasks![action.payload.id],
						completed: action.payload.completed,
					},
				},
			};
		case "TASK_DELETED":
			const updatedTasks = { ...prevState.tasks };
			delete updatedTasks[action.payload.taskId];

			const updatedList = { ...prevState.lists![action.payload.listId] };
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
