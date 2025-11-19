import { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userId.trim() && username) {
			console.log(userId, username);
		}
	};

	return (
		<main className="min-h-screen flex items-center justify-center">
			<Card className="shadow-card w-[296px] h-[249px]">
				<div className="text-left mb-6">
					<h2 className="font-medium text-[20px] leading-6 text-[#537178]">
						Login
					</h2>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="space-y-3">
						<Input
							id="userId"
							type="text"
							placeholder="Id"
							value={userId}
							onChange={(e) => setUserId(e.target.value)}
							required
						/>

						<Input
							id="username"
							type="text"
							placeholder="Name"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
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
