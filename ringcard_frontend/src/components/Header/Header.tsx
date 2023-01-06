import { useState } from "react";
import "../../styles/layout/header.css";
import Modal from "../Modal/MenuModal";
import { Link } from "react-router-dom";

export interface Props {
	userName: String | undefined;
}

function Header(props: Props) {
	const userName = props.userName;
	const handleHomeBtnClick = async () => {
		window.location.href = "/home/unanswered";
	};

	// 모달창 노출 여부 state
	const [showReq, setShowReq] = useState<boolean>(false);

	function openReq() {
		setShowReq(!showReq);
	}

	function closeReq() {
		setShowReq(!showReq);
	}
	return (
		<header className="header">
			<div className="header-blank"></div>

			<div className="top-banner">
				<div className="home-btn" onClick={handleHomeBtnClick}>
					<img src="/buttons/home-icon.svg" width="21px" color="white" alt="" />
				</div>

				<div className="profile-pic">
					<Link
						to={"/userHome/" + userName}
						style={{ width: "39px", height: "39px" }}
					>
						<img
							src="/profile-imgs/oring_1.png"
							width="35px"
							height="35px"
							color="white"
							alt=""
						/>
					</Link>
				</div>

				<div className="menu-btn" onClick={openReq}>
					<img src="/buttons/menu-icon.svg" width="21px" color="white" alt="" />
					<Modal open={showReq} close={closeReq} />
				</div>
			</div>
		</header>
	);
}

export default Header;
