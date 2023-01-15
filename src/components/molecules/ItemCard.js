import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// thunks:
import { updateTask } from "../../thunks/task/updateTask";
import { toggleTask } from "../../thunks/task/toggleTask";
import { deleteItem } from "../../thunks/deleteItem";
// custom components
import UpdateItemForm from "../organisms/UpdateItemForm";
// mui:
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// mui icons:
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

export default function ItemCard({ item, itemKey }) {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const [isEditMode, setIsEditMode] = useState(false);

	const handleUpdate = (e, newValue) => {
		e.preventDefault();
		if (newValue.length) {
			dispatch(
				updateTask({
					taskId: itemKey,
					value: newValue,
					uid: user.id,
				})
			);
			setIsEditMode(false);
		} else {
			alert("You cannot update an empty item! Type something!");
		}
	};

	const handleToggle = (e) => {
		e.preventDefault();
		dispatch(
			toggleTask({
				taskId: itemKey,
				uid: user.id,
				completed: !item.completed,
			})
		);
	};

	if (!user || !user.id) return <p>You need to be logged...</p>;
	if (!item) return null;

	if (isEditMode)
		return (
			<UpdateItemForm
				defaultValue={item.value}
				onSubmit={handleUpdate}
				onCancel={() => setIsEditMode(false)}
			/>
		);

	return (
		<Box
			className="item-card"
			sx={{ display: "flex", alignItems: "start", mb: 1 }}
		>
			<Checkbox checked={item.completed} onChange={handleToggle} />
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
			<IconButton
				color="error"
				onClick={() => {
					const reference = "items/" + user.id + "/" + itemKey;
					dispatch(
						deleteItem({
							reference: reference,
							itemKey: itemKey,
						})
					);
				}}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Box>
	);
}