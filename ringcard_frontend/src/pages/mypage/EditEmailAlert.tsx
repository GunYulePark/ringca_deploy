import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/header.css";
import "../../styles/user/userHeader.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/editUserInfo.css";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";
import { useForm } from "react-hook-form";
import UserProfile from "../../components/atoms/UserProfile";
import { Link } from "react-router-dom";

const EditEmailAlert = () => {

	const [user, setUser] = useState<any>([]);
	const [emailAlert, setEmailAlert] = useState();

	useEffect(() => {
		axios
			.get("/mypage/info/edit")
			.then((res) => {
				setUser(res.data);
				setEmailAlert(res.data.emailAlert);
			})
			.catch(function (error) {
				console.log(error.config);
			});
	}, []);

	const onSubmit = async (data: any) => {
		await new Promise((r) => setTimeout(r, 100));
		await axios
			.post("/mypage/info/edit/emailAlert", data)
			.then((res) => {
				window.location.href = "/mypage/info";
			})
			.catch(function (error) {
				console.log(error.config);
			});
	};

	const {
		register,
		handleSubmit,
	} = useForm();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="container">
				<HeaderNoProfile />
				<div className="userInfo-profile-container">
					<UserProfile />
					<div className="user-profile-name">{user.userRingcardName}</div>
				</div>

				<div>
					<div className="user-box">
						<div className="user-box-in" style={{ color: "white" }}>
							<label>
								<input
									type="checkbox"
									{...register("emailAlert")}
									defaultChecked={emailAlert}
								/>
								이메일로 새 질문 알림을 받겠습니다.
							</label>
						</div>

						<div className="user-box-in flex-spacebetween">
							<button type="button" className="cancel-btn">
								<Link to="/mypage/info" style={{ textDecoration: "none" }}>
									<div className="user-btn-text">취소하기</div>
								</Link>
							</button>
							<button type="submit" className="editUserInfo-btn">
								<div className="user-btn-text">저장하기</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default EditEmailAlert;
