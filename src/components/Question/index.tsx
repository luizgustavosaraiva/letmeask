import { ReactNode } from "react";
import styles from "./styles.module.scss";

type QuestionProps = {
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	isHighlighted?: boolean;
	isAnswered?: boolean;
	children?: ReactNode;
};

export function Question({
	content,
	author,
	isAnswered = false,
	isHighlighted = false,
	children,
}: QuestionProps) {
	return (
		<div
			className={`${styles.question} ${isAnswered && styles.answered} ${
				isHighlighted && !isAnswered && styles.highlighted
			}`}>
			<p>{content}</p>
			<footer>
				<div className={styles.user_info}>
					<img src={author.avatar} alt={author.name} />
					<span>{author.name}</span>
				</div>
				<div>{children}</div>
			</footer>
		</div>
	);
}
