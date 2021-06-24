import { ReactNode } from "react";
import Modal from "react-modal";

import styles from "./styles.module.scss";

type QuestionModalProps = {
	isOpen: boolean;
	children?: ReactNode;
	closeModal: () => void;
	confirmButtonAction: () => void;
	title: string;
	text: string;
	cancelButtonText: string;
	confirmButtonText: string;
};

Modal.setAppElement("#root");

export function QuestionModal({
	children,
	isOpen,
	closeModal,
	confirmButtonAction,
	title,
	text,
	cancelButtonText,
	confirmButtonText,
}: QuestionModalProps) {
	return (
		<Modal
			className={styles.Content}
			overlayClassName={styles.Overlay}
			isOpen={isOpen}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			contentLabel="Example Modal">
			<div className={styles.modal}>
				<svg
					width="48"
					height="48"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M29.66 18.3398L18.34 29.6598"
						stroke="#737380"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M29.66 29.6598L18.34 18.3398"
						stroke="#737380"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M24 42V42C14.058 42 6 33.942 6 24V24C6 14.058 14.058 6 24 6V6C33.942 6 42 14.058 42 24V24C42 33.942 33.942 42 24 42Z"
						stroke="#737380"
						strokeWidth="4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>

				<h2>{title}</h2>
				<span>{text}</span>
				<div>
					<button onClick={closeModal}>{cancelButtonText}</button>
					<button onClick={confirmButtonAction}>{confirmButtonText}</button>
				</div>
			</div>
		</Modal>
	);
}
