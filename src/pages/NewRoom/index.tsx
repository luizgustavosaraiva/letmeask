import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import logoDarkImg from "../../assets/images/logo-dark.svg";

import styles from "./styles.module.scss";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { useTheme } from "../../hooks/useTheme";

export function NewRoom() {
	const { isDark } = useTheme();
	const { user } = useAuth();
	const history = useHistory();
	const [newRoom, setNewRoom] = useState("");

	async function handleCreateRoom(event: FormEvent) {
		event.preventDefault();

		if (newRoom.trim() === "") {
			return;
		}
		const roomRef = database.ref("rooms");
		const firebaseRoom = await roomRef.push({
			title: newRoom,
			authorId: user?.id,
		});

		history.push(`/rooms/${firebaseRoom.key}`);
	}

	return (
		<div className={`${styles.new_room} ${isDark && styles.dark}`}>
			<aside className={`${isDark && styles.dark}`}>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>Create Q&amp;A rooms to answer your questions!</strong>
				<p>Your questions answered in real time.</p>
			</aside>
			<main className={`${isDark && styles.dark}`}>
				<div className={styles.main_content}>
					<img src={isDark ? logoDarkImg : logoImg} alt="Letmeask" />
					<h2>Criar uma nova sala</h2>

					<form onSubmit={handleCreateRoom}>
						<input
							type="text"
							placeholder="Nome da sala"
							onChange={(event) => setNewRoom(event.target.value)}
							value={newRoom}
						/>
						<Button type="submit">Criar sala</Button>
					</form>
					<p>
						Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
