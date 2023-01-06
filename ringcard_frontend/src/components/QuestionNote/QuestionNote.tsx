import { IQuestion } from "../types";
import QuestionFooter from "./QuestionNoteFooter";
import "../../styles/question.css";
import NowDate from "../utils/NowDate";
import HyperlinkBox from "../atoms/HyperlinkBox";

import { useEffect } from "react";
import { Link } from "react-router-dom";

export interface Props {
	idx: number;
	question: IQuestion;
}

function QuestionNote(props: Props) {
	const idx = props.idx;
	const question = props.question;

	const tapePositionList = [
		"width: 130px; height: 28px; margin: 0 auto; margin-top: -25px;",
		"width: 130px; height: 28px; margin: 0 auto 0 auto; margin-top: -22.5px; transform: rotate(6deg);",
		"width: 120px; height: 28px; transform: rotate(-30deg); margin: -10px auto -15px -40px;",
		"width: 130px; height: 28px; transform: rotate(-18deg); margin: -20px auto -30px -30px;",
		"width: 130px; height: 28px; transform: rotate(20deg); margin: -12px -40px -10px auto;",
		"width: 100px; height: 28px; transform: rotate(36deg); margin: -10px -40px -10px auto;",
	];
	const chosenPosition = tapePositionList[question.tapePosition - 1];

	const qIdStr = String(question.id);
	const tapeTypeStr = String(question.tapeType);
	const tapeUrl = String("/masking-tapes/tape" + tapeTypeStr + ".svg");

	useEffect(() => {
		const eachNote = document.getElementById(qIdStr);
		eachNote?.setAttribute("style", chosenPosition);
	});

	const qNoteType = String(question.noteType);

	return (
		<div
			className="question-note"
			key={idx}
			style={{
				backgroundImage: `url("/notes/note${qNoteType}.png")`,
			}}
		>
			<div className="QuestionNote-maskingTape-box">
				<img
					className="QuestionNote-maskingTape-img"
					id={qIdStr}
					src={tapeUrl}
					alt=""
				/>
			</div>
			<div className="note-header">
				<div className="note-profile-pic">
					<img src="/profile-imgs/oring_2.png" alt="" />
				</div>
				{/* <div className="note-time">{nowDate}</div> */}
				<NowDate questionUploadTime={question.uploadTime} />
			</div>

			{question.answered === true ? (
				<Link
					to={"/question/" + question.id + "/edit/user"}
					className="note-link"
				>
					<div className="note-content-box">
						<div className="note-content">{question.questionContents}</div>
					</div>
				</Link>
			) : (
				<Link
					to={"/question/" + question.id + "/unanswered/user"}
					className="note-link"
				>
					<div className="note-content-box">
						<div className="note-content">{question.questionContents}</div>
					</div>
				</Link>
			)}

			{question.questionHyperlink == null ||
			question.questionHyperlink === "" ? undefined : (
				<div className="QuestionNote-note-hyperlink-box">
					<HyperlinkBox hyperlinkContent={question.questionHyperlink} />
				</div>
			)}

			<hr className="note-hr" />
			<QuestionFooter question={question} />
		</div>
	);
}

export default QuestionNote;
