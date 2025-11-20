import { cn } from "../../lib/utils";

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
	return (
		<div
			className={cn(
				"bg-white sm:rounded-xl shadow-card-primary p-6",
				className
			)}
		>
			{children}
		</div>
	);
};

export default Card;
