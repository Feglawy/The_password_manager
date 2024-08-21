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
				flexWrap: "nowrap",
				alignContent: "center",
				justifyContent: "center",
				alignItems: "center",
				maxHeight: "400px",
				zIndex: "1000000",
				overflow: "hidden",
				maskImage: "linear-gradient(180deg, #000 60%, transparent)",
			}}
		>
			{notifications.map(({ id, type, message }) => (
				<Notification key={id} type={type} message={message} />
			))}
		</div>
	);
};

export default NotificationCenter;
