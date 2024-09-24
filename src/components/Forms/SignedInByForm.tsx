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
	iconPath?: string;
}

interface OptionType {
	value: string;
	label: string;
}

interface SignedInByFormProps {
	initialData?: ISignedInBy;
	isEditing?: boolean;
	onSubmit?: (updatedInctance?: ISignedInBy) => void;
}

const SignedInByForm = ({
	initialData,
	isEditing,
	onSubmit,
}: SignedInByFormProps) => {
	const { addNotification } = useNotification();

	const [isFormPopulating, setIsFormPopulating] = useState<boolean>(false); // Flag to track form population
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

	// Helper to reset form fields
	const resetForm = () => {
		setWebsiteLoggedInTo(null);
		setWebsiteLoggedInBy(null);
		setSelectedAccount(null);
		setDescription("");
	};

	// Fetch websites and set the state
	const fetchWebsites = async () => {
		try {
			const req = await window.websiteApi.getAllWebsites();
			if (req.success && req.data) {
				setWebsites(req.data);
			} else {
				addNotification("error", req.message);
			}
		} catch (err) {
			addNotification("error", "Failed to load websites.");
		}
	};

	// Fetch accounts for a selected website
	const fetchAccounts = async (websiteId: number) => {
		try {
			const req = await window.accountApi.getAccounts(websiteId);
			if (req.success && req.data) {
				setAccounts(req.data);
			} else {
				addNotification("error", req.message);
			}
		} catch (err) {
			addNotification("error", "Failed to load accounts.");
		}
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!websiteLoggedInTo || !selectedAccount) {
			addNotification("error", "Please fill all required fields.");
			return;
		}

		const data: ISignedInBy = {
			id: initialData?.id,
			website_id: parseInt(websiteLoggedInTo.value, 10),
			account_id: parseInt(selectedAccount.value, 10),
			description,
		};

		try {
			const result = isEditing
				? await window.signedInByApi.editSignedInBy(data)
				: await window.signedInByApi.addSignedInBy(data);

			if (result.success) {
				addNotification("success", result.message);
				if (onSubmit) {
					onSubmit(data);
				}
				resetForm();
			} else {
				addNotification("error", result.message);
			}
		} catch (err) {
			addNotification("error", "Failed to submit form.");
		}
	};

	// Load websites initially
	useEffect(() => {
		fetchWebsites();
	}, []);

	// Load accounts when a website is selected, but avoid resetting during form population
	useEffect(() => {
		if (websiteLoggedInBy) {
			fetchAccounts(parseInt(websiteLoggedInBy.value, 10));

			// Only reset account if form is not being populated
			if (!isFormPopulating) {
				setSelectedAccount(null);
			}
		} else {
			setAccounts([]);
		}
	}, [websiteLoggedInBy]);

	// Populate form values when editing
	useEffect(() => {
		if (!initialData || websites.length === 0) return;

		const populateForm = async () => {
			setIsFormPopulating(true); // Set flag before populating

			const websiteTo = websites.find((w) => w.id === initialData.website_id);
			const websiteByReq = await window.signedInByApi.getWebsiteLoggedInBy(
				initialData.id!
			);
			const accountReq = await window.signedInByApi.getAccountLoggedInWith(
				initialData.id!
			);

			if (websiteTo) {
				setWebsiteLoggedInTo({
					label: websiteTo.name!,
					value: websiteTo.id!.toString(),
					iconPath: websiteTo.icon!,
				});
			}

			if (websiteByReq?.data) {
				setWebsiteLoggedInBy({
					label: websiteByReq.data.name!,
					value: websiteByReq.data.id!.toString(),
					iconPath: websiteByReq.data.icon!,
				});
			}

			if (accountReq?.data) {
				setSelectedAccount({
					label: accountReq.data.username,
					value: accountReq.data.id!.toString(),
				});
			}

			setDescription(initialData.description || "");
			setIsFormPopulating(false); // Reset flag after population
		};

		populateForm();
	}, [initialData, websites]);

	// Options for account select dropdown
	const accountOptions = accounts.map((account) => ({
		value: account.id!.toString(),
		label: account.username,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h1 style={{ textAlign: "center" }}>
				{isEditing ? "Edit Signed In By" : "Add Signed In By"}
			</h1>

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
				options={accountOptions}
				value={selectedAccount}
				onChange={(option: SingleValue<OptionType>) =>
					setSelectedAccount(option || null)
				}
				placeholder="Select an Account"
				name="account-select"
				isDisabled={!websiteLoggedInBy}
				classNamePrefix="react-select"
				required
			/>

			<Input
				textarea
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
