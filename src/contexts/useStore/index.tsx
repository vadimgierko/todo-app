import { onAuthStateChanged } from "firebase/auth";
import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import reducer, { ReducerAction } from "./reducer";
import { initStore } from "./initState";
import fetchItems from "../../firebase-rtdb-crud/fetchItems";
import { Store } from "../../types";

const StoreContext = createContext<{
	store: Store;
	dispatch: Dispatch<ReducerAction>;
}>({
	store: initStore,
	dispatch: function (value: ReducerAction): void {
		throw new Error("Function not implemented.");
	},
});

export function useStore() {
	return useContext(StoreContext);
}

type StoreProviderProps = { children: ReactNode };

export function StoreProvider({ children }: StoreProviderProps) {
	const navigate = useNavigate();

	const [store, dispatch] = useReducer(reducer, initStore);

	// listen to the user logs in & out:
	useEffect(() => {
		console.log("store runs...");
		const unsubscribe = () =>
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					const { uid, email } = user;
					console.log(user);
					const lists = await fetchItems("lists/" + uid);
					const tasks = await fetchItems("tasks/" + uid);

					dispatch({
						type: "USER_SIGNED_IN",
						payload: {
							user: { id: uid, email },
							lists,
							tasks,
						},
					});

					navigate("/lists");
				} else {
					dispatch({ type: "USER_LOGGED_OUT" });
				}
			});
		return unsubscribe();
	}, []);

	const value = {
		store,
		dispatch,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}
