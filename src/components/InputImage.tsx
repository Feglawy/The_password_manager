import React, { useEffect, useRef } from "react";
import "../styles/InputImage.css";

interface InputImageProps {
	onImageSelect: (file: File | null) => void; // Callback prop for the selected image
}

const InputImage: React.FC<InputImageProps> = ({ onImageSelect }) => {
	const imgInputRef = useRef<HTMLInputElement | null>(null);
	const imagePreviewRef = useRef<HTMLImageElement | null>(null);
	const defaultIconRef = useRef<HTMLDivElement | null>(null);

	const performClick = () => {
		imgInputRef.current?.click();
	};

	useEffect(() => {
		const handleImageChange = (event: Event) => {
			const target = event.target as HTMLInputElement;
			const file = target.files?.[0];

			if (file) {
				onImageSelect(file); // Send the file to the parent component

				const reader = new FileReader();
				reader.onload = (e) => {
					if (imagePreviewRef.current && defaultIconRef.current) {
						imagePreviewRef.current.src = e.target?.result as string;
						imagePreviewRef.current.style.display = "block";
						defaultIconRef.current.style.display = "none";
					}
				};
				reader.readAsDataURL(file);
			} else {
				onImageSelect(null); // Clear file if no file is selected
			}
		};

		const imgInput = imgInputRef.current;
		imgInput?.addEventListener("change", handleImageChange);

		return () => {
			imgInput?.removeEventListener("change", handleImageChange);
		};
	}, [onImageSelect]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				id="website-icon"
				onClick={performClick}
				style={{ cursor: "pointer" }}
			>
				<img
					id="image-preview"
					ref={imagePreviewRef}
					src="#"
					alt="Image Preview"
					style={{
						display: "none",
						height: "128px",
						width: "128px",
						borderRadius: "38% / 40%",
					}}
				/>
				<input
					type="file"
					id="img-input"
					ref={imgInputRef}
					accept="image/*"
					style={{ display: "none" }}
				/>
				<div id="default-icon" ref={defaultIconRef}></div>
			</div>
		</div>
	);
};

export default InputImage;
