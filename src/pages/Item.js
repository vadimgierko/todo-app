import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fetchItem } from "../thunks/fetchItem";
import ItemCard from "../components/molecules/ItemCard";
// mui:
import Link from "@mui/material/Link";

//=========================================================
// TODO:
// fix multiply useEffect in ItemPage => to much pending...
// (pending in fetchItem & fetchItems)...

export default function Item() {
	const { itemKey } = useParams();

	const user = useSelector((state) => state.user.value);
	const items = useSelector((state) => state.items.value);
	const pending = useSelector((state) => state.items.pending);
	const dispatch = useDispatch();

	//const [item, setItem] = useState();

	const reference = "todos/" + user.id + "/" + itemKey;

	// useEffect(() => {
	// 	console.log("Item in ItemPage:", item);
	// }, [item]);

	// to fix doubled fetching => split this useEffect
	useEffect(() => {
		if (!items[itemKey]) {
			// if there are items, but there is no item with current key:
			// reset prev item:
			// try to fetch item:
			dispatch(
				fetchItem({
					reference: reference,
					itemKey: itemKey,
				})
			);
		}
	}, [dispatch, itemKey, items, reference]);

	if (pending)
		return (
			<div className="item-page" style={{ textAlign: "center" }}>
				<p>...pending... please wait...</p>
			</div>
		);

	if (!items[itemKey] || !Object.keys(items[itemKey]).length)
		return (
			<div className="item-page">
				<p>There is no such item in database...</p>
				<Link component={RouterLink} to="/items">
					back to items
				</Link>
			</div>
		);

	return (
		<div className="item-page">
			<ItemCard item={items[itemKey]} itemKey={itemKey} />
			<br />
			<Link component={RouterLink} to="/items">
				back to items
			</Link>
		</div>
	);
}
