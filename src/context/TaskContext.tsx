import { createContext, useContext } from "react";
import type { Task } from "../types";

interface TaskContextType {
	tasks: Task[];
	isLoading: boolean;
	addTask: (title: string) => void;
	toggleTask: (id: string) => void;
	deleteTask: (id: string) => void;
	editTask: (id: string, title: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
	undefined
);

export const useTasks = () => {
	const context = useContext(TaskContext);
	if (context === undefined) {
		throw new Error("useTasks must be used within a TaskProvider");
	}
	return context;
};
