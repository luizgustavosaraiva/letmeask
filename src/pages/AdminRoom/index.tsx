import { useHistory, useParams } from "react-router";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import styles from "./styles.module.scss";
import { database } from "../../services/firebase";

type RoomParams = {
	id: string;
};

export function AdminRoom() {
	const roomId = useParams<RoomParams>().id;
	const history = useHistory();
	const { title, questions } = useRoom(roomId);
	// const { user } = useAuth();

	async function handleEndRoom() {
		if (window.confirm("Você tem certeza que deseja encerrar a sala?")) {
			await database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			});
			history.push("/");
		}
	}
	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm("Você tem certeza que deseja excluir essa pergunta?")) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	return (
		<div className={styles.page_room}>
			<header>
				<div className={styles.content}>
					<img src={logoImg} alt="Letmeask" onClick={() => history.push("/")} />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={handleEndRoom}>
							Encerrar sala
						</Button>
					</div>
				</div>
			</header>

			<main className={styles.content}>
				<div className={styles.room_title}>
					<h1>Sala {title}</h1>
					{questions.length > 0 && (
						<span>
							{questions.length} Pergunta{questions.length > 1 ? "s" : ""}
						</span>
					)}
				</div>

				<div className={styles.question_list}>
					{questions.map((question) => (
						<Question
							content={question.content}
							author={question.author}
							key={question.id}>
							<button
								type="button"
								onClick={() => handleDeleteQuestion(question.id)}>
								<img src={deleteImg} alt="Remover pergunta" />
							</button>
						</Question>
					))}
				</div>
			</main>
		</div>
	);
}
