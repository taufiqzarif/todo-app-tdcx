import React, { useState } from "react";
import type { Task } from "../types";
import { useTasks } from "../context/TaskContext";
import Input from "./ui/Input";

const PenIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16.443"
		height="16.443"
		viewBox="0 0 16.443 16.443"
		fill="currentColor"
		{...props}
	>
		<path
			d="M8.989,3.007l4,4-9,9h-3a1.029,1.029,0,0,1-1-1v-3Zm7-1-2-2a1.358,1.358,0,0,0-2,0l-2,2,4,4,2-2A1.358,1.358,0,0,0,15.989,2.007Z"
			transform="translate(0.014 0.433)"
		/>
	</svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="18.13"
		viewBox="0 0 16 18.13"
		fill="currentColor"
		{...props}
	>
		<path
			d="M15,1H11V0c-.145-.291-.675,0-1,0H6c-.325,0-.857-.292-1,0V1H1A1.577,1.577,0,0,0,0,2V3c0,.316.684,0,1,0H15c.316,0,1,.316,1,0V2A1.577,1.577,0,0,0,15,1ZM2,17c.057.9,1.095,1,2,1h8c.9,0,1.943-.1,2-1L15,5H1Z"
			transform="translate(0 0.13)"
		/>
	</svg>
);

interface TaskItemProps {
	task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
	const { toggleTask, deleteTask, editTask } = useTasks();
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);

	const handleSave = () => {
		if (editTitle.trim()) {
			editTask(task.id, editTitle);
		} else {
			setEditTitle(task.title);
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		setEditTitle(task.title);
		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			handleCancel();
		}
	};

	return (
		<div className="flex items-center justify-between px-4 py-5 border-b-2 border-gray-200 last:border-0 hover:bg-gray-50 transition-colors group">
			<div className="flex items-center gap-3 flex-1 min-w-0">
				<button
					onClick={() => toggleTask(task.id)}
					className={`shrink-0 w-5 h-5 rounded-sm border-2 border-[#C4C4C4] flex items-center justify-center transition-colors relative ${
						task.isCompleted ? "border-[#707070]" : "border-[#95A4AB]"
					}`}
				>
					{task.isCompleted && (
						<svg
							className="absolute -top-[7px] left-0"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20 6L9 17L4 12"
								stroke="#707070"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>

				{isEditing ? (
					<div>
						<Input
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							onBlur={handleSave}
							onKeyDown={handleKeyDown}
							className="h-8"
							autoFocus
						/>
					</div>
				) : (
					<span
						className={`truncate font-medium text-xl ${
							task.isCompleted
								? "text-secondary line-through decoration-3"
								: "text-primary"
						}`}
					>
						{task.title}
					</span>
				)}
			</div>

			<div className="flex items-center gap-3">
				{!isEditing && (
					<>
						<button
							onClick={() => setIsEditing(true)}
							className="text-icon hover:text-blue-500 transition-colors cursor-pointer"
							disabled={task.isCompleted}
						>
							<PenIcon className="w-4 h-4" />
						</button>
						<button
							onClick={() => deleteTask(task.id)}
							className="text-icon hover:text-red-500 transition-colors cursor-pointer"
						>
							<TrashIcon className="w-4 h-4" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TaskItem;
