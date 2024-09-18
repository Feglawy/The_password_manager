import { useState } from "react";
import Input from "../Input";
import InputImage from "../InputImage";
import Button from "./Button";
import "../../styles/utils.css";

const WebsiteForm = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file

	const handleImageSelect = (file: File | null) => {
		setSelectedFile(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1 style={{ textAlign: "center" }}>Add a website</h1>
				<InputImage onImageSelect={handleImageSelect} />
				<Input type="text" label="Website Name" className="w-95" required />
				<Input type="url" label="Website Link" className="w-95" required />
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

export default WebsiteForm;
