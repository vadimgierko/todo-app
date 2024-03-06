import { useState } from "react";
// custom components
import UpdateItemForm from "../organisms/UpdateItemForm";
// mui:
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// mui icons:
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useStore } from "../../contexts/useStore";
import { ref, update } from "firebase/database";
import { rtdb } from "../../firebaseConfig";

export default function ItemCard({ item, itemKey, listId }) {
	const { store, dispatch } = useStore();
	const { user } = store;
	const [isEditMode, setIsEditMode] = useState(false);

	async function handleUpdateTask(e, newValue) {
		e.preventDefault();

		if (newValue && newValue.trim().length) {
			try {
				const updates = {};
				updates["tasks/" + user.id + "/" + itemKey + "/value"] = newValue;

				await update(ref(rtdb), updates);
				console.log("task's value updated in tasks.");

				dispatch({
					type: "TASK_UPDATED",
					payload: { id: itemKey, value: newValue },
				});
			} catch (error) {
				console.log(error);
			}
			setIsEditMode(false);
		} else {
			alert("You cannot update an empty item! Type something!");
		}
	}

	async function handleToggleTask(e) {
		e.preventDefault();

		console.log("toggling task...");
		try {
			const updates = {};
			updates["tasks/" + user.id + "/" + itemKey + "/completed"] =
				!item.completed;

			await update(ref(rtdb), updates);
			console.log("task's completed prop updated in tasks.");

			dispatch({
				type: "TASK_TOGGLED",
				payload: { id: itemKey, completed: !item.completed },
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function handleDeleteTask() {
		try {
			const updates = {};
			updates["tasks/" + user.id + "/" + itemKey] = null;
			updates["lists/" + user.id + "/" + listId + "/tasks/" + itemKey] = null;

			await update(ref(rtdb), updates);
			console.log("task", itemKey, "deleted.");

			dispatch({ type: "TASK_DELETED", payload: { taskId: itemKey, listId } });
		} catch (error) {
			console.log(error);
		}
	}

	if (!user) return <p>You need to be logged...</p>;
	if (!item) return null;

	if (isEditMode)
		return (
			<UpdateItemForm
				defaultValue={item.value}
				onSubmit={handleUpdateTask}
				onCancel={() => setIsEditMode(false)}
			/>
		);

	return (
		<Box
			className="item-card"
			sx={{ display: "flex", alignItems: "start", mb: 1 }}
		>
			<Checkbox checked={item.completed} onChange={handleToggleTask} />
			<Typography
				variant="body1"
				sx={{
					textDecoration: item.completed ? "line-through" : "none",
					flexGrow: 1,
					mt: 1.1,
				}}
			>
				{item.value}
			</Typography>
			<IconButton onClick={() => setIsEditMode(true)}>
				<EditIcon />
			</IconButton>
			<IconButton color="error" onClick={handleDeleteTask}>
				<DeleteOutlinedIcon />
			</IconButton>
		</Box>
	);
}
