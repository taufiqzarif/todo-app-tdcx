import React, { useState, useEffect } from "react";
import { getTasks, saveTasks } from "../lib/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthContext";
import type { Task } from "../types";
import { TaskContext } from "./TaskContext";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!user) return;

		// Fetch and simulate loading delay
		const loadTasks = async () => {
			setIsLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setTasks(getTasks(user.id));
			setIsLoading(false);
		};
		loadTasks();
	}, [user]);

	const updateTasks = (newTasks: Task[]) => {
		setTasks(newTasks);
		if (user) {
			saveTasks(user.id, newTasks);
		}
	};

	const addTask = (title: string) => {
		const newTask: Task = {
			id: uuidv4(),
			title,
			isCompleted: false,
			createdAt: new Date().toISOString(),
		};
		updateTasks([newTask, ...tasks]);
	};

	const toggleTask = (id: string) => {
		const newTasks = tasks.map((task) =>
			task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
		);
		updateTasks(newTasks);
	};

	const deleteTask = (id: string) => {
		const newTasks = tasks.filter((task) => task.id !== id);
		updateTasks(newTasks);
	};

	const editTask = (id: string, title: string) => {
		const newTasks = tasks.map((task) =>
			task.id === id ? { ...task, title } : task
		);
		updateTasks(newTasks);
	};

	return (
		<TaskContext.Provider
			value={{ tasks, isLoading, addTask, toggleTask, deleteTask, editTask }}
		>
			{children}
		</TaskContext.Provider>
	);
};
