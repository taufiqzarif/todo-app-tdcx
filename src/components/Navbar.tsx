import NavItems from "./NavItems";
import avatar from "../assets/avatar.png";

const Navbar = ({ name }: { name: string }) => {
	return (
		<nav className="bg-white shadow-card sticky top-0 z-10 py-2">
			<div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<img
						src={avatar}
						alt="User Avatar"
						className="w-12 h-12 rounded-full"
					/>

					<span className="font-medium text-base text-[#6D8187] inline">
						{name}
					</span>
				</div>
				<NavItems />
			</div>
		</nav>
	);
};

export default Navbar;
