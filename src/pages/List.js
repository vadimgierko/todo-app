import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../contexts/useStore";
// components:
import AddItemForm from "../components/organisms/AddItemForm";
import ItemsList from "../components/organisms/ItemsList";
// mui:
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { child, push, ref, update } from "firebase/database";
import { rtdb } from "../firebaseConfig";

export default function List() {
	const { id } = useParams();
	const { store, dispatch } = useStore();
	const { user, lists, tasks } = store;

	const list = id && lists ? lists[id] : null;
	const listTasks = getListTasks();

	function getListTasks() {
		if (list && list.tasks && Object.keys(list.tasks).length) {
			let listTasks = {};
			Object.keys(list.tasks).forEach(
				(taskId) => (listTasks = { ...listTasks, [taskId]: tasks[taskId] })
			);
			return listTasks;
		} else {
			return null;
		}
	}

	async function handleAddTask(e, inputValue) {
		e.preventDefault();

		if (inputValue && inputValue.trim().length) {
			console.log(e, inputValue);

			try {
				const newTask = {
					value: inputValue,
					completed: false,
				};
				// Get a key for a new task:
				const key = push(child(ref(rtdb), "tasks/" + user.id)).key;

				// Write the new task's data simultaneously in the tasks and the user's todo list:
				const updates = {};
				updates["tasks/" + user.id + "/" + key] = newTask;
				updates["lists/" + user.id + "/" + id + "/tasks/" + key] = true;

				await update(ref(rtdb), updates);
				console.log("task added to tasks & list's tasks index.");
				dispatch({
					type: "TASK_ADDED",
					payload: { task: newTask, taskId: key, listId: id },
				});

				return key;
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("You cannot add an empty task! Type something!");
		}
	}

	useEffect(() => console.log("tasks:", listTasks), [listTasks]);

	if (!user) return <p>You need to be logged in...</p>;

	if (!list) return null;

	return (
		<Box>
			<br />
			<Typography align="center" variant="h4" component="h1" sx={{ my: 2 }}>
				{list.title} ({listTasks ? Object.keys(listTasks).length : 0})
			</Typography>
			<AddItemForm cta="add some task here" onSubmit={handleAddTask} />
			<ItemsList items={listTasks} listId={id} />
		</Box>
	);
}
