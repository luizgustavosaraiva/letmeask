import copyImg from "../../assets/images/copy.svg";
import { useTheme } from "../../hooks/useTheme";

import styles from "./styles.module.scss";

type RoomcodeProps = {
	code: string;
};

export function RoomCode({ code }: RoomcodeProps) {
	const { isDark } = useTheme();
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code);
	}

	return (
		<button
			className={`${styles.room_code} ${isDark && styles.dark}`}
			onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Imagem representando uma cópia de arquivo" />
			</div>
			<span>Sala #{code}</span>
		</button>
	);
}
