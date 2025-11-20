import Card from "../ui/Card";
import TaskChart from "./TaskChart";
import type { Task } from "../../types";

interface DashboardStatsProps {
	stats: {
		completed: number;
		total: number;
		latest: Task[];
	};
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
	return (
		<section>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Tasks Completed */}
				<Card className="flex flex-col">
					<p className="text-heading mb-4">Tasks Completed</p>
					<div className="flex items-baseline gap-1">
						<span className="text-[64px] leading-[78px] font-medium text-primary">
							{stats.completed}
						</span>
						<span className="text-xl leading-6 text-tertiary font-medium">
							/ {stats.total}
						</span>
					</div>
				</Card>

				{/* Latest Created Tasks */}
				<Card className="md:col-span-1">
					<p className="text-heading mb-4">Latest Created Tasks</p>

					<ul className="space-y-2 list-disc list-inside text-tertiary">
						{stats.latest.map((task) => (
							<li
								key={task.id}
								className={`text-sm font-medium leading-[26px] truncate ${
									task.isCompleted ? "line-through decoration-2" : ""
								}`}
							>
								{task.title}
							</li>
						))}
					</ul>
				</Card>

				{/* Chart */}
				<Card className="flex items-center justify-center p-4">
					<TaskChart completed={stats.completed} total={stats.total} />
				</Card>
			</div>
		</section>
	);
};

export default DashboardStats;
