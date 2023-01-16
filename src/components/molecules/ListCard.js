import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// thunks:
import { updateListTitle } from "../../thunks/list/updateListTitle";
import { deleteList } from "../../thunks/list/deleteList";
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

export default function ListCard({ list, listId }) {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const [isEditMode, setIsEditMode] = useState(false);

	const handleUpdate = (e, newValue) => {
		e.preventDefault();
		if (newValue.length) {
			dispatch(
				updateListTitle({
					listId: listId,
					title: newValue,
					uid: user.id,
				})
			);
			setIsEditMode(false);
		} else {
			alert("You cannot update an empty list title! Type something!");
		}
	};

	if (!user || !user.id) return <p>You need to be logged...</p>;
	if (!list) return null;

	if (isEditMode) {
		console.log("edit mode");
		return (
			<UpdateItemForm
				defaultValue={list.title}
				onSubmit={handleUpdate}
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
			<IconButton
				color="error"
				onClick={() =>
					dispatch(
						deleteList({
							uid: user.id,
							list: list,
							listId: listId,
						})
					)
				}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Box>
	);
}
