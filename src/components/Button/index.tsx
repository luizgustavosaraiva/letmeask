import { ButtonHTMLAttributes } from "react";
import { useTheme } from "../../hooks/useTheme";

import styles from "./styles.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
	const { isDark } = useTheme();
	return (
		<button
			className={`${styles.button} ${isOutlined && styles.outlined} ${
				isDark && styles.dark
			}`}
			{...props}
		/>
	);
}
