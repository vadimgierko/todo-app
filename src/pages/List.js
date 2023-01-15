import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// thunks:
import { addTask } from "../thunks/task/addTask";
// components:
import AddItemForm from "../components/organisms/AddItemForm";
import ItemsList from "../components/organisms/ItemsList";
// mui:
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { listUpdated } from "../features/lists/listsSlice";

export default function List() {
	const { id } = useParams();
	const user = useSelector((state) => state.user.value);
	const lists = useSelector((state) => state.lists.value);
	const [list, setList] = useState();
	const items = useSelector((state) => state.items.value);
	const pending = useSelector((state) => state.items.pending);
	const dispatch = useDispatch();

	// HANDLE ADDING A NEW TASK TO THE LIST:
	function handleSubmit(e, inputValue) {
		e.preventDefault();
		if (inputValue.length) {
			console.log(e, inputValue);
			dispatch(
				addTask({
					uid: user.id,
					task: {
						value: inputValue,
						completed: false,
					},
					listId: id,
				})
			).then((dataReturnedFromDispatch) => {
				const { payload: taskId } = dataReturnedFromDispatch;
				dispatch(
					listUpdated({
						id: id,
						list: { ...list, tasks: { ...list.tasks, [taskId]: true } },
					})
				);
			});
		} else {
			alert("You cannot add an empty task! Type something!");
		}
	}

	function getListTasks() {
		if (list.tasks && Object.keys(list.tasks).length) {
			let tasks = {};
			Object.keys(list.tasks).forEach(
				(taskId) => (tasks = { ...tasks, [taskId]: items[taskId] })
			);
			return tasks;
		}
	}

	// GET LIST DATA BY ID FROM LISTS IN STORE:
	useEffect(() => {
		if (id) {
			const list = lists[id];
			setList(list);
		}
	}, [id, lists]);

	// LOG LIST DATA IN CONSOLE:
	useEffect(() => {
		if (list) {
			console.log("list data:", list);
		}
	}, [list]);

	if (!user.id) return <p>You need to be logged in...</p>;

	if (!list) return null;

	return (
		<Box>
			<br />
			<Typography variant="h4" component="h1" sx={{ my: 2 }}>
				{list.title}
			</Typography>
			<AddItemForm
				cta="type the name of your new todo list"
				onSubmit={handleSubmit}
			/>
			<ItemsList items={getListTasks()} pending={pending} />
		</Box>
	);
}
