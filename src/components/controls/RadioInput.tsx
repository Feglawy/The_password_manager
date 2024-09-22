interface RadioInputProps {
	name: string;
	onChange: () => void;
}

const RadioInput = ({ name, onChange }: RadioInputProps) => {
	return (
		<label className="radio">
			<input type="radio" name="formSelection" onChange={onChange} />
			<span className="name">{name}</span>
		</label>
	);
};

export default RadioInput;
