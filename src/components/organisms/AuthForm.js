import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const INIT_USER_DATA = {
	email: "",
	password: "",
};

export default function AuthForm({ submitText, onSubmit }) {
	const [userData, setUserData] = useState(INIT_USER_DATA);

	function resetForm() {
		setUserData(INIT_USER_DATA);
	}

	return (
		<Box
			component="form"
			sx={{ mt: 1 }}
			onSubmit={(e) => {
				onSubmit(e, userData);
				resetForm();
			}}
		>
			{Object.keys(userData).map((key) => (
				<TextField
					key={key}
					margin="normal"
					fullWidth
					label={"input your " + key}
					type={key}
					value={userData[key]}
					onChange={(e) => setUserData({ ...userData, [key]: e.target.value })}
				/>
			))}
			<Button
				type="submit"
				variant="outlined"
				color="primary"
				fullWidth
				sx={{ mt: 3, mb: 2 }}
			>
				{submitText}
			</Button>
		</Box>
	);
}
