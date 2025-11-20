import { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface NewTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (title: string) => void;
}

const NewTaskModal = ({ isOpen, onClose, onAdd }: NewTaskModalProps) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTaskTitle.trim()) {
			onAdd(newTaskTitle);
			setNewTaskTitle("");
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center px-4 pb-4 pt-24 sm:p-4 bg-[#00000033]">
			<div className="absolute inset-0" onClick={onClose} />
			<Card className="w-[296px] max-w-md h-[193px] p-6 relative z-10 shadow-card rounded-lg space-y-5">
				<p className="text-xl font-medium text-[#6D8187]">+ New Task</p>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						autoFocus
						placeholder="Task Name"
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						className="bg-[#EEF1F8]"
						required
					/>
					<Button
						type="submit"
						disabled={!newTaskTitle.trim()}
						className={`w-full justify-center py-2.5 ${
							!newTaskTitle.trim() ? "cursor-not-allowed" : ""
						}`}
					>
						+ New Task
					</Button>
				</form>
			</Card>
		</div>
	);
};

export default NewTaskModal;
