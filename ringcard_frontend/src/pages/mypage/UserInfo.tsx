import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/layout/layout.css";
import "../../styles/layout/headerNoProfile.css";
import "../../styles/user/userHeader.css";
import "../../styles/user/userBox.css";
import "../../styles/user/userIcon.css";
import "../../styles/userInfo.css";
import HeaderNoProfile from "../../components/Header/HeaderNoProfile";
import UserProfile from "../../components/atoms/UserProfile";
import Toastify from "../../components/utils/Toast";
import { Link } from "react-router-dom";

const UserInfo = () => {
	const [user, setUser] = useState<any>([]);
	useEffect(() => {
		axios
			.get("/mypage/info")
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	function BtnToEditUserRingcardName() {
		function handleClick(e: any) {
			window.location.href = "/mypage/info/edit/userRingcardName";
		}
		return (
			<button className="user-box-btn" onClick={handleClick}>
				변경
			</button>
		);
	}

	function BtnToEditUserEmail() {
		function handleClick(e: any) {
			window.location.href = "/mypage/info/edit/userEmail";
		}
		return (
			<button className="user-box-btn" onClick={handleClick}>
				변경
			</button>
		);
	}

	function BtnToEditPw() {
		function handleClick(e: any) {
			window.location.href = "/mypage/edit/password";
		}
		return (
			<button className="user-box-btn" onClick={handleClick}>
				변경
			</button>
		);
	}

	function BtnToEditEmailAlert() {
		function handleClick(e: any) {
			window.location.href = "/mypage/info/edit/emailAlert";
		}
		return (
			<button className="user-box-btn" onClick={handleClick}>
				변경
			</button>
		);
	}

	return (
		<div className="container">
			<HeaderNoProfile />
			<Toastify />
			<div className="userInfo-profile-container">
				<UserProfile />
				<div className="user-profile-name">{user.userRingcardName}</div>
			</div>
			<div>
				<div className="user-box">
					<div className="user-box-in">
						<div className="user-text">이름</div>
						<div className="user-box-div user-icon-dark">
							<input
								className="user-inner-transparent"
								value={user.userRingcardName}
								readOnly
							></input>
							<BtnToEditUserRingcardName />
						</div>
					</div>

					{/* 				
					<div className="user-box-in">
						<div className="user-text">이름</div>
						<input
							className="user-icon user-icon-user-dark"
							placeholder={user.userRingcardName}
							readOnly
						></input>
					</div> */}

					<div className="user-box-in">
						<div className="user-text">아이디</div>
						<input
							className="user-icon user-icon-id-dark"
							placeholder={user.username}
							readOnly
						></input>
					</div>

					<div className="user-box-in">
						<div className="user-text">비밀번호</div>
						<div className="user-box-div user-icon-dark">
							<input
								className="user-inner-transparent"
								defaultValue="●●●●●●●●●●"
								// placeholder="●●●●●●●●●●"
								readOnly
							></input>
							<BtnToEditPw />
						</div>
					</div>

					{/* <div className="user-box-in">
						<div className="user-text">이메일</div>
						<input
							className="user-icon user-icon-email-dark"
							placeholder={user.userEmail}
							readOnly
						></input>
					</div> */}

					<div className="user-box-in">
						<div className="user-text">이메일</div>
						<div className="user-box-div user-icon-dark">
							<input
								className="user-inner-transparent"
								value={user.userEmail}
								readOnly
							></input>
							<BtnToEditUserEmail />
						</div>
					</div>

					<div className="user-box-in">
						<div className="user-text">이메일 알림 수신 여부</div>
						<div className="user-box-div user-icon-dark">
							{user.emailAlert ? (
								<div className="UserInfo-isEmailAlert-text">받기</div>
							) : (
								<div className="UserInfo-isEmailAlert-text">받지 않기</div>
							)}
							<BtnToEditEmailAlert />
						</div>
					</div>

					{/* <div className="user-box-in">
						<div className="user-text">아이디</div>
						<input
							className="user-icon user-icon-id-dark"
							placeholder={user.username}
							readOnly
						></input>
					</div> */}

					<div className="user-box-in">{/* <ButtonToUserInfoEdit /> */}</div>
				</div>
			</div>

			<div className="userInfo-delete-box">
				<div className="userInfo-delete">
					<Link
						className="userInfo-delete-text"
						to="/mypage/delete/account"
						style={{
							textDecorationLine: "underline",
							textDecorationColor: "white",
							textDecorationThickness: "0.5px",
							color: "white",
						}}
					>
						링카 계정을 완전히 지우고 싶어요
					</Link>
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
