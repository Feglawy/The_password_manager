import { useEffect, useState } from "react";
import {
	Website as IWebsite,
	Account as IAccount,
	SignedInBy as ISignedInBy,
} from "../electron";
import WebsiteSelect from "../controls/WebsiteSelect";
import { useNotification } from "../../context/NotificationContext";
import Input from "../controls/Input";
import Button from "../controls/Button";
import Select, { SingleValue } from "react-select";

interface WebsiteOption {
	value: string;
	label: string;
	iconPath: string;
}

interface OptionType {
	value: string;
	label: string;
}

const SignedInByForm = () => {
	const { addNotification } = useNotification();

	const [websites, setWebsites] = useState<IWebsite[]>([]);
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [websiteLoggedInTo, setWebsiteLoggedInTo] =
		useState<WebsiteOption | null>(null);
	const [websiteLoggedInBy, setWebsiteLoggedInBy] =
		useState<WebsiteOption | null>(null);
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

	const loadAccounts = async (websiteId: number) => {
		const req = await window.accountApi.getAccounts(websiteId);
		if (req.success) {
			setAccounts(req.data!);
		} else {
			addNotification("error", req.message);
		}
	};

	const resetForm = () => {
		setWebsiteLoggedInTo(null);
		setWebsiteLoggedInBy(null);
		setSelectedAccount(null);
		setDescription("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!websiteLoggedInTo || !selectedAccount) {
			addNotification("error", "Please fill all required fields.");
			return;
		}

		const data: ISignedInBy = {
			website_id: parseInt(websiteLoggedInTo.value, 10),
			account_id: parseInt(selectedAccount.value, 10),
			description: description,
		};

		const result = await window.signedInByApi.addSignedInBy(data);
		if (result.success) {
			addNotification("success", result.message);
			resetForm();
		} else {
			addNotification("error", result.message);
		}
	};

	useEffect(() => {
		loadWebsites(); // Load websites initially
	}, []);

	useEffect(() => {
		if (websiteLoggedInBy) {
			setAccounts([]); // Clear accounts
			loadAccounts(Number(websiteLoggedInBy.value)); // Load accounts for the selected website
		} else {
			setAccounts([]); // Clear accounts if no website is selected
		}
		setSelectedAccount(null); // Reset the selected account when website changes
	}, [websiteLoggedInBy]);

	const accountOptions = accounts.map((account) => ({
		value: account.id!.toString(),
		label: account.username,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h1 style={{ textAlign: "center" }}>Add signed in by</h1>

			<label htmlFor="website-logged-in-to-select">
				Choose a website you logged in to
			</label>
			<WebsiteSelect
				value={websiteLoggedInTo}
				options={websites}
				onSelect={setWebsiteLoggedInTo}
			/>

			<label htmlFor="website-logged-in-by-select">
				Choose a website you logged in by
			</label>
			<WebsiteSelect
				value={websiteLoggedInBy}
				options={websites}
				onSelect={setWebsiteLoggedInBy}
			/>

			<label htmlFor="account-select">Choose an account</label>
			<Select
				options={accountOptions} // Use the accountOptions here
				value={selectedAccount}
				onChange={(selectedOption: SingleValue<OptionType>) =>
					setSelectedAccount(selectedOption || null)
				}
				placeholder="Select an Account"
				name="account-select"
				isDisabled={!websiteLoggedInBy}
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
