import { useEffect, useRef } from "react";
import "../../styles/InputImage.css";

const InputImage = () => {
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
				const reader = new FileReader();
				reader.onload = (e) => {
					if (imagePreviewRef.current && defaultIconRef.current) {
						imagePreviewRef.current.src = e.target?.result as string;
						imagePreviewRef.current.style.display = "block";
						defaultIconRef.current.style.display = "none";
					}
				};
				reader.readAsDataURL(file);
			}
		};

		const imgInput = imgInputRef.current;
		imgInput?.addEventListener("change", handleImageChange);

		return () => {
			imgInput?.removeEventListener("change", handleImageChange);
		};
	}, []);

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
