import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnsweredQuestionNote from "../../components/QuestionNote/AnsweredQuestionNote";
import Header from "../../components/Header/Header";
import QuestionNoteListAnony from "../../components/QuestionNote/QuestionNoteListAnony";
import SendQuestionForm from "../../components/SendQuestionForm/SendQuestionFormQuestionAnony";
import { IAnswer, IQuestion } from "../../components/types";

import "../../styles/questionAnony.css";

function QuestionAnony() {
	const params = useParams();
	const questionId = params.questionId;
	const [userName, setUserName] = useState<String>();

	const [question, setQuestion] = useState<any>([]);
	const [answer, setAnswer] = useState<any>([]);

	const [map, setMap] = useState<[IQuestion, IAnswer][]>();

	const [totalPages, setTotalPages] = useState<Number>(0);
	const [pageNumber, setPageNumber] = useState<Number>(0);
	// const { page } = useParams();

	useEffect(() => {
		axios
			.get("/question/" + questionId + "/anony/0")
			.then((res) => {
				setQuestion(res.data.question);
				setAnswer(res.data.answer);
				setMap(res.data.map);
				setTotalPages(res.data.pageInfo.totalPages);
				setPageNumber(res.data.pageInfo.number + 1);
				setUserName(res.data.userName);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	function BtnToViewMore() {
		function handleClick(e: any) {
			const newPage = pageNumber;
			if (totalPages === undefined) {
			} else if (newPage >= totalPages) {
			} else {
				axios
					.get("/question/" + questionId + "/anony/" + newPage)
					.then((res) => {
						const b: [[IQuestion, IAnswer]] = res.data.map;
						let mapTemp = [];
						if (map) {
							for (let idx = 0; idx < map.length; idx++) {
								mapTemp.push(map[idx]);
							}
						}
						if (b) {
							for (let idx = 0; idx < b.length; idx++) {
								mapTemp.push(b[idx]);
							}
						}
						if (mapTemp) {
							setMap(mapTemp);
						}

						setTotalPages(res.data.pageInfo.totalPages);
						setPageNumber(res.data.pageInfo.number + 1);
					})
					.catch(function (error) {
						console.log(error.config);
					});
			}
		}
		return (
			<div>
				{map ? (
					<div>
						{map.length > 0 ? (
							<div className="QuestionAnony-viewMore-btn-box">
								{totalPages === pageNumber ? undefined : (
									<div className="QuestionAnony-viewMore-btn-container">
										<div className="QuestionAnony-viewMore-btn-section">
											<button
												className="QuestionAnony-viewMore-btn"
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
			<div className="QuestionAnony-for-not-overflowing">
				<img src="/background-img/background.png" alt="" />
			</div>
			<div className="contents-container QuestionAnony-container">
				<div className="QuestionAnony-the-question-container">
					<AnsweredQuestionNote question={question} answer={answer} />
				</div>
				<div className="QuestionAnony-SendQuestionForm-container">
					<SendQuestionForm />
				</div>
				<div className="QuestionAnony-hr-box">
					<hr className="QuestionAnony-hr" />

					<div className="QuestionAnony-hr-text">다른 응답된 질문들</div>
					<hr className="QuestionAnony-hr" />
				</div>
				<div>
					{map && questionId ? (
						<QuestionNoteListAnony questionId={questionId} map={map} />
					) : undefined}
				</div>

				<BtnToViewMore />
			</div>
		</div>
	);
}

export default QuestionAnony;
