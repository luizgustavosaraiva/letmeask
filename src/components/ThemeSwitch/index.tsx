import { useContext } from "react";
import Switch from "react-switch";
import { BiSun, BiMoon } from "react-icons/bi";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./styles.module.scss";

export function ThemeSwitch() {
	const { isDark, handleChangeTheme } = useContext(ThemeContext);

	function CenteredIcon() {
		return (
			<div className={styles.centeredIcon}>
				{isDark ? (
					<BiMoon size={18} color='#282a36' />
				) : (
					<BiSun size={20} color='##ff5555' />
				)}
			</div>
		);
	}
	return (
		<div className={styles.check}>
			<Switch
				className={styles.switch}
				onChange={() => handleChangeTheme()}
				checked={isDark}
				onColor={"#ffb86c"}
				onHandleColor={"#ffb86c"}
				offColor={"#f8f8f8"}
				offHandleColor={"#f8f8f8"}
				checkedIcon
				uncheckedIcon
				uncheckedHandleIcon={<CenteredIcon />}
				checkedHandleIcon={<CenteredIcon />}
				handleDiameter={22}
				activeBoxShadow={"0px 0px 2px 3px rgba(0,0,0,0)"}
			/>
		</div>
	);
}
