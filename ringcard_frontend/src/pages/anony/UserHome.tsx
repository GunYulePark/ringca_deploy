import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionNoteListAnony from "../../components/QuestionNote/QuestionNoteListAnony";
import SendQuestionForm from "../../components/SendQuestionForm/SendQuestionFormUserHome";
import "../../styles/layout/layout.css";
import "../../styles/userHome.css";

import "react-toastify/dist/ReactToastify.css";
import { IAnswer, IQuestion } from "../../components/types";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";

function UserHome() {
	const params = useParams();
	const userName = String(params.userName);
	const [userRingcardName, setUseRingcardrName] = useState<String>();

	const [map, setMap] = useState<[IQuestion, IAnswer][]>();

	const [totalPages, setTotalPages] = useState<Number>(0);
	const [pageNumber, setPageNumber] = useState<Number>(0);
	const questionId = "dummy";

	useEffect(() => {
		axios
			.get("/userHome/" + userName + "/0")
			.then((res) => {
				console.log(res.data);
				setUseRingcardrName(res.data.userRingcardName);
				setMap(res.data.map);
				setTotalPages(res.data.pageInfo.totalPages);
				setPageNumber(res.data.pageInfo.number + 1);
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
					.get("/userHome/" + userName + "/" + newPage)
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
							<div>
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
			<HeaderNoProfile />

			<div className="contents-container block">
				<div className="UserHome-profile-box">
					<img src="/profile-imgs/oring_1.png" alt="" />
					<div className="UserHome-profile-username">{userRingcardName}</div>
				</div>
				<div className="UserHome-SendQuestionForm-container">
					<SendQuestionForm userName={userName} />
				</div>

				<div className="UserHome-questionlist-box">
					<div className="UserHome-down-background-img">
						<div style={{ height: "30px" }}></div>
						<div>
							{map ? (
								<QuestionNoteListAnony questionId={questionId} map={map} />
							) : undefined}
						</div>
						<BtnToViewMore />
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserHome;
