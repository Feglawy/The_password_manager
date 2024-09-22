import "../../styles/SubmitButton.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ children, ...props }: ButtonProps) => {
	return <button {...props}>{children}</button>;
};

export default Button;
