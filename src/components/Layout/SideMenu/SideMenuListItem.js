import { Link as RouterLink } from "react-router-dom";
// mui:
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SideMenuListItem({ listItem, onClick = (f) => f }) {
	if (!listItem || !Object.keys(listItem).length) return null;

	if (!listItem.action) {
		listItem.action = (f) => f;
	}

	return (
		<ListItem disablePadding>
			<ListItemButton
				component={RouterLink}
				to={listItem.link}
				onClick={() => {
					onClick();
					listItem.action();
				}}
			>
				<ListItemIcon>{listItem.icon}</ListItemIcon>
				<ListItemText>{listItem.name}</ListItemText>
			</ListItemButton>
		</ListItem>
	);
}
