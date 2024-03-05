import { useEffect } from "react";
// components:
import AddItemForm from "../components/organisms/AddItemForm";
// mui:
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListCard from "../components/molecules/ListCard";
import { useStore } from "../contexts/useStore";
import addItemWithAutoKey from "../firebase-rtdb-crud/addItemWithAutoKey";

export default function Lists() {
	const { store, dispatch } = useStore();
	const { user, lists, tasks } = store;

	async function handleSubmit(e, inputValue) {
		e.preventDefault();

		if (inputValue && inputValue.trim().length) {
			console.log(e, inputValue);

			const reference = "lists/" + user.id;

			console.log("THUNK: adding a todo list...");
			try {
				const list = {
					title: inputValue,
				};

				const key = await addItemWithAutoKey(reference, list);
				console.log("todo list added.");
				dispatch({ type: "LIST_ADDED", payload: { id: key, list } });
			} catch (error) {
				console.log(error);
			}
		} else {
			alert("You cannot add a todo list without the title! Type something!");
		}
	}

	useEffect(() => {
		if (user) {
			console.log("Your lists:", lists);
			console.log("Your tasks:", tasks);
		}
	}, [lists, tasks, user]);

	if (!user) return <p>You need to be logged in...</p>;

	return (
		<Box>
			<br />
			<Typography align="center" variant="h4" component="h1" sx={{ my: 2 }}>
				YOUR TODO LISTS ({lists ? Object.keys(lists).length : 0})
			</Typography>
			<AddItemForm
				cta="type the name of your new todo list"
				onSubmit={handleSubmit}
			/>
			<List lists={lists} />
		</Box>
	);
}

function List({ lists }) {
	// if (pending)
	// 	return (
	// 		<div style={{ textAlign: "center" }}>
	// 			<p>...pending todo lists... please wait...</p>
	// 		</div>
	// 	);

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
