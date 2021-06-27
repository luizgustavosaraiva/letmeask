import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import logoDarkImg from "../../assets/images/logo-dark.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import styles from "./styles.module.scss";
import { useTheme } from "../../hooks/useTheme";
import { QuestionModal } from "../../components/QuestionModal";

export function Home() {
	const { isDark } = useTheme();
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState("");
	const [isClosed, setIsClosed] = useState(false);

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}
		history.push("rooms/new");
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === "") {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert("Room does not exists!");
			return;
		}

		if (roomRef.val().endedAt) {
			setIsClosed(true);
			return;
		}
		roomRef.val().authorId === user?.id
			? history.push(`/admin/rooms/${roomCode}`)
			: history.push(`/rooms/${roomCode}`);
	}

	function closeModal() {
		setIsClosed(false);
	}

	return (
		<div className={`${styles.home} ${isDark && styles.dark}`}>
			<aside className={`${isDark && styles.dark}`}>
				<img
					src={illustrationImg}
					alt='Ilustração simbolizando perguntas e respostas'
				/>
				<strong>Create Q&amp;A rooms to answer your questions!</strong>
				<p>Your questions answered in real time.</p>
			</aside>
			<main>
				<div className={styles.main_content}>
					<img src={isDark ? logoDarkImg : logoImg} alt='Letmeask' />
					<button className={styles.create_room} onClick={handleCreateRoom}>
						<img src={googleIconImg} alt='Ícone do Google' />
						Create your room with Google
					</button>
					<div className={styles.separator}>or join an existing room</div>
					<form onSubmit={handleJoinRoom}>
						<input
							type='text'
							placeholder='Room code'
							onChange={(event) => setRoomCode(event.target.value)}
							value={roomCode}
						/>
						<Button type='submit'>Join</Button>
					</form>
				</div>
			</main>
			<QuestionModal
				isOpen={isClosed}
				confirmButtonAction={closeModal}
				closeModal={closeModal}
				title='Sala encerrada!'
				text='A sala informada foi encerrada e não é mais possível enviar perguntas'
				confirmButtonText='OK'
				cancelButtonText=''
			/>
		</div>
	);
}
