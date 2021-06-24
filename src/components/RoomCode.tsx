import copyImg from "../assets/images/copy.svg";

import "../styles/room-code.scss";

type RoomcodeProps = {
	code: string;
};

export function RoomCode({ code }: RoomcodeProps) {
	function copyRoomCodeToClipboard() {
		navigator.clipboard.writeText(code);
	}

	return (
		<button className="room-code" onClick={copyRoomCodeToClipboard}>
			<div>
				<img src={copyImg} alt="Imagem representando uma cópia de arquivo" />
			</div>
			<span>Sala #{code}</span>
		</button>
	);
}
