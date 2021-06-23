import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function Home() {
	const { user, signInWithGoogle } = useAuth();

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}
		history.push("rooms/new");
	}

	const history = useHistory();
	return (
		<div id="page-auth">
			<aside>
				<img
					src={illustrationImg}
					alt="Ilustração simbolizando perguntas e respostas"
				/>
				<strong>Crie salas de Q&amp;A ao-vivo</strong>
				<p>Tire as dúvidas de sua audiência em tempo-real.</p>
			</aside>
			<main>
				<div className="main-content">
					<img src={logoImg} alt="Letmeask" />
					<button className="create-room" onClick={handleCreateRoom}>
						<img src={googleIconImg} alt="Ícone do Google" />
						Crie sua sala com o Google
					</button>
					<div className="separator">ou entre em uma sala</div>
					<form>
						<input
							type="text"
							placeholder="Digite o código da sala"
							name=""
							id=""
						/>
						<Button type="submit">Entrar na sala</Button>
					</form>
				</div>
			</main>
		</div>
	);
}
