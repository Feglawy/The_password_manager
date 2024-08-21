import { createContext, useContext, ReactNode, useState } from "react";
import NotificationCenter from "../components/Notifications/NotificationCenter"; // Adjust the path if needed

type NotificationType = "success" | "error" | "warning";

interface NotificationContextType {
	addNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error(
			"useNotification must be used within a NotificationProvider"
		);
	}
	return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
	const [notifications, setNotifications] = useState<
		{ id: number; type: NotificationType; message: string }[]
	>([]);

	const addNotification = (type: NotificationType, message: string) => {
		const id = Date.now();
		setNotifications((prev) => [...prev, { id, type, message }]);

		setTimeout(() => {
			setNotifications((prev) => prev.filter((n) => n.id !== id));
		}, 3000);
	};

	return (
		<NotificationContext.Provider value={{ addNotification }}>
			<NotificationCenter notifications={notifications} />
			{children}
		</NotificationContext.Provider>
	);
};
