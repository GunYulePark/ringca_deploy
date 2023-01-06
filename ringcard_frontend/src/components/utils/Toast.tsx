import { toast, ToastContainer, Zoom} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";


// props 써서.
function Toastify() {

  if(localStorage.getItem("toastShow")==="1"){
			toast(String(localStorage.getItem("toastText")), { 
					autoClose: 700,
					position:"top-center", 
					pauseOnFocusLoss: true,
					hideProgressBar: true,
					draggable: true, 
					pauseOnHover: true,
					theme: "dark",
					closeButton: false,
					transition: Zoom,
				});
			localStorage.removeItem("toastShow");
			localStorage.removeItem("toastText");
		}

  return(
  <ToastContainer/>
	)
}

export default Toastify;