import Select, { components, OptionProps, SingleValue } from "react-select";
import { Website as IWebsite } from "../electron";
import "../../styles/Select.css";

interface WebsiteOption {
	value: string;
	label: string;
	iconPath: string;
}

interface WebsiteSelectProps {
	options: IWebsite[];
	value: SingleValue<WebsiteOption>; // Accept value from parent
	onSelect: (selectedValue: WebsiteOption) => void; // Callback to pass the selected option to the parent
}

// Custom option component to show icon and label
const CustomOption: React.FC<OptionProps<WebsiteOption, false>> = (props) => {
	const { data } = props;
	return (
		<components.Option {...props}>
			<img
				src={data.iconPath}
				alt={`${data.label} icon`}
				style={{ width: 20, height: 20, marginRight: 10 }}
			/>
			{data.label}
		</components.Option>
	);
};

const WebsiteSelect: React.FC<WebsiteSelectProps> = ({
	options,
	value,
	onSelect,
}) => {
	const handleChange = (selectedOption: SingleValue<WebsiteOption>) => {
		if (selectedOption) {
			onSelect(selectedOption); // Pass the selected value to the parent
		}
	};
	const formattedOptions = options.map((website) => ({
		value: website.id!.toString(),
		label: website.name,
		iconPath: website.icon || "public/world-wide-web.svg",
	}));

	return (
		<div style={{ marginBottom: "10px" }}>
			<Select
				options={formattedOptions}
				components={{ Option: CustomOption }} // Use the custom option rendering
				onChange={handleChange} // Handle selection
				value={value}
				name="website-select"
				placeholder="Select a website..."
				classNamePrefix="react-select"
				autoFocus
				required
			/>
		</div>
	);
};

export default WebsiteSelect;
