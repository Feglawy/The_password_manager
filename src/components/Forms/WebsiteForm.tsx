import { useState } from "react";
import Input from "../Input";
import InputImage from "../InputImage";
import Button from "./Button";
import "../../styles/utils.css";
import { useNotification } from "../../context/NotificationContext";

const WebsiteForm = () => {
	const { addNotification } = useNotification();
	const [image, setImage] = useState<string | null>(null);
	const [websiteName, setWebsiteName] = useState("");
	const [websiteLink, setWebsiteLink] = useState("");
	const [description, setDescription] = useState("");

	const handleImageSelect = (selectedImage: string | null) => {
		setImage(selectedImage);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (image) {
			const imagePath = await window.api.saveFile(image);
			setImage(imagePath);
		}
		window.websiteApi
			.addWebsite({
				name: websiteName,
				url: websiteLink,
				iconSrc: image,
				description: description,
			})
			.then((result) => {
				if (result.success) {
					addNotification("success", result.message);
					setImage(null);
					setWebsiteName("");
					setWebsiteLink("");
					setDescription("");
				} else {
					addNotification("error", result.message);
				}
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1 style={{ textAlign: "center" }}>Add a website</h1>
			<InputImage onImageSelect={handleImageSelect} />

			<Input
				type="text"
				label="Website Name"
				className="w-95"
				required
				value={websiteName}
				onChange={(e) => setWebsiteName(e.target.value)}
			/>

			<Input
				type="url"
				label="Website Link"
				className="w-95"
				required
				value={websiteLink}
				onChange={(e) => setWebsiteLink(e.target.value)}
			/>

			<Input
				textarea={true}
				placeholder="Description (optional)"
				className="w-95"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<Button children="Submit" type="submit" />
		</form>
	);
};

export default WebsiteForm;
