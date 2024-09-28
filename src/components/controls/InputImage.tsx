import { useEffect, useRef, useState } from "react";
import "../../styles/InputImage.css";
import defaultWebsiteIcon from "/world-wide-web.svg";
import DropDownMenu from "../DropDownMenu";
import WorkingOnIt from "../WorkingOnIt";

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

	const [workingOnItModal, setWorkingOnItModal] = useState(false);

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

	const suggestIcon = () => {
		setWorkingOnItModal(true);
	};

	const clearInput = () => {
		setImageSrc(null);
	};

	const inputImageControls = [
		{ label: "Suggest icon", onClick: suggestIcon },
		{ label: "Clear icon", onClick: clearInput },
	];

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div style={{ position: "absolute", top: "0", left: "256px" }}>
				<DropDownMenu items={inputImageControls} />
			</div>
			<div
				id="website-icon"
				onClick={openImageDialog}
				style={{ cursor: "pointer" }}
			>
				{imageSrc ? (
					<img
						id="image-preview"
						ref={imagePreviewRef}
						src={`${imageSrc}`}
						alt="Image Preview"
						style={{
							height: "128px",
							width: "128px",
							borderRadius: "38% / 40%",
						}}
					/>
				) : (
					<div>
						<img src={defaultWebsiteIcon} alt="" id="default-icon" />
					</div>
				)}
				<WorkingOnIt
					isOpen={workingOnItModal}
					onClose={() => {
						setWorkingOnItModal(false);
					}}
				/>
			</div>
		</div>
	);
};

export default InputImage;
