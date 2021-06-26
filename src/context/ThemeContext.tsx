import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeContextData = {
	isDark: boolean;
	handleChangeTheme: () => void;
};

type ThemeContextProps = {
	children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeContextProvider({ children }: ThemeContextProps) {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const themevalue = localStorage.getItem("darkTheme");
		if (themevalue) {
			if (themevalue === "true") {
				setIsDark(true);
			} else {
				setIsDark(false);
			}
		}
	}, []);

	function handleChangeTheme() {
		setIsDark(!isDark);
		localStorage.setItem("darkTheme", `${!isDark}`);
	}

	return (
		<ThemeContext.Provider value={{ isDark, handleChangeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
