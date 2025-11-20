import Card from "../ui/Card";
import Button from "../ui/Button";

interface EmptyStateProps {
	onAddNew: () => void;
}

const EmptyState = ({ onAddNew }: EmptyStateProps) => {
	return (
		<div className="flex items-start justify-center sm:absolute sm:inset-0 sm:items-center">
			<Card className="w-full sm:w-[304px] max-w-sm py-12 flex flex-col items-center justify-center text-center shadow-card">
				<h2 className="font-medium text-[#537178] text-xl leading-7 mb-6">
					You have no task.
				</h2>
				<Button onClick={onAddNew} className="font-medium text-sm leading-4.5">
					+ New Task
				</Button>
			</Card>
		</div>
	);
};

export default EmptyState;
