import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// thunks:
import { addItemWithAutoKey } from "../thunks/addItemWithAutoKey";
// components:
import AddItemForm from "../components/organisms/AddItemForm";
import ItemsList from "../components/organisms/ItemsList";
// mui:
import Box from "@mui/material/Box";

export default function Items() {
	const user = useSelector((state) => state.user.value);
	const items = useSelector((state) => state.items.value);
	const pending = useSelector((state) => state.items.pending);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleSubmit(e, inputValue) {
		e.preventDefault();
		if (inputValue.length) {
			console.log(e, inputValue);
			const reference = "items/" + user.id;
			dispatch(
				addItemWithAutoKey({
					reference: reference,
					item: {
						value: inputValue,
						completed: false,
					},
				})
			);
		} else {
			alert("You cannot add an empty item! Type something!");
		}
	}

	useEffect(() => {
		if (!user.id) {
			navigate("/signin");
		}
	}, [navigate, user.id]);

	return (
		<Box className="items-page">
			<br />
			<AddItemForm onSubmit={handleSubmit} />
			<ItemsList items={items} pending={pending} />
		</Box>
	);
}
