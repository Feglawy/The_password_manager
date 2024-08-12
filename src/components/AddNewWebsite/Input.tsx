import React, { forwardRef } from "react";
import "../../styles/Input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, id, ...props }, ref) => {
		const inputId = id || `${label}-inp`;

		return (
			<div className="inp-container">
				<label htmlFor={inputId} className="inp">
					<input
						type={props.type || "text"}
						id={inputId}
						ref={ref}
						placeholder="&nbsp;"
						{...props}
					/>
					<span className="label">{label}</span>
				</label>
			</div>
		);
	}
);

export default Input;
