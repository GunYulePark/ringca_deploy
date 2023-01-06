import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/home.css";
import Header from "../../components/Header/Header";
import Navigation from "../../components/atoms/Navigation";
import QuestionNoteList from "../../components/QuestionNote/QuestionNoteList";
import { useSearchParams } from "react-router-dom";
import ClearTrashcanModal from "../../components/Modal/ClearTrashcanModal";

function HomeUnanswered() {
	const [searchParams] = useSearchParams();
	const page = searchParams.get("page");
	const [questionList, setQuestionList] = useState<any[]>([]);
	const [totalPages, setTotalPages] = useState<number>();
	const [pageNumber, setPageNumber] = useState(0);
	const [userName, setUserName] = useState<String>();

	const pageAddress = "trashcan";

	useEffect(() => {
		axios
			.get("/home/" + pageAddress + "?page=" + page)
			.then((res) => {
				setUserName(res.data.userName);
				setQuestionList(res.data.questions.content);
				setTotalPages(res.data.questions.totalPages);
				setPageNumber(res.data.questions.number);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	// 모달창 노출 여부 state
	const [showReq, setShowReq] = useState<boolean>(false);

	function openReq() {
		setShowReq(!showReq);
	}

	function closeReq() {
		setShowReq(!showReq);
	}

	return (
		<div className="container">
			<Header userName={userName} />
			<Navigation
				page={page}
				pageAddress={pageAddress}
				totalPages={totalPages}
				pageNumber={pageNumber}
			/>
			<ClearTrashcanModal open={showReq} close={closeReq} />
			<div className="container-body">
				<QuestionNoteList questionList={questionList} />
			</div>

			<div className="clear-trashcan">
				<img
					src="/buttons/home-trashcan-tab-active-button.svg"
					onClick={openReq}
					alt=""
				/>
				<div className="clear-trashcan-text">비우기</div>
			</div>
		</div>
	);
}

export default HomeUnanswered;
