import Input from "../Input";

const WebsiteForm = () => {
	return (
		<form>
			<Input type="text" label="Website Name" id="website-name" required />
			<Input type="url" label="Website Link" id="website-link" required />
		</form>
	);
};

export default WebsiteForm;
