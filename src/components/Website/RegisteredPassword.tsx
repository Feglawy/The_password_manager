import Input from "../Input";
import PasswordContainer from "./PasswordContainer";
import "../../styles/RegisteredPassword.css";
import DropDownMenu from "../DropDownMenu";
import { copyToClipboard } from "../../Utils";

interface Account {
	serviceImgSrc?: string;
	username?: string;
	password?: string;
}

const RegisteredPassword = ({ serviceImgSrc, username, password }: Account) => {
	const handleCopy = () => {
		try {
			copyToClipboard(username + ":" + password);
		} catch (error) {
			console.error("Could not copy text:", error);
		}
	};
	const handleDelete = () => console.log("Delete clicked");
	const handleEdit = () => console.log("Edit clicked");

	const RegisteredPasswordControls = [
		{ label: "Copy", onClick: handleCopy },
		{ label: "Edit", onClick: handleEdit },
		{ label: "Delete", onClick: handleDelete },
	];
	return (
		<div className="password-card">
			{serviceImgSrc && (
				<div style={{ height: "56px" }}>
					<div className="service">
						<img
							src={serviceImgSrc}
							style={{ width: "56px", height: "56px" }}
						/>
					</div>
				</div>
			)}
			<div style={{ position: "absolute", top: "3%", right: "5%" }}>
				<DropDownMenu items={RegisteredPasswordControls} />
			</div>
			<Input label="Username" disabled value={username} className="w-90" />
			<PasswordContainer value={password} className="w-90" />
		</div>
	);
};

export default RegisteredPassword;
