import { useEffect, useState } from "react";
import "../../styles/Notification.css";
import "../../styles/utils.css";
import { CheckLg, Cone, Exclamation, XLg } from "react-bootstrap-icons";

type NotificationProps = {
	type: "success" | "error" | "warning";
	message?: string;
};

const notificationConfig = {
	success: { icon: <CheckLg />, color: "green" },
	error: { icon: <XLg />, color: "red" },
	warning: { icon: <Exclamation />, color: "orange" },
	default: { icon: <Cone />, color: "gray" },
};

const Notification = ({ type, message }: NotificationProps) => {
	const { icon, color } =
		notificationConfig[type] || notificationConfig.default;

	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setFadeOut(true), 2500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div
			className={`notification notification-${type} fade-in ${
				fadeOut ? "fade-out" : ""
			}`}
			style={{ backgroundColor: color }}
		>
			<span className="notification-icon">{icon}</span>
			{message && <span className="notification-message">{message}</span>}
		</div>
	);
};

export default Notification;
