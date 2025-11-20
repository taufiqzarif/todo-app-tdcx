import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface TaskChartProps {
	completed: number;
	total: number;
}

const TaskChart = ({ completed, total }: TaskChartProps) => {
	const data = [
		{ name: "Completed", value: completed },
		{ name: "Remaining", value: total - completed },
	];

	const COLORS = ["#5285EC", "#E8ECEC"];

	const renderCustomizedLabel = (props: any) => {
		const { name, x, y, cx, cy, outerRadius } = props;
		if (name !== "Completed" || completed === 0) return null;

		let finalX = x;
		let finalY = y;
		let textAnchor: "start" | "end" | "middle" | "inherit" =
			x > cx ? "start" : "end";

		if (completed === total) {
			const RADIAN = Math.PI / 180;
			const angle = 45; // Top Right
			const radius = outerRadius + 20;
			finalX = cx + radius * Math.cos(-angle * RADIAN);
			finalY = cy + radius * Math.sin(-angle * RADIAN);
			textAnchor = "start";
		}

		return (
			<text
				x={finalX}
				y={finalY}
				fill="#5285EC"
				textAnchor={textAnchor}
				dominantBaseline="central"
				style={{
					fontSize: "10px",
					fontWeight: 500,
					outline: "none",
					pointerEvents: "none",
				}}
			>
				Completed Tasks
			</text>
		);
	};

	const renderCustomizedLabelLine = (props: any) => {
		const { points, name, cx, cy, outerRadius } = props;
		if (name !== "Completed" || completed === 0) return <g />;

		let finalPoints = points;

		if (completed === total) {
			const RADIAN = Math.PI / 180;
			const angle = 45; // Top Right
			const r1 = outerRadius;
			const r2 = outerRadius + 20;

			const x1 = cx + r1 * Math.cos(-angle * RADIAN);
			const y1 = cy + r1 * Math.sin(-angle * RADIAN);
			const x2 = cx + r2 * Math.cos(-angle * RADIAN);
			const y2 = cy + r2 * Math.sin(-angle * RADIAN);

			finalPoints = [
				{ x: x1, y: y1 },
				{ x: x2, y: y2 },
			];
		}

		return (
			<polyline
				stroke="#5285EC"
				strokeWidth={1}
				fill="none"
				points={finalPoints.map((p: any) => `${p.x},${p.y}`).join(" ")}
				style={{ pointerEvents: "none" }}
			/>
		);
	};

	return (
		<div className="w-full h-40 flex items-center justify-center py-4">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						innerRadius={0}
						outerRadius={60}
						fill="#8884d8"
						paddingAngle={0}
						dataKey="value"
						startAngle={90}
						endAngle={-270}
						label={renderCustomizedLabel}
						labelLine={renderCustomizedLabelLine}
					>
						{data.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
								stroke="none"
							/>
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default TaskChart;
