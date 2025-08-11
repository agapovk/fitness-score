import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import React from "react";

export const Route = createFileRoute("/")({
	component: App,
});

export type Data = {
	ready: number | undefined;
	energy: number | undefined;
	sleep: number | undefined;
};

function App() {
	const initialData = {
		ready: undefined,
		energy: undefined,
		sleep: undefined,
	};

	const [data, setData] = React.useState<Data>(initialData);

	const launchParams = useLaunchParams();

	const { user } = launchParams.tgWebAppData || {};

	return (
		<div className="p-4 flex flex-col gap-4">
			{/* READY? */}

			<Card>
				<CardHeader>
					<h3>Are you ready today?</h3>
				</CardHeader>
				<CardContent className="flex justify-between gap-2">
					<Button
						size="sm"
						variant="outline"
						className={cn(
							"flex-1",
							data.ready === 1 &&
								"bg-green-500 text-white hover:bg-green-400 hover:text-white",
						)}
						onClick={() => {
							setData({
								...data,
								ready: 1,
							});
						}}
					>
						YES
					</Button>
					<Button
						size="sm"
						variant="outline"
						className={cn(
							"flex-1",
							data.ready === 0 && "bg-red-500 text-white hover:bg-red-400",
						)}
						onClick={() => {
							setData({
								...data,
								ready: 0,
							});
						}}
					>
						NO
					</Button>
				</CardContent>
			</Card>

			{/* ENERGY */}
			<Card>
				<CardHeader>
					<h3>How energy you are today?</h3>
				</CardHeader>
				<CardContent className="grid grid-cols-5 gap-2">
					{Array.from([1, 2, 3, 4, 5]).map((i) => (
						<Button
							variant="outline"
							key={i}
							className={cn(
								data.energy === i &&
									{
										1: "bg-red-500 hover:bg-red-400 text-white",
										2: "bg-orange-500 hover:bg-orange-400 text-white",
										3: "bg-yellow-500 hover:bg-yellow-400 text-white",
										4: "bg-blue-500 hover:bg-blue-400 text-white",
										5: "bg-green-500 hover:bg-green-400 text-white",
									}[i],
							)}
							onClick={() => setData({ ...data, energy: i })}
						>
							{i}
						</Button>
					))}
				</CardContent>
			</Card>

			{/* SLEEP */}
			<Card>
				<CardHeader>
					<h3>How was your sleep today?</h3>
				</CardHeader>
				<CardContent className="grid grid-cols-5 gap-2">
					{Array.from([1, 2, 3, 4, 5]).map((i) => (
						<Button
							variant="outline"
							key={i}
							className={cn(
								data.sleep === i &&
									{
										1: "bg-red-500 hover:bg-red-400 text-white",
										2: "bg-orange-500 hover:bg-orange-400 text-white",
										3: "bg-yellow-500 hover:bg-yellow-400 text-white",
										4: "bg-blue-500 hover:bg-blue-400 text-white",
										5: "bg-green-500 hover:bg-green-400 text-white",
									}[i],
							)}
							onClick={() => setData({ ...data, sleep: i })}
						>
							{i}
						</Button>
					))}
				</CardContent>
			</Card>

			{/* CONFIRM DATA */}
			<Card
				className={cn(
					Object.values(data).some((e) => e === undefined) && "hidden",
				)}
			>
				<CardHeader>
					<h3>Confirm data</h3>
				</CardHeader>
				<CardContent>
					<p>
						{user?.first_name} {user?.last_name}
					</p>
					<p>{user?.username}</p>
					<p>{user?.id}</p>
					<ul className="flex gap-4 justify-between items-center">
						{Object.entries(data).map(([name, value]) => {
							return (
								<li key={name}>
									{name}: {value}
								</li>
							);
						})}
					</ul>
				</CardContent>
				<CardFooter className="flex justify-between gap-2 pt-3">
					<Button
						variant="outline"
						className="flex-1"
						onClick={() => setData(initialData)}
					>
						Reset
					</Button>
					<Button
						className="flex-1"
						onClick={() => alert(JSON.stringify(data))}
						disabled={Object.values(data).some((e) => e === undefined)}
					>
						Confirm
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
