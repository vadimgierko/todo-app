import ItemCard from "../molecules/ItemCard";

export default function ItemsList({ items, pending }) {
	console.log("items in itemslist:", items);
	if (pending)
		return (
			<div className="items-list" style={{ textAlign: "center" }}>
				<p>...pending items... please wait...</p>
			</div>
		);

	if (!items || !Object.keys(items).length)
		return <p className="items-list">There are no items yet... Add one!</p>;

	return (
		<ul className="items-list" style={{ listStyle: "none", paddingLeft: 0 }}>
			{Object.keys(items).map((key) => (
				<li key={key}>
					<ItemCard item={items[key]} itemKey={key} />
				</li>
			))}
		</ul>
	);
}
