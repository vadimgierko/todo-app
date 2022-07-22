import { Link as RouterLink } from "react-router-dom";
// mui:
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function UserIconMenuItem({ item, onClick = (f) => f }) {
	if (!item.action) {
		item.action = (f) => f;
	}
	return (
		<MenuItem
			component={RouterLink}
			to={item.link}
			onClick={() => {
				onClick();
				item.action();
			}}
		>
			<ListItemIcon sx={{ mr: 1 }}>{item.icon}</ListItemIcon>
			<ListItemText>{item.name}</ListItemText>
		</MenuItem>
	);
}
