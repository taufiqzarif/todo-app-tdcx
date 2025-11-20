import React, { useState } from "react";
import type { User } from "../types";
import { getSession, setSession, clearSession } from "../lib/storage";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(() => {
		const session = getSession();
		return session ? { ...session, isAuthenticated: true } : null;
	});
	const [isLoading, setIsLoading] = useState(false);

	const login = async (id: string, name: string) => {
		setIsLoading(true);
		// Simulate login delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const userData = { id, name };
		setSession(userData);
		setUser({ ...userData, isAuthenticated: true });
		setIsLoading(false);
	};

	const logout = () => {
		clearSession();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
