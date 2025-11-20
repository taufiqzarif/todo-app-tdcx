import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import Skeleton from "../components/ui/Skeleton";
import Card from "../components/ui/Card";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardActions from "../components/dashboard/DashboardActions";
import TaskList from "../components/dashboard/TaskList";
import EmptyState from "../components/dashboard/EmptyState";
import NewTaskModal from "../components/dashboard/NewTaskModal";

const Dashboard = () => {
	const { user } = useAuth();
	const { tasks, addTask, isLoading } = useTasks();

	const [searchQuery, setSearchQuery] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	// Stats
	const stats = useMemo(() => {
		const completed = tasks.filter((task) => task.isCompleted).length;
		const total = tasks.length;
		const latest = [...tasks]
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
			.slice(0, 3);

		return { completed, total, latest };
	}, [tasks]);

	// Filtered tasks
	const filteredTasks = useMemo(() => {
		return tasks.filter((task) =>
			task.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [tasks, searchQuery]);

	const handleAddTask = (title: string) => {
		addTask(title);
	};

	if (!user) return null;

	return (
		<main>
			<Navbar name={user.name} />
			<div className="max-w-6xl mx-auto sm:px-4 py-6 space-y-8">
				{isLoading ? (
					<div className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<Card>
								<Skeleton className="h-24 w-full" />
							</Card>
							<Card>
								<Skeleton className="h-24 w-full" />
							</Card>
							<Card>
								<Skeleton className="h-24 w-full" />
							</Card>
						</div>
						<div className="space-y-4">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-16 w-full" />
							<Skeleton className="h-16 w-full" />
						</div>
					</div>
				) : tasks.length === 0 ? (
					!isAdding && <EmptyState onAddNew={() => setIsAdding(true)} />
				) : (
					<>
						<DashboardStats stats={stats} />
						<DashboardActions
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							onAddNew={() => setIsAdding(true)}
						/>
						<TaskList tasks={filteredTasks} searchQuery={searchQuery} />
					</>
				)}
			</div>

			<NewTaskModal
				isOpen={isAdding}
				onClose={() => setIsAdding(false)}
				onAdd={handleAddTask}
			/>
		</main>
	);
};

export default Dashboard;
