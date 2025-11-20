import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthProvider";
import { TaskProvider } from "./context/TaskProvider";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (user) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<TaskProvider>
									<Dashboard />
								</TaskProvider>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
