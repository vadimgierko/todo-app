import { useState } from "react";
// mui:
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
// mui icons:
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

export default function UpdateItemForm({
	defaultValue = "",
	onSubmit,
	onCancel,
	cta = "type a new value for an item",
}) {
	const [inputValue, setInputValue] = useState(defaultValue);

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
					placeholder={cta}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					sx={{ flexGrow: 1 }}
					autoFocus
				/>
				<IconButton type="submit">
					<CheckBoxOutlinedIcon color="success" />
				</IconButton>
				<IconButton onClick={onCancel}>
					<DoDisturbOutlinedIcon color="error" />
				</IconButton>
			</Box>
		</Box>
	);
}
