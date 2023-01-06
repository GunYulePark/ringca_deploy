import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerFormQuestionNote from "../../components/AnswerNote/AnswerFormQuestionNote";
import Header from "../../components/Header/Header";
import "../../styles/layout/layout.css";
import "../../styles/question-page.css";

function QuestionUnanswered() {
	const params = useParams();
	const paramsQuestionId = params.questionId;

	const [userName, setUserName] = useState<String>();
	const [question, setQuestion] = useState<any>([]);

	useEffect(() => {
		axios
			.get("/question/" + paramsQuestionId + "/unanswered/user")
			.then((res) => {
				setUserName(res.data.userName);
				setQuestion(res.data.question);
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
					<AnswerFormQuestionNote question={question} />
				</div>
			</div>
		</div>
	);
}

export default QuestionUnanswered;
