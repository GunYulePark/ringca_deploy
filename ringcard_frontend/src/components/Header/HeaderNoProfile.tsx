import { useState } from "react";
import "../../styles/layout/headerNoProfile.css";
import Modal from "../Modal/MenuModal";

function HeaderNoProfile() {
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
		<header className="header-noprofile">
			<div className="header-blank"></div>

			<div className="top-banner">
				<div className="home-btn" onClick={handleHomeBtnClick}>
					<img src="/buttons/home-icon.svg" width="21px" color="white" alt="" />
				</div>

				<div className="menu-btn" onClick={openReq}>
					<img src="/buttons/menu-icon.svg" width="21px" color="white" alt="" />
					<Modal open={showReq} close={closeReq} />
				</div>
			</div>
		</header>
	);
}

export default HeaderNoProfile;
