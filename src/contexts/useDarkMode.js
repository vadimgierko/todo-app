import { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
	const [darkMode, setDarkMode] = useState(true);

	const switchMode = () => setDarkMode(!darkMode);

	const value = {
		darkMode,
		switchMode,
	};

	return (
		<DarkModeContext.Provider value={value}>
			{children}
		</DarkModeContext.Provider>
	);
}
