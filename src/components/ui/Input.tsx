import React from "react";
import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn(
					"flex h-10 w-full rounded-md bg-[#EEF1F8] px-3 py-2 font-medium text-sm leading-4.5 placeholder:text-[#7A7D7E] focus:outline-none focus:bg-[#EEF1F8] disabled:cursor-not-allowed disabled:opacity-50",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
