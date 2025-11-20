export const STORAGE_KEYS = {
	TASKS: "todo_app_tasks",
	SESSION: "todo_app_session",
};

export const getTasks = (userId: string): any[] => {
	const tasks = localStorage.getItem(`${STORAGE_KEYS.TASKS}_${userId}`);
	return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (userId: string, tasks: any[]) => {
	localStorage.setItem(
		`${STORAGE_KEYS.TASKS}_${userId}`,
		JSON.stringify(tasks)
	);
};

export const setSession = (user: { id: string; name: string }) => {
	// Session cookie (expires when browser is closed)
	const value = JSON.stringify(user);
	document.cookie = `${STORAGE_KEYS.SESSION}=${encodeURIComponent(
		value
	)}; path=/`;
};

export const getSession = (): { id: string; name: string } | null => {
	const match = document.cookie.match(
		new RegExp("(^| )" + STORAGE_KEYS.SESSION + "=([^;]+)")
	);
	if (match) {
		try {
			return JSON.parse(decodeURIComponent(match[2]));
		} catch {
			return null;
		}
	}
	return null;
};

export const clearSession = () => {
	document.cookie = `${STORAGE_KEYS.SESSION}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
};
