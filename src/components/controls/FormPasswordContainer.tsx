import { useRef } from "react";
import Input from "./Input";

import "../../styles/PasswordContainer.css";

interface PasswordContainerProps {
	className?: string;
}

const FormPasswordContainer = ({ className }: PasswordContainerProps) => {
	const PasswordInputRef = useRef<HTMLInputElement | null>(null);
	const EyeImgReg = useRef<HTMLImageElement | null>(null);

	const TogglePasswordVisability = () => {
		if (!PasswordInputRef.current || !EyeImgReg.current) {
			return;
		}
		if (PasswordInputRef.current.type === "password") {
			PasswordInputRef.current.type = "text";
			EyeImgReg.current.src = "./hidden.svg";
		} else {
			PasswordInputRef.current.type = "password";
			EyeImgReg.current.src = "./eye.svg";
		}
	};

	const GenereteRandomPassword = () => {
		const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
		const numbers = "0123456789";
		const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";

		const allCharacters =
			uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

		let password: string = "";

		password +=
			uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
		password +=
			lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
		password += numbers[Math.floor(Math.random() * numbers.length)];
		password +=
			specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

		for (let i = 4; i < 12; i++) {
			password +=
				allCharacters[Math.floor(Math.random() * allCharacters.length)];
		}

		password = password
			.split("")
			.sort(() => Math.random() - 0.5)
			.join("");

		if (PasswordInputRef.current) PasswordInputRef.current.value = password;
	};

	return (
		<div className="password-container">
			<Input
				type="password"
				id="password"
				label="Password"
				ref={PasswordInputRef}
				className={`${className}`}
			/>
			<span onClick={TogglePasswordVisability}>
				<img src="/eye.svg" width="48px" height="48px" ref={EyeImgReg} />
			</span>
			<span onClick={GenereteRandomPassword}>
				<img src="/shuffle.svg" width="48px" height="48px" />
			</span>
		</div>
	);
};

export default FormPasswordContainer;
