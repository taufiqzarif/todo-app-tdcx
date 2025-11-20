import Button from "../ui/Button";
import Input from "../ui/Input";
import SearchIcon from "../../assets/search-solid.svg";

interface DashboardActionsProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	onAddNew: () => void;
}

const DashboardActions = ({
	searchQuery,
	setSearchQuery,
	onAddNew,
}: DashboardActionsProps) => {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-2 sticky top-20 z-10">
			<h2 className="text-xl leading-6 text-[#537178] font-medium sm:w-auto">
				Tasks
			</h2>
			<div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0">
				<div className="relative w-full sm:w-64">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
						<img
							src={SearchIcon}
							alt="Search"
							className="w-4 h-4 text-[#647278]"
						/>
					</div>
					<Input
						placeholder="Search by task name"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="bg-[#D9DFEB] pl-10 text-center sm:text-left focus:bg-[#D9DFEB]"
					/>
				</div>
				<Button
					onClick={onAddNew}
					variant="primary"
					className="shrink-0 w-full sm:w-auto"
				>
					+ New Task
				</Button>
			</div>
		</div>
	);
};

export default DashboardActions;
