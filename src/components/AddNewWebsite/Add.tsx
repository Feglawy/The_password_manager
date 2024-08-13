import Input from "./Input";
import InputImage from "./InputImage";
import PasswordContainer from "./PasswordContainer";
import "../../styles/AddNew.css";
import "../../styles/utils.css";
import Button from "./Button";

function Add() {
	return (
		<>
			<form action="" method="post">
				<InputImage />
				<Input label="Username" id="username-inp" className="w-90" />
				<div className="website-container">
					<Input label="Website Name" id="website-name" />
					<Input label="Website Link" id="website-link" />
				</div>
				<PasswordContainer className="w-90" />
				<Button children="Submit" type="submit" />
			</form>
		</>
	);
}

export default Add;
