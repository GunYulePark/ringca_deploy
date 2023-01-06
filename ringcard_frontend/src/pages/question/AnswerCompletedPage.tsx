import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnsweredQuestionNote from "../../components/QuestionNote/AnsweredQuestionNote";
import Header from "../../components/Header/Header";
import QuestionNoteList from "../../components/QuestionNote/QuestionNoteList";
import "../../styles/answerCompletedPage.css";

function AnswerCompletedPage() {
	const [userName, setUserName] = useState<String>();

	const { questionId } = useParams();
	const [question, setQuestion] = useState<any>([]);
	const [answer, setAnswer] = useState<any>([]);
	const [questionList, setQuestionList] = useState<any[]>([]);

	const [totalPages, setTotalPages] = useState<Number>(0);
	const [pageNumber, setPageNumber] = useState<Number>(0);

	useEffect(() => {
		axios
			.get("/question/" + questionId + "/completed/user/0")
			.then((res) => {
				setUserName(res.data.userName);
				setQuestionList(res.data.questions.content);
				setQuestion(res.data.question);
				setAnswer(res.data.answer);
				setTotalPages(res.data.questions.totalPages);
				setPageNumber(res.data.questions.number + 2);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, [questionId]);

	function BtnToViewMore() {
		function handleClick(e: any) {
			let newPage = pageNumber;
			if (totalPages === undefined) {
			} else if (newPage >= totalPages) {
			} else {
				axios
					.get("/question/" + questionId + "/completed/user/" + newPage)
					.then((res) => {
						const a: any[] = res.data.questions.content;
						let mapTemp = [];
						if (questionList) {
							for (let idx = 0; idx < questionList.length; idx++) {
								mapTemp.push(questionList[idx]);
							}
						}
						if (a) {
							for (let idx = 0; idx < a.length; idx++) {
								mapTemp.push(a[idx]);
							}
						}
						if (mapTemp) {
							setQuestionList(mapTemp);
						}
						setTotalPages(res.data.questions.totalPages);
						setPageNumber(res.data.questions.number + 1);
					})
					.catch(function (error) {
						console.log(error.config);
					});
			}
		}
		return (
			<div>
				{questionList ? (
					<div>
						{questionList.length > 0 ? (
							<div className="UserHome-viewMore-btn-box">
								{totalPages === pageNumber ? undefined : (
									<div className="UserHome-viewMore-btn-container">
										<div className="UserHome-viewMore-btn-section">
											<button
												className="UserHome-viewMore-btn"
												onClick={handleClick}
											>
												+ 더보기
											</button>
										</div>
									</div>
								)}
							</div>
						) : null}
					</div>
				) : null}
			</div>
		);
	}

	return (
		<div className="container">
			<Header userName={userName} />
			<div className="contents-container">
				<div className="questionPage-the-question-container">
					<AnsweredQuestionNote question={question} answer={answer} />
				</div>
				<div className="QuestionPage-hr-box">
					<hr className="QuestionPage-hr" />

					<div className="QuestionPage-hr-text">미응답 질문들</div>
					<hr className="QuestionPage-hr" />
				</div>
				<div className="questionPage-container-body">
					<div>
						<QuestionNoteList questionList={questionList} />
					</div>

					<BtnToViewMore />
				</div>
			</div>
		</div>
	);
}

export default AnswerCompletedPage;
