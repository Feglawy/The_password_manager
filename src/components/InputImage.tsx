import React, { useRef, useState } from "react";
import "../styles/InputImage.css";

interface InputImageProps {
	onImageSelect: (file: string | null) => void; // Callback prop for the selected image
}

const InputImage: React.FC<InputImageProps> = ({ onImageSelect }) => {
	const imagePreviewRef = useRef<HTMLImageElement | null>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const openImageDialog = async () => {
		const filePath = await window.api.openImageFileDialog();
		if (filePath) {
			setImageSrc(filePath);
			onImageSelect(filePath);
		}
	};

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
				onClick={openImageDialog}
				style={{ cursor: "pointer" }}
			>
				{imageSrc ? (
					<img
						id="image-preview"
						ref={imagePreviewRef}
						src={imageSrc}
						alt="Image Preview"
						style={{
							height: "128px",
							width: "128px",
							borderRadius: "38% / 40%",
						}}
					/>
				) : (
					<div id="default-icon"></div>
				)}
			</div>
		</div>
	);
};

export default InputImage;
