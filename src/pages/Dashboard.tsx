import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Navbar from "../components/Navbar";

const Dashboard = () => {
	// const [searchQuery, setSearchQuery] = useState("");
	// const [newTaskTitle, setNewTaskTitle] = useState("");
	// const [isAdding, setIsAdding] = useState(false);

	return (
		<main>
			<Navbar />
			<div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
				{/* Stats */}
				<section>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Tasks Completed */}
						<Card className="flex flex-col">
							<p className="font-medium text-[#537178] text-xl leading-6 mb-4">
								Tasks Completed
							</p>
							<div className="flex items-baseline gap-1">
                  <span className="text-[64px] leading-[78px] font-medium text-[#5285EC]">0</span>
								<span className="text-xl leading-6 text-[#8F9EA2] font-medium">/ 20</span>
							</div>
						</Card>

						{/* Latest Created Tasks */}
						<Card className="md:col-span-1">
							<p className="font-medium text-[#537178] text-xl leading-6 mb-4">
								Latest Created Tasks
							</p>

							<ul className="space-y-2 list-disc list-inside text-[#8F9EA2]">
                <li className="text-sm font-medium leading-[26px]">task dummy 1</li>
                <li className="text-sm font-medium leading-[26px]">task dummy 2</li>
                <li className="text-sm font-medium leading-[26px]">task dummy 3</li>
              </ul>
						</Card>

						{/* Chart */}
						<Card>Chart</Card>
					</div>
				</section>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-20 z-10 py-2">
					<h2 className="text-xl leading-6 text-[#537178] font-medium sm:w-auto">
						Tasks
					</h2>
					<div className="flex items-center gap-3 w-full sm:w-auto">
						<div className="relative flex-1 sm:w-64">
							<Input
								placeholder="Search by task name"
								className="bg-[#D9DFEB]"
							/>
						</div>
						<Button variant="primary" className="shrink-0">
							New Task
						</Button>
					</div>
				</div>

				{/* Task List */}
				<section className="space-y-4">
					<div>No tasks found matching</div>
				</section>
			</div>
		</main>
	);
};

export default Dashboard;
