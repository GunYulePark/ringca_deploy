import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditAnswerFormQuestionNote from "../../components/AnswerNote/EditAnswerFormQuestionNote";
import Header from "../../components/Header/Header";
import "../../styles/layout/layout.css";
import "../../styles/question-page.css";

function QuestionAnswered() {
	const params = useParams();
	const paramsQuestionId = params.questionId;

	const [userName, setUserName] = useState<String>();
	const [question, setQuestion] = useState<any>([]);
	const [oldAnswer, setOldAnswer] = useState<any>([]);

	useEffect(() => {
		axios
			.get("/question/" + paramsQuestionId + "/edit/user")
			.then((res) => {
				setQuestion(res.data.question);
				setOldAnswer(res.data.oldAnswer);
				setUserName(res.data.userName);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, [paramsQuestionId]);

	return (
		<div className="container">
			<Header userName={userName} />
			<div className="contents-container">
				<div className="questionPage-the-question-container">
					<EditAnswerFormQuestionNote
						question={question}
						oldAnswer={oldAnswer}
					/>
				</div>
			</div>
		</div>
	);
}

export default QuestionAnswered;
