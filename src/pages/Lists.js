import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// thunks:
import { addList } from "../thunks/list/addList";
// components:
import AddItemForm from "../components/organisms/AddItemForm";
// mui:
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ListCard from "../components/molecules/ListCard";

export default function Lists() {
	const user = useSelector((state) => state.user.value);
	const lists = useSelector((state) => state.lists.value);
	const tasks = useSelector((state) => state.items.value);
	const pending = useSelector((state) => state.lists.pending);
	const dispatch = useDispatch();

	function handleSubmit(e, inputValue) {
		e.preventDefault();
		if (inputValue.length) {
			console.log(e, inputValue);
			const reference = "lists/" + user.id;
			dispatch(
				addList({
					reference: reference,
					list: {
						title: inputValue,
					},
				})
			);
		} else {
			alert("You cannot add a todo list without the title! Type something!");
		}
	}

	useEffect(() => {
		if (user.id) {
			console.log("Your lists:", lists);
		}
	}, [lists, user.id]);

	useEffect(() => {
		if (user.id) {
			console.log("Your tasks:", tasks);
		}
	}, [tasks, user.id]);

	if (!user.id) return <p>You need to be logged in...</p>;

	return (
		<Box>
			<br />
			<Typography variant="h4" component="h1" sx={{ my: 2 }}>
				Your todo lists
			</Typography>
			<AddItemForm
				cta="type the name of your new todo list"
				onSubmit={handleSubmit}
			/>
			<List lists={lists} pending={pending} />
		</Box>
	);
}

function List({ lists, pending }) {
	if (pending)
		return (
			<div style={{ textAlign: "center" }}>
				<p>...pending todo lists... please wait...</p>
			</div>
		);

	if (!lists || !Object.keys(lists).length)
		return <p>There are no todo lists yet... Add one!</p>;

	return (
		<ul style={{ listStyle: "none", paddingLeft: 0 }}>
			{Object.keys(lists).map((key) => (
				<li key={key}>
					<ListCard list={lists[key]} listId={key} />
				</li>
			))}
		</ul>
	);
}
