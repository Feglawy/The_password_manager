import { useState } from "react";
import "../../styles/AddNew.css";
import "../../styles/utils.css";
import AccountForm from "../Forms/AccountForm";
import WebsiteForm from "../Forms/WebsiteForm";
import SignedInByForm from "../Forms/SignedInByForm";

import ModalPopUp from "../ModalPopUp"; // Assuming you're using the modal from the previous example
import RadioInputs from "../controls/RadioInputs";
import RadioInput from "../controls/RadioInput";

type FormTypes = "account" | "website" | "signedInBy";

function Add() {
	const [selectedForm, setSelectedForm] = useState<FormTypes | null>(null);

	const openModal = (value: FormTypes) => {
		setSelectedForm(value);
	};

	const closeModal = () => {
		setSelectedForm(null);
	};

	return (
		<div className="main-content">
			<div
				style={{
					alignItems: "center",
					height: "100%",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<RadioInputs>
					<RadioInput
						name="Website"
						onClick={() => {
							openModal("website");
						}}
					/>
					<RadioInput
						name="Account"
						onClick={() => {
							openModal("account");
						}}
					/>
					<RadioInput
						name="Signed In By"
						onClick={() => {
							openModal("signedInBy");
						}}
					/>
				</RadioInputs>
			</div>
			<ModalPopUp
				isOpen={selectedForm === "account"}
				onClose={() => closeModal()}
			>
				<AccountForm />
			</ModalPopUp>

			<ModalPopUp
				isOpen={selectedForm === "website"}
				onClose={() => closeModal()}
			>
				<WebsiteForm />
			</ModalPopUp>

			<ModalPopUp
				isOpen={selectedForm === "signedInBy"}
				onClose={() => closeModal()}
			>
				<SignedInByForm />
			</ModalPopUp>
		</div>
	);
}

export default Add;
