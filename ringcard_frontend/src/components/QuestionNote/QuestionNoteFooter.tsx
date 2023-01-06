import React from "react";
import { IQuestion } from "../types";
import "../../styles/question.css";
import axios from "axios";
import { Link } from "react-router-dom";

export interface FooterProps {
	question: IQuestion;
}

function FooterUnansweredQuestion(props: FooterProps) {
	const question = props.question;

	const handleTrashcanClick = async () => {
		const questionId = String(question.id);
		await axios
			.get("/question/" + questionId + "/delete/question")
			.then((res) => {
				window.history.go(0); // referrer로 이전 페이지를 받아오면 안 된다. 현재 페이지를 해야됨!!!
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const handleRestoreClick = async () => {
		const questionId = String(question.id);
		await axios
			.get("/question/" + questionId + "/restore/question")
			.then((res) => {
				window.history.go(0);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const handleCollectionClick = async () => {
		const questionId = String(question.id);
		await axios
			.get("/question/" + questionId + "/inCollection")
			.then((res) => {
				window.history.go(0);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const handleDeleteAnswerClick = async () => {
		const questionId = String(question.id);
		await axios
			.get("/question/" + questionId + "/deleteAnswer")
			.then((res) => {
				window.history.go(0);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	return (
		<>
			<div className="note-footer">
				<div className="note-footer-leftside-btns-container">
					{question.inTrash === false ? (
						<button onClick={handleTrashcanClick}>
							<img
								className="note-trashcan-btn"
								src="/buttons/note-trashcan-btn.svg"
								alt=""
							/>
						</button>
					) : (
						<button onClick={handleRestoreClick}>
							<img
								className="note-trashcan-btn"
								src="/buttons/restore-from-trashcan-button.svg"
								alt=""
							/>
						</button>
					)}

					<button onClick={handleCollectionClick}>
						{question.inCollection === false ? (
							<img
								className="note-collection-btn"
								src="/buttons/note-collection-btn.svg"
								alt=""
							/>
						) : (
							<img
								className="note-collection-btn"
								src="/buttons/note-collection-active-btn.svg"
								alt=""
							/>
						)}
					</button>
				</div>
				<div className="note-footer-rightside-btns-container">
					{question.answered === false ? (
						<Link to={`/question/${question.id}/unanswered/user`}>
							<button>
								<img
									className="note-send-answer-btn"
									src="/buttons/send-answer-btn.svg"
									alt=""
								/>
							</button>
						</Link>
					) : (
						<React.Fragment>
							<Link to={`/question/${question.id}/edit/user`}>
								<button>
									<img
										className="note-edit-answer-btn"
										src="/buttons/edit-answer-btn.svg"
										alt=""
									/>
								</button>
							</Link>
							<button onClick={handleDeleteAnswerClick}>
								<img
									className="note-delete-answer-btn"
									src="/buttons/delete-answer-btn.svg"
									alt=""
								/>
							</button>
						</React.Fragment>
					)}
				</div>
			</div>
		</>
	);
}

export default FooterUnansweredQuestion;
