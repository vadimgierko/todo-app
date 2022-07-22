import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// thunks:
import { deleteItem } from "../../thunks/deleteItem";
import { updateItem } from "../../thunks/updateItem";
import { updateItemValue } from "../../thunks/updateItemValue";
import { toggleItem } from "../../thunks/toggleItem";
// custom components
//import ItemForm from "../organisms/ItemForm";
import UpdateItemForm from "../organisms/UpdateItemForm";
// mui:
import FormControlLabel from "@mui/material/FormControlLabel";
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

	const handleSubmit = (e, newValue) => {
		e.preventDefault();
		if (newValue.length) {
			//============ to update the whole item while updating the value, use this:
			// const reference = "items/" + user.id + "/" + itemKey;
			// dispatch(
			// 	updateItem({
			// 		reference: reference,
			// 		itemKey: itemKey,
			// 		item: {
			// 			value: newValue,
			// 			completed: item.completed,
			// 		},
			// 	})
			// );
			//============ to update only item's value, use this:
			const reference = "items/" + user.id + "/" + itemKey + "/value";
			dispatch(
				updateItemValue({
					reference: reference,
					itemKey: itemKey,
					value: newValue,
				})
			);
			setIsEditMode(false);
		} else {
			alert("You cannot update an empty item! Type something!");
		}
	};

	const handleToggle = (e) => {
		e.preventDefault();
		//============= to update the whole item while toggling, use this:
		// const reference = "items/" + user.id + "/" + itemKey;
		// dispatch(
		// 	updateItem({
		// 		reference: reference,
		// 		itemKey: itemKey,
		// 		item: {
		// 			value: item.value,
		// 			completed: !item.completed,
		// 		},
		// 	})
		// );
		//============= to only toggle item (change the value of completed prop), use this:
		const reference = "items/" + user.id + "/" + itemKey + "/completed";
		dispatch(
			toggleItem({
				reference: reference,
				itemKey: itemKey,
				completed: !item.completed,
			})
		);
	};

	if (!item) return null;

	if (isEditMode)
		return (
			<UpdateItemForm
				defaultValue={item.value}
				onSubmit={handleSubmit}
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
			{/* <FormControlLabel
				control={<Checkbox checked={item.completed} onChange={handleToggle} />}
				label={item.value}
				sx={{
					textDecoration: item.completed ? "line-through" : "none",
					flexGrow: 1,
				}}
			/> */}
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
