import { useEffect, useRef, useState } from "react";
import "../../styles/InputImage.css";
import defaultWebsiteIcon from "/world-wide-web.svg";

interface InputImageProps {
	initialValue?: string;
	onImageSelect: (file: string | null) => void;
	resetImage: boolean;
}

const InputImage = ({
	initialValue,
	onImageSelect,
	resetImage,
}: InputImageProps) => {
	const imagePreviewRef = useRef<HTMLImageElement | null>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const openImageDialog = async () => {
		const filePath = await window.api.openImageFileDialog();
		if (filePath) {
			setImageSrc(filePath);
			onImageSelect(filePath);
		}
	};

	// Effect to reset the image when resetImage prop changes
	useEffect(() => {
		if (resetImage) {
			setImageSrc(null);
			onImageSelect(null);
		}
	}, [resetImage, onImageSelect]);

	useEffect(() => {
		setImageSrc(initialValue || null);
		onImageSelect(initialValue || null);
	}, [initialValue]);

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
						src={`file:///${imageSrc}`}
						alt="Image Preview"
						style={{
							height: "128px",
							width: "128px",
							borderRadius: "38% / 40%",
						}}
					/>
				) : (
					<div
						id="default-icon"
						style={{ backgroundImage: defaultWebsiteIcon }}
					></div>
				)}
			</div>
		</div>
	);
};

export default InputImage;
