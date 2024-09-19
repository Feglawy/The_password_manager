import Input from "../Input";
import PasswordContainer from "./PasswordContainer";
import Button from "./Button";
import "../../styles/utils.css";

const AccountForm = () => {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1 style={{ textAlign: "center" }}>Add a Account</h1>
				<Input type="text" label="Username" className="w-95" />
				<PasswordContainer className="w-95" />
				<Input
					textarea={true}
					placeholder="Disctiption (optional)"
					className="w-95"
				/>
				<Button children="Submit" type="submit" />
			</form>
		</>
	);
};

export default AccountForm;
