import { forwardRef } from "react";
import "../../styles/Input.css";

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: string;
	textarea?: boolean; // New prop to switch between input and textarea
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
	({ label, id, textarea, ...props }, ref) => {
		const inputId = id || `${label}-inp`;

		return (
			<div className="inp-container">
				<label htmlFor={inputId} className="inp">
					{textarea ? (
						<textarea
							id={inputId}
							ref={ref as React.Ref<HTMLTextAreaElement>}
							placeholder="&nbsp;"
							{...props}
						></textarea>
					) : (
						<input
							type={props.type || "text"}
							id={inputId}
							ref={ref as React.Ref<HTMLInputElement>}
							placeholder="&nbsp;"
							{...props}
						/>
					)}
					<span className="label">{label}</span>
				</label>
			</div>
		);
	}
);

export default Input;
