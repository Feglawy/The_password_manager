import { useEffect, useRef, useState } from "react";
import "../../styles/InputImage.css";
import defaultWebsiteIcon from "/world-wide-web.svg";
import DropDownMenu from "../DropDownMenu";
import WorkingOnIt from "../WorkingOnIt";

interface InputImageProps {
	initialValue?: string;
	onImageSelect: (file: string | null) => void;
	url?: string;
	resetImage: boolean;
}

const InputImage = ({
	initialValue,
	onImageSelect,
	resetImage,
	url,
}: InputImageProps) => {
	const imagePreviewRef = useRef<HTMLImageElement | null>(null);
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	const [workingOnItModal, setWorkingOnItModal] = useState(false);

	const getHostname = (url: string) => {
		try {
			const urlObj = new URL(url);
			const hostname = urlObj.hostname;
			return hostname;
		} catch (error) {
			console.error(`Please provide a prober url`);
		}
	};

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
	}, [resetImage]);

	useEffect(() => {
		setImageSrc(initialValue || null);
		onImageSelect(initialValue || null);
	}, [initialValue]);

	const suggestIcon = () => {
		// setWorkingOnItModal(true);
		if (url) {
			const hostname = getHostname(url);
			const img = `https://logo.clearbit.com/${hostname}?format=png&size=200`;
			setImageSrc(img);
			onImageSelect(img);
		} else {
			console.log(`url is not defined`);
		}
	};

	const clearInput = () => {
		setImageSrc(null);
		onImageSelect(null);
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
