import { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [id, setId] = useState("");
	const [name, setName] = useState("");

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (id.trim() && name) {
			login(id, name);
			navigate("/");
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center">
			<Card className="shadow-card w-[296px] h-[249px]">
				<div className="text-left mb-6">
					<h2 className="text-heading">Login</h2>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="space-y-3">
						<Input
							id="userId"
							type="text"
							placeholder="Id"
							value={id}
							onChange={(e) => setId(e.target.value)}
							required
						/>

						<Input
							id="username"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>

						<Button className="w-full h-10 rounded-lg">Login</Button>
					</div>
				</form>
			</Card>
		</main>
	);
};

export default Login;
