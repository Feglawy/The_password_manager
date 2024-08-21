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
			style={{
				position: "absolute",
				top: "7%",
				display: "flex",
				right: "5%",
				flexDirection: "column-reverse",
				flexWrap: "wrap",
				alignContent: "center",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{notifications.map(({ id, type, message }) => (
				<Notification key={id} type={type} message={message} />
			))}
		</div>
	);
};

export default NotificationCenter;
