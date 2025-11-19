import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "secondary" | "danger";
	isLoading?: boolean;
	className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = "primary", isLoading = false, className, children, ...props },
		ref
	) => {
		const variants = {
			primary: "bg-[#5285EC] text-white hover:bg-blue-500 disabled:bg-blue-300",
			secondary:
				"bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
			danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
		};

		return (
			<button
				ref={ref}
				className={cn(
					"flex items-center justify-center h-10 gap-2 px-4 py-2 cursor-pointer font-medium leading-4.5 text-sm rounded-lg",
					variants[variant],
					className
				)}
				disabled={isLoading || props.disabled}
				{...props}
			>
				{isLoading && <span className="h-4 w-4 animate-spin rounded-full" />}
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";
export default Button;
