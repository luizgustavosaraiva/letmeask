import { createContext, ReactNode, useState } from "react";

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

	function handleChangeTheme() {
		setIsDark(!isDark);
	}

	return (
		<ThemeContext.Provider value={{ isDark, handleChangeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
