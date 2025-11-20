import { useAuth } from "../context/AuthContext";

const NavItems = () => {
	const { user, logout } = useAuth();

	if (!user) return null;

	return (
		<div className="flex items-center gap-4">
			<button
				onClick={logout}
				className="flex items-center gap-2 cursor-pointer font-medium text-[#6D8187] hover:text-gray-800 transition-colors"
			>
				Logout
			</button>
		</div>
	);
};

export default NavItems;
