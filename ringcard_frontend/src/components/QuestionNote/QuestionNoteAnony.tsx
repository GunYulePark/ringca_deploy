import { IAnswer, IQuestion } from "../types";
import "../../styles/question.css";
import NowDate from "../utils/NowDate";
import React, { useEffect, useState } from "react";
import HyperlinkBox from "../atoms/HyperlinkBox";

export interface Props {
	idx: number;
	question: IQuestion;
	answer: IAnswer;
}

function QuestionNoteAnony(props: Props) {
	const idx = props.idx;
	const question = props.question;
	const answer = props.answer;
	const [showAnswer, setShowAnswer] = useState<boolean>(false);

	const handleShowAnswerClick = async () => {
		setShowAnswer(!showAnswer);
	};

	const tapePositionList = [
		"width: 130px; height: 28px;  margin: 0 auto;  margin-top: -5px;",
		"width: 130px; height: 28px; margin: 0 auto 0 auto; margin-top: -3.5px; transform: rotate(6deg);",
		"width: 120px; height: 28px; transform: rotate(-30deg); margin: 10px auto -15px -13px;",
		"width: 130px; height: 28px; transform: rotate(-18deg); margin: 7px auto -30px -10px;",
		"width: 130px; height: 28px; transform: rotate(20deg); margin: 6px -8px -10px auto;",
		"width: 100px; height: 28px; transform: rotate(36deg); margin: 10px -13px -10px auto;",
	];

	const chosenPosition = tapePositionList[question.tapePosition - 1];

	const qIdStr = String(question.id);
	const tapeTypeStr = String(question.tapeType);
	const tapeUrl = String("/masking-tapes/tape" + tapeTypeStr + ".svg");

	useEffect(() => {
		const eachNote = document.getElementById(qIdStr);
		eachNote?.setAttribute("style", chosenPosition);
	});

	const qNoteType = question.noteType;

	return (
		<div>
			<div className="each-question-note-box">
				<div className="QuestionNote-maskingTape-box">
					<img
						className="QuestionNoteAnony-maskingTape-img"
						id={qIdStr}
						src={tapeUrl}
						alt=""
					/>
				</div>
				<div
					className="each-question-note-header-edge-img-box"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-top-edge.png")`,
					}}
				></div>
				<div
					className="each-question-note-body"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-body.png")`,
					}}
				>
					<div className="each-note-header">
						<div className="note-profile-pic">
							<img src="/profile-imgs/oring_2.png" alt="" />
						</div>
						<NowDate questionUploadTime={question.uploadTime} />
					</div>
					{/* <a href="/question/<%=question.id%>/anony" className="note-link"> */}
					<a href={"/question/" + qIdStr + "/anony"} className="note-link">
						<div className="each-note-content-box">
							<div className="each-note-content QuestionNoteAnony-line-limit">
								{question.questionContents}
							</div>
						</div>
					</a>
					{question.questionHyperlink == null ||
					question.questionHyperlink === "" ? undefined : (
						<div className="QuestionNote-note-hyperlink-box">
							<HyperlinkBox hyperlinkContent={question.questionHyperlink} />
						</div>
					)}
					<hr className="note-hr" />
					<div className="QuestionNoteAnony-note-footer">
						<div className="QuestionNoteAnony-note-footer-btns-container">
							<button onClick={handleShowAnswerClick}>
								{showAnswer ? (
									<img
										className="note-send-answer-btn"
										src="/buttons/chevron-down-btn.svg"
										alt=""
										style={{ transform: "scaleY(-1)" }}
									/>
								) : (
									<img
										className="note-send-answer-btn"
										src="/buttons/chevron-down-btn.svg"
										alt=""
									/>
								)}
							</button>
						</div>
						{showAnswer ? (
							<div className="QuestionNoteAnony-note-content-answer">
								{answer.answerContents}
							</div>
						) : undefined}
					</div>
				</div>
				<div
					className="QuestionNoteAnony-each-question-note-footer-edge-img-box"
					style={{
						backgroundImage: `url("/notes/note${qNoteType}-bottom-edge.png")`,
					}}
				></div>
			</div>
		</div>
	);
}

export default QuestionNoteAnony;
