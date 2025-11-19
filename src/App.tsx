import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
