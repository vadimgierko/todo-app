import UserIconMenuListItem from "./UserIconMenuListItem";

export default function UserIconMenuList({
	listItems = [],
	onClick = (f) => f,
}) {
	if (!listItems || !listItems.length) return null;

	return (
		<>
			{listItems.map((listItem) => (
				<UserIconMenuListItem
					key={listItem.name}
					item={listItem}
					onClick={onClick}
				/>
			))}
		</>
	);
}
