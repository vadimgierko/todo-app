import { useState } from "react";
// mui:
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ItemForm({
	defaultValue = "",
	placeholder,
	submitText,
	onSubmit,
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
			<TextField
				fullWidth
				margin="normal"
				label={placeholder}
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				type="submit"
				sx={{ mt: 3, mb: 2 }}
			>
				{submitText}
			</Button>
		</Box>
	);
}
