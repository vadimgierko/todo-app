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
// slices:
import { listUpdated } from "../features/lists/listsSlice";

export default function List() {
	const { id } = useParams();
	const user = useSelector((state) => state.user.value);
	const lists = useSelector((state) => state.lists.value);
	const items = useSelector((state) => state.items.value);
	const pending = useSelector((state) => state.items.pending);
	const dispatch = useDispatch();
	const [list, setList] = useState();
	const [tasks, setTasks] = useState();

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

	useEffect(() => console.log("items:", items), [items]);

	// GET LIST DATA BY ID FROM LISTS IN STORE:
	useEffect(() => {
		if (id) {
			const list = lists[id];
			setList(list);
		}
	}, [id, lists]);

	useEffect(() => {
		function getListTasks() {
			if (list && list.tasks && Object.keys(list.tasks).length) {
				let tasks = {};
				Object.keys(list.tasks).forEach(
					(taskId) => (tasks = { ...tasks, [taskId]: items[taskId] })
				);
				return tasks;
			}
		}
		const tasks = getListTasks();
		setTasks(tasks);
	}, [items, list]);

	if (!user.id) return <p>You need to be logged in...</p>;

	if (!list) return null;

	return (
		<Box>
			<br />
			<Typography variant="h4" component="h1" sx={{ my: 2 }}>
				{list.title}
			</Typography>
			<AddItemForm cta="add some task here" onSubmit={handleSubmit} />
			<ItemsList items={tasks} pending={pending} />
		</Box>
	);
}
