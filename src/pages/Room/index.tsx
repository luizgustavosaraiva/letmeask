import { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useRoom } from "../../hooks/useRoom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";

import logoImg from "../../assets/images/logo.svg";
import logoDarkImg from "../../assets/images/logo-dark.svg";
import styles from "./styles.module.scss";
import { useTheme } from "../../hooks/useTheme";
import { QuestionModal } from "../../components/QuestionModal";

type RoomParams = {
	id: string;
};

export function Room() {
	const { isDark } = useTheme();
	const roomId = useParams<RoomParams>().id;
	const history = useHistory();
	const { title, questions } = useRoom(roomId);
	const { user } = useAuth();
	const [newQuestion, setNewQuestion] = useState("");
	const [isClosed, setIsClosed] = useState(false);

	useEffect(() => {
		const endedAtRef = database.ref(`rooms/${roomId}/endedAt`);

		endedAtRef.on("value", (ended) => {
			if (ended.val()) {
				setIsClosed(true);
			} else {
				setIsClosed(false);
			}
		});

		return () => {
			endedAtRef.off("value");
		};
	}, [roomId]);

	async function handleSendQuestion(event: FormEvent) {
		event.preventDefault();
		if (newQuestion.trim() === "") {
			return;
		}

		if (!user) {
			throw new Error("You must be logged in!");
		}

		const question = {
			content: newQuestion,
			author: {
				name: user.name,
				avatar: user.avatar,
			},
			isHighlighted: false,
			isAnswered: false,
		};

		await database.ref(`rooms/${roomId}/questions`).push(question);

		setNewQuestion("");
	}

	async function handleLikeQuestion(questionId: string, likeId?: string) {
		if (likeId) {
			await database
				.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
				.remove();
		} else {
			await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
				authorId: user?.id,
			});
		}
	}

	return (
		<div className={`${styles.page_room} ${isDark && styles.dark}`}>
			<header>
				<div className={styles.content}>
					<img
						src={isDark ? logoDarkImg : logoImg}
						alt='Letmeask'
						onClick={() => history.push("/")}
					/>
					<RoomCode code={roomId} />
				</div>
			</header>

			<main className={styles.content}>
				<div className={`${styles.room_title} ${isDark && styles.dark}`}>
					<h1>Sala {title}</h1>
					{questions.length > 0 && (
						<span>
							{questions.length} Pergunta{questions.length > 1 ? "s" : ""}
						</span>
					)}
				</div>

				<form onSubmit={handleSendQuestion}>
					<textarea
						className={`${isDark && styles.dark}`}
						placeholder='O que voc?? quer perguntar?'
						onChange={(event) => setNewQuestion(event.target.value)}
						value={newQuestion}
					/>
					<div className={styles.form_footer}>
						{user ? (
							<div className={`${styles.user_info} ${isDark && styles.dark}`}>
								<img src={user.avatar} alt={user.name} />
								<span>{user.name}</span>
							</div>
						) : (
							<span>
								Para enviar uma pergunta, <button>fa??a seu login</button>.
							</span>
						)}
						<Button type='submit' disabled={!user}>
							Enviar pergunta
						</Button>
					</div>
				</form>

				<div className={styles.question_list}>
					{questions.map((question) => (
						<Question
							content={question.content}
							author={question.author}
							key={question.id}
							isAnswered={question.isAnswered}
							isHighlighted={question.isHighlighted}>
							{!question.isAnswered && (
								<button
									className={`${styles.like_button} ${
										question.likeId && styles.liked
									} ${isDark && styles.dark}`}
									type='button'
									aria-label='Marcar como gostei'
									onClick={() =>
										handleLikeQuestion(question.id, question.likeId)
									}>
									{question.likeCount > 0 && <span>{question.likeCount}</span>}
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z'
											stroke='#737380'
											strokeWidth='1.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</svg>
								</button>
							)}
						</Question>
					))}
				</div>
			</main>
			<QuestionModal
				isOpen={isClosed}
				confirmButtonAction={() => {
					history.push("/");
				}}
				closeModal={() => {}}
				title='Sala encerrada!'
				text='A sala foi encerrada e n??o ?? mais poss??vel enviar perguntas'
				confirmButtonText='Ir para home'
				cancelButtonText=''
			/>
		</div>
	);
}
