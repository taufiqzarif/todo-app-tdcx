import React, { useState, useMemo } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Navbar from "../components/Navbar";
import TaskItem from "../components/TaskItem";
import TaskChart from "../components/TaskChart";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import SearchIcon from "../assets/search-solid.svg";
import Skeleton from "../components/ui/Skeleton";

const Dashboard = () => {
	const { user } = useAuth();
	const { tasks, addTask, isLoading } = useTasks();

	const [searchQuery, setSearchQuery] = useState("");
	const [newTaskTitle, setNewTaskTitle] = useState("");
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

	const handleAddTask = (e: React.FormEvent) => {
		e.preventDefault();

		if (newTaskTitle.trim()) {
			addTask(newTaskTitle);
			setNewTaskTitle("");
			setIsAdding(false);
		}
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
					// Empty state
					<div className="absolute inset-0 flex items-center justify-center p-4">
						<Card className="w-full max-w-sm py-12 flex flex-col items-center justify-center text-center shadow-card">
							<h2>You have no task.</h2>
							<Button onClick={() => setIsAdding(true)}>New Task</Button>
						</Card>
					</div>
				) : (
					<>
						{/* Stats */}
						<section>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{/* Tasks Completed */}
								<Card className="flex flex-col">
									<p className="font-medium text-[#537178] text-xl leading-6 mb-4">
										Tasks Completed
									</p>
									<div className="flex items-baseline gap-1">
										<span className="text-[64px] leading-[78px] font-medium text-[#5285EC]">
											{stats.completed}
										</span>
										<span className="text-xl leading-6 text-[#8F9EA2] font-medium">
											/ {stats.total}
										</span>
									</div>
								</Card>

								{/* Latest Created Tasks */}
								<Card className="md:col-span-1">
									<p className="font-medium text-[#537178] text-xl leading-6 mb-4">
										Latest Created Tasks
									</p>

									<ul className="space-y-2 list-disc list-inside text-[#8F9EA2]">
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

						{/* Actions */}
						<div className="flex flex-col sm:flex-row items-center justify-between gap-2 sticky top-20 z-10">
							<h2 className="text-xl leading-6 text-[#537178] font-medium sm:w-auto">
								Tasks
							</h2>
							<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
								<div className="relative w-full sm:w-64">
									<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
										<img
											src={SearchIcon}
											alt="Search"
											className="w-4 h-4 text-[#647278]"
										/>
									</div>
									<Input
										placeholder="Search by task name"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										className="bg-[#D9DFEB] pl-10 text-center sm:text-left"
									/>
								</div>
								<Button
									onClick={() => setIsAdding(true)}
									variant="primary"
									className="shrink-0 w-full sm:w-auto"
								>
									+ New Task
								</Button>
							</div>
						</div>

						{/* Task List */}
						<section className="space-y-4">
							{filteredTasks.length === 0 && !isAdding ? (
								<div className="text-center py-10 text-[#8F9EA2]">
									No tasks found matching "{searchQuery}"
								</div>
							) : (
								<Card className="shadow-card-secondary p-2">
									{filteredTasks.map((task) => (
										<TaskItem key={task.id} task={task} />
									))}
								</Card>
							)}
						</section>
					</>
				)}
			</div>

			{/* Add task modal */}
			{isAdding && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00000033]">
					<div
						className="absolute inset-0"
						onClick={() => setIsAdding(false)}
					/>
					<Card className="w-full max-w-md p-6 relative z-10 shadow-card">
						<p className="text-xl font-medium">New Task</p>
						<form onSubmit={handleAddTask} className="space-y-4">
							<Input
								autoFocus
								placeholder="Task Name"
								value={newTaskTitle}
								onChange={(e) => setNewTaskTitle(e.target.value)}
								className="bg-slate-50 border-slate-200 focus:bg-white"
								required
							/>
							<Button
								type="submit"
								disabled={!newTaskTitle.trim()}
								className="w-full justify-center py-2.5"
							>
								+ New Task
							</Button>
						</form>
					</Card>
				</div>
			)}
		</main>
	);
};

export default Dashboard;
