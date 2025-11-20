import React, { useState } from "react";
import type { Task } from "../types";
import { useTasks } from "../context/TaskContext";
import Input from "./ui/Input";

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
		<div className="flex items-center justify-between p-4 gap-4 borber-b border-[#E8E8E8] last:border-0 hover:bg-gray-50 transition-colors group">
			<div className="flex items-center gap-3 flex-1 min-w-0">
				<button
					onClick={() => toggleTask(task.id)}
					className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
						task.isCompleted
							? "bg-[#5285EC] border-[#5285EC]"
							: "border-[#C4C4C4] bg-white hover:border-[#5285EC]"
					}`}
				>
					{task.isCompleted && "✔"}
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
						className={`truncate font-medium ${
							task.isCompleted
								? "text-gray-400 line-through decoration-2"
								: "text-[#537178]"
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
							className="text-gray-400 hover:text-blue-500 transition-colors"
							disabled={task.isCompleted}
						>
							Edit
						</button>
						<button
							onClick={() => deleteTask(task.id)}
							className="text-gray-400 hover:text-red-500 transition-colors"
						>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TaskItem;
