import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// custom components
import UpdateItemForm from "../organisms/UpdateItemForm";
// mui:
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// mui icons:
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { useStore } from "../../contexts/useStore";
import { ref, update } from "firebase/database";
import { rtdb } from "../../firebaseConfig";

export default function ListCard({ list, listId }) {
	const { store, dispatch } = useStore();
	const { user } = store;
	const [isEditMode, setIsEditMode] = useState(false);

	async function handleUpdateList(e, newValue) {
		e.preventDefault();
		if (newValue && newValue.trim().length) {
			console.log("updating list title...");

			try {
				const updates = {};
				updates["lists/" + user.id + "/" + listId + "/title"] = newValue;

				await update(ref(rtdb), updates);
				console.log("list's title updated in lists.");
				dispatch({
					type: "LIST_TITLE_UPDATED",
					payload: { id: listId, title: newValue },
				});
			} catch (error) {
				console.log(error);
			}

			setIsEditMode(false);
		} else {
			alert("You cannot update an empty list title! Type something!");
		}
	}

	// DELETES ALL LIST'S TASKS FROM /TASKS BY TASK ID, THEN
	// DELETES LIST FROM /LISTS
	async function handleDeleteList() {
		console.log("deleting list...");
		try {
			const updates = {};

			if (list.tasks && Object.keys(list.tasks).length) {
				console.log(
					"There are tasks in the list",
					list.title,
					listId,
					". Delete those tasks first..."
				);
				await Promise.all(
					Object.keys(list.tasks).map(async (taskId) => {
						console.log("deleting task...");
						try {
							const updates = {};
							updates["tasks/" + user.id + "/" + taskId] = null;
							updates["lists/" + user.id + "/" + listId + "/tasks/" + taskId] =
								null;

							await update(ref(rtdb), updates);
							console.log("task", taskId, "deleted.");
							dispatch({
								type: "TASK_DELETED",
								payload: { taskId, listId },
							});
						} catch (error) {
							console.log(error);
						}
					})
				)
					.then(async () => {
						console.log(
							"All tasks from list",
							list.title,
							listId,
							"were deleted. Delete the list now..."
						);
						updates["lists/" + user.id + "/" + listId] = null;
						await update(ref(rtdb), updates);
						console.log("list", list.title, listId, "deleted.");
						dispatch({ type: "LIST_DELETED", payload: listId });
					})
					.catch((error) => console.log(error.message));
			} else {
				console.log(
					"There are NO tasks in the list",
					list.title,
					listId,
					". Delete the list now..."
				);
				updates["lists/" + user.id + "/" + listId] = null;
				await update(ref(rtdb), updates);
				console.log("list", list.title, listId, "deleted.");
				dispatch({ type: "LIST_DELETED", payload: listId });
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (!user) return <p>You need to be logged...</p>;
	if (!list) return null;

	if (isEditMode) {
		console.log("edit mode");
		return (
			<UpdateItemForm
				defaultValue={list.title}
				onSubmit={handleUpdateList}
				onCancel={() => setIsEditMode(false)}
			/>
		);
	}

	return (
		<Box
			className="item-card"
			sx={{ display: "flex", alignItems: "start", mb: 1 }}
		>
			<Typography
				variant="body1"
				sx={{
					flexGrow: 1,
					mt: 1.1,
				}}
			>
				<Link component={RouterLink} to={"/lists/" + listId}>
					{list.title} ({list.tasks ? Object.keys(list.tasks).length : 0})
				</Link>
			</Typography>

			<IconButton onClick={() => setIsEditMode(true)}>
				<EditIcon />
			</IconButton>
			<IconButton color="error" onClick={handleDeleteList}>
				<DeleteOutlinedIcon />
			</IconButton>
		</Box>
	);
}
