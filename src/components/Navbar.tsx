import NavItems from "./NavItems";

const Navbar = () => {
	return (
		<nav className="bg-white shadow-card sticky top-0 z-10">
			<div className="w-full">
				<NavItems />
			</div>
		</nav>
	);
};

export default Navbar;
