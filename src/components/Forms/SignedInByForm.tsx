import { useEffect, useState } from "react";
import { Website as IWebsite, Account as IAccount } from "../electron";
import WebsiteSelect from "../controls/WebsiteSelect";
import { useNotification } from "../../context/NotificationContext";
import Input from "../controls/Input";
import Button from "../controls/Button";
import Select, { SingleValue } from "react-select";

// Define the type for the select option
interface OptionType {
	value: string;
	label: string;
}

const SignedInByForm = () => {
	const { addNotification } = useNotification();

	const [websites, setWebsites] = useState<IWebsite[]>([]);
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
	const [selectedAccount, setSelectedAccount] = useState<OptionType | null>(
		null
	);
	const [description, setDescription] = useState("");

	const loadWebsites = async () => {
		const req = await window.websiteApi.getAllWebsites();
		if (req.success) {
			setWebsites(req.data!);
		} else {
			addNotification("error", req.message);
		}
	};

	const loadAccounts = async (website_id: number) => {
		const req = await window.accountApi.getAccounts(website_id);
		if (req.success) {
			setAccounts(req.data!);
		} else {
			addNotification("error", req.message);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		
	};

	// Create options for the accounts select dropdown
	const accountOptions: OptionType[] = accounts.map((account) => ({
		value: account.id!.toString(),
		label: account.username,
	}));

	useEffect(() => {
		loadWebsites(); // Load websites initially
	}, []);

	useEffect(() => {
		// Clear accounts and load new ones when selectedWebsite changes
		if (selectedWebsite) {
			setAccounts([]); // Clear accounts
			loadAccounts(Number(selectedWebsite)); // Load accounts for the selected website
		} else {
			setAccounts([]); // Clear accounts if no website is selected
		}
		setSelectedAccount(null); // Reset the selected account when website changes
	}, [selectedWebsite]);

	return (
		<form onSubmit={handleSubmit}>
			<h1 style={{ textAlign: "center" }}>Add signed in by</h1>
			<WebsiteSelect options={websites} onSelect={setSelectedWebsite} />
			<Select
				options={accountOptions} // Use the accountOptions here
				value={selectedAccount}
				onChange={(selectedOption: SingleValue<OptionType>) =>
					setSelectedAccount(selectedOption || null)
				}
				placeholder="Select an Account"
				isDisabled={!selectedWebsite}
				classNamePrefix="react-select"
				required
			/>
			<Input
				textarea={true}
				placeholder="Description (optional)"
				className="w-95"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Button className="submit-btn" children="Submit" type="submit" />
		</form>
	);
};

export default SignedInByForm;
