import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import HomeUnanswered from "./pages/home/HomeUnanswered";
import UserInfo from "./pages/mypage/UserInfo";
import HomeAnswered from "./pages/home/HomeAnswered";
import HomeCollection from "./pages/home/HomeCollection";
import HomeTrashcan from "./pages/home/HomeTrashcan";

import QuestionUnanswered from "./pages/question/QuestionUnanswered";
import Login from "./pages/auth/Login";
import Join from "./pages/auth/Join";
import EditPassword from "./pages/mypage/EditPassword";
import AnswerCompletedPage from "./pages/question/AnswerCompletedPage";
import QuestionAnswered from "./pages/question/QuestionAnswered";
import UserHome from "./pages/anony/UserHome";
import DeleteAccount from "./pages/mypage/DeleteAccount";
import QuestionAnony from "./pages/anony/QuestionAnony";
import Logout from "./pages/auth/Logout";
import PrivateRoute from "./components/auth/PrivateRoute";
import isLogin from "./utils/isLogin";
import EditUserRingcardName from "./pages/mypage/EditUserRingcardName";
import EditUserEmail from "./pages/mypage/EditUserEmail";
import FindPassword from "./pages/auth/FindPassword";
import EditEmailAlert from "./pages/mypage/EditEmailAlert";
import SuggestionPage from "./pages/suggestion/SuggestionPage";
import TwitterLoginProcess from "./pages/auth/Twitter/TwitterLoginProcess";

const AppRouter = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="" element={<Login />} />
					<Route path="/" element={<Login />} />
					<Route path="/loginForm" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/joinForm" element={<Join />} />
					<Route path="/findPassword" element={<FindPassword />} />
					<Route path="/userHome/:userName" element={<UserHome />} />
					<Route
						path="/question/:questionId/anony"
						element={<QuestionAnony />}
					/>
					{/* <Route path="/oauth2" element={<BtnToTwitterLogin />}/> */}
					<Route
						path="/login/oauth2/code/twitter"
						element={<TwitterLoginProcess />}
					/>
					<Route path="/userHome/:userName" element={<UserHome />} />
					<Route
						path="/home/unanswered"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<HomeUnanswered />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/home/answered"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<HomeAnswered />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/home/trashcan"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<HomeTrashcan />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/home/collection"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<HomeCollection />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/question/:questionId/unanswered/user"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<QuestionUnanswered />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/question/:questionId/edit/user"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<QuestionAnswered />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/question/:questionId/completed/user"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<AnswerCompletedPage />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>

					<Route
						path="/mypage/info"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<UserInfo />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/mypage/info/edit/userRingcardName"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<EditUserRingcardName />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/mypage/edit/password"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<EditPassword />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/mypage/info/edit/userEmail"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<EditUserEmail />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/mypage/info/edit/emailAlert"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<EditEmailAlert />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
					<Route
						path="/mypage/delete/account"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<DeleteAccount />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>

					<Route
						path="/suggestion"
						element={
							<PrivateRoute
								authenticated={isLogin()}
								component={<SuggestionPage />}
								noAuthComponent={<Navigate to="/loginForm" />}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};
export default AppRouter;
