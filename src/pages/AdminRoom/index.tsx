import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { database } from "../../services/firebase";
import { useRoom } from "../../hooks/useRoom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import styles from "./styles.module.scss";
import { QuestionModal } from "../../components/QuestionModal";

type RoomParams = {
	id: string;
};

export function AdminRoom() {
	const roomId = useParams<RoomParams>().id;
	const history = useHistory();
	const { title, questions } = useRoom(roomId);
	// const { user } = useAuth();
	const [endRoomModalIsOpen, setEndRoomModalIsOpen] = useState(false);
	const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] =
		useState(false);
	const [currentQuestion, setCurrentQuestion] = useState("");

	async function handleEndRoom() {
		await database.ref(`rooms/${roomId}`).update({
			endedAt: new Date(),
		});
		history.push("/");
	}

	function openEndRoomModal() {
		setEndRoomModalIsOpen(true);
	}

	function closeEndRoomModal() {
		setEndRoomModalIsOpen(false);
	}

	function openDeleteQuestionModal(questionId: string) {
		setCurrentQuestion(questionId);
		setDeleteQuestionModalIsOpen(true);
	}

	function closeDeleteQuestionModal() {
		setDeleteQuestionModalIsOpen(false);
	}
	async function handleDeleteQuestion(questionId: string) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		closeDeleteQuestionModal();
	}

	return (
		<div className={styles.page_room}>
			<header>
				<div className={styles.content}>
					<img src={logoImg} alt="Letmeask" onClick={() => history.push("/")} />
					<div>
						<RoomCode code={roomId} />
						<Button isOutlined onClick={openEndRoomModal}>
							Encerrar sala
						</Button>
						<QuestionModal
							isOpen={endRoomModalIsOpen}
							confirmButtonAction={handleEndRoom}
							closeModal={closeEndRoomModal}
							title="Encerrar sala"
							text="Tem certeza que você deseja encerrar esta sala?"
							confirmButtonText="Sim, encerrar"
							cancelButtonText="Cancelar"
						/>
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
						<>
							<Question
								content={question.content}
								author={question.author}
								key={question.id}>
								<button
									type="button"
									onClick={() => openDeleteQuestionModal(question.id)}>
									<img src={deleteImg} alt="Remover pergunta" />
								</button>
							</Question>
						</>
					))}
				</div>
			</main>
			<QuestionModal
				isOpen={deleteQuestionModalIsOpen}
				confirmButtonAction={() => handleDeleteQuestion(currentQuestion)}
				closeModal={closeDeleteQuestionModal}
				title="Excluir pergunta"
				text="Tem certeza que você deseja excluir esta pergunta?"
				confirmButtonText="Sim, excluir"
				cancelButtonText="Cancelar"
			/>
		</div>
	);
}
