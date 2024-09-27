import { useRef } from "react";
import Input from "./Input";
import Eye from "/eye.svg";
import EyeSlash from "/hidden.svg";

interface PasswordContainer {
	value?: string;
	className?: string;
}

const PasswordContainer = ({ value, className }: PasswordContainer) => {
	const PasswordInputRef = useRef<HTMLInputElement | null>(null);
	const EyeImgReg = useRef<HTMLImageElement | null>(null);

	const TogglePasswordVisability = () => {
		if (!PasswordInputRef.current || !EyeImgReg.current) {
			return;
		}
		if (PasswordInputRef.current.type === "password") {
			PasswordInputRef.current.type = "text";
			EyeImgReg.current.src = EyeSlash;
		} else {
			PasswordInputRef.current.type = "password";
			EyeImgReg.current.src = Eye;
		}
	};

	return (
		<div
			style={{
				display: "inline-grid",
				gridTemplateColumns: "1fr 35px",
				alignItems: "center",
				gridColumnGap: "10px",
				width: "100%",
			}}
		>
			<Input
				label="Password"
				type="password"
				className={className}
				disabled
				ref={PasswordInputRef}
				value={value}
			/>
			<span onClick={TogglePasswordVisability}>
				<img src={Eye} width="48px" height="48px" ref={EyeImgReg} />
			</span>
		</div>
	);
};

export default PasswordContainer;
