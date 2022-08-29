// mui components:
import List from "@mui/material/List";
// custom components:
import SideMenuListItem from "./SideMenuListItem";

export default function SideMenuList({ listItems = [], onClick = (f) => f }) {
	if (!listItems || !listItems.length) return null;

	return (
		<List onClick={onClick}>
			{listItems.map((listItem) => (
				<SideMenuListItem
					key={listItem.name}
					listItem={listItem}
					onClick={onClick}
				/>
			))}
		</List>
	);
}
