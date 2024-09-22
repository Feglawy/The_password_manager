interface RadioInputProps {
	name: string;
	onClick: () => void;
}

const RadioInput = ({ name, onClick }: RadioInputProps) => {
	return (
		<label className="radio">
			<input type="radio" name="formSelection" onClick={onClick} />
			<span className="name">{name}</span>
		</label>
	);
};

export default RadioInput;
