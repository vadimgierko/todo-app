import { useState } from "react";
// mui:
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
// mui icons:
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function AddItemForm({ onSubmit }) {
	const [inputValue, setInputValue] = useState("");

	function resetInput() {
		setInputValue("");
	}

	return (
		<Box
			component="form"
			onSubmit={(e) => {
				onSubmit(e, inputValue);
				resetInput();
			}}
		>
			<Box
				sx={{
					display: "flex",
				}}
			>
				<Input
					placeholder="add item"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					sx={{ flexGrow: 1 }}
					autoFocus
				/>
				<IconButton type="submit">
					<AddBoxOutlinedIcon fontSize="large" color="grey" />
				</IconButton>
			</Box>
		</Box>
	);
}
