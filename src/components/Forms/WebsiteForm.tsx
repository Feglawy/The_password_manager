import { useEffect, useState } from "react";
import Input from "../controls/Input";
import InputImage from "../controls/InputImage";
import Button from "../controls/Button";
import "../../styles/utils.css";
import { useNotification } from "../../context/NotificationContext";
import { Website as IWebsite } from "../electron";

interface WebsiteFormProps {
	initialData?: IWebsite;
	isEditing?: boolean;
	onSubmit?: (updatedWebsite?: IWebsite) => void;
}

const WebsiteForm = ({
	initialData,
	isEditing,
	onSubmit,
}: WebsiteFormProps) => {
	const { addNotification } = useNotification();
	const [image, setImage] = useState<string | null>(null);
	const [websiteName, setWebsiteName] = useState("");
	const [websiteLink, setWebsiteLink] = useState("");
	const [description, setDescription] = useState("");

	const [resetImage, setResetImage] = useState(false);

	const handleImageSelect = (selectedImage: string | null) => {
		setImage(selectedImage);
		setResetImage(false);
	};

	const resetForm = () => {
		setImage(null);
		setResetImage(true);
		setWebsiteName("");
		setWebsiteLink("");
		setDescription("");
	};

	const handleAddingWebsite = async (imagePath: string | null) => {
		const websiteData = {
			id: initialData?.id,
			name: websiteName,
			url: websiteLink,
			icon: imagePath,
			description: description,
		};

		const result = initialData
			? await window.websiteApi.editWebsite(websiteData)
			: await window.websiteApi.addWebsite(websiteData);
		if (result.success) {
			addNotification("success", result.message);
			if (onSubmit) {
				onSubmit(websiteData);
			}
			resetForm();
		} else {
			addNotification("error", result.message);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Check if an image is provided
		if (image) {
			window.api.saveFile(image).then((imagePath) => {
				handleAddingWebsite(imagePath);
			});
		} else {
			addNotification("warning", "No image provided.");
			handleAddingWebsite(null);
		}
	};

	useEffect(() => {
		if (initialData) {
			handleImageSelect(initialData.icon || null);
			setWebsiteName(initialData.name || "");
			setWebsiteLink(initialData.url || "");
			setDescription(initialData.description || "");
		}
	}, [initialData]);

	return (
		<form onSubmit={handleSubmit}>
			<h1 style={{ textAlign: "center" }}>
				{isEditing ? "Edit a website" : "Add a website"}
			</h1>
			<InputImage
				initialValue={image || undefined}
				onImageSelect={handleImageSelect}
				resetImage={resetImage}
			/>

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

			<Button className="submit-btn" children="Submit" type="submit" />
		</form>
	);
};

export default WebsiteForm;
