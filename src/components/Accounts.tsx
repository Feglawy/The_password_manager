import Website from "./Website/Website";
import "../styles/Accounts.css";

const Accounts = () => {
	return (
		<div className="main-content">
			<Website websiteName="FaceBook" />
			<Website websiteName="Instagram" />
		</div>
	);
};

export default Accounts;
