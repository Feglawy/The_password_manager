import Notification from "./Notification";

interface NotificationCenterProps {
	notifications: {
		id: number;
		type: "success" | "error" | "warning";
		message: string;
	}[];
}

const NotificationCenter = ({ notifications }: NotificationCenterProps) => {
	return (
		<div
			className="notification-center"
			style={{ position: "absolute", top: "7%", right: "5%" }}
		>
			{notifications.map(({ id, type, message }) => (
				<Notification key={id} type={type} message={message} />
			))}
		</div>
	);
};

export default NotificationCenter;