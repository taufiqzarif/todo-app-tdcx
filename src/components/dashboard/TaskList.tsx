import Card from "../ui/Card";
import TaskItem from "../TaskItem";
import type { Task } from "../../types";

interface TaskListProps {
	tasks: Task[];
	searchQuery: string;
}

const TaskList = ({ tasks, searchQuery }: TaskListProps) => {
	return (
		<section className="space-y-4">
			{tasks.length === 0 ? (
				<div className="text-center py-10 text-[#8F9EA2]">
					No tasks found matching "{searchQuery}"
				</div>
			) : (
				<Card className="shadow-card-secondary p-2">
					{tasks.map((task) => (
						<TaskItem key={task.id} task={task} />
					))}
				</Card>
			)}
		</section>
	);
};

export default TaskList;
