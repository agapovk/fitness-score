import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import React from "react";

export type Data = {
	isReady: boolean | undefined;
	energy: number | undefined;
	sleep: number | undefined;
	discomfort: {
		isDiscomfort: boolean | undefined;
		area: string | undefined;
	};
};

export function CarouselView() {
	const initialData = {
		isReady: undefined,
		energy: undefined,
		sleep: undefined,
		discomfort: {
			isDiscomfort: undefined,
			area: undefined,
		},
	};

	const [data, setData] = React.useState<Data>(initialData);
	const [api, setApi] = React.useState<CarouselApi>();

	return (
		<div className="p-4">
			<Carousel setApi={setApi}>
				<CarouselContent>
					{/* READY? */}
					<CarouselItem>
						<Card>
							<CardHeader>
								<h3>Are you ready today?</h3>
							</CardHeader>
							<CardContent className="flex justify-between gap-2">
								<Button
									size="sm"
									variant="outline"
									className="flex-1"
									onClick={() => {
										setData({
											...data,
											isReady: true,
										});
										api?.scrollNext();
									}}
								>
									YES
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="flex-1"
									onClick={() => {
										setData({
											...data,
											isReady: false,
										});
										api?.scrollTo(3);
									}}
								>
									NO
								</Button>
							</CardContent>
						</Card>
					</CarouselItem>

					{/* ENERGY */}
					<CarouselItem>
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
											data.energy === i
												? "bg-slate-500 text-white hover:bg-slate-400"
												: "",
										)}
										onClick={() => setData({ ...data, energy: i })}
									>
										{i}
									</Button>
								))}
							</CardContent>
							<CardFooter className="flex justify-end">
								<Button
									disabled={data.energy === undefined}
									onClick={() => api?.scrollNext()}
								>
									Next
								</Button>
							</CardFooter>
						</Card>
					</CarouselItem>

					{/* SLEEP */}
					<CarouselItem>
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
											data.sleep === i
												? "bg-slate-500 text-white hover:bg-slate-400"
												: "",
										)}
										onClick={() => setData({ ...data, sleep: i })}
									>
										{i}
									</Button>
								))}
							</CardContent>
							<CardFooter className="flex justify-end">
								<Button
									disabled={data.sleep === undefined}
									onClick={() => api?.scrollNext()}
								>
									Next
								</Button>
							</CardFooter>
						</Card>
					</CarouselItem>

					{/* DISCOMFORT */}
					<CarouselItem>
						<Card>
							<CardHeader>
								<h3>Do you feel some discomfort?</h3>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex justify-between gap-2">
									<Button
										size="sm"
										variant="outline"
										className={cn(
											"flex-1",
											data.discomfort.isDiscomfort === true
												? "bg-slate-500 text-white hover:bg-slate-400"
												: "",
										)}
										onClick={() => {
											setData({
												...data,
												discomfort: {
													...data.discomfort,
													isDiscomfort: true,
												},
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
											data.discomfort.isDiscomfort === false
												? "bg-slate-500 text-white hover:bg-slate-400"
												: "",
										)}
										onClick={() => {
											setData({
												...data,
												discomfort: {
													...data.discomfort,
													isDiscomfort: false,
												},
											});
										}}
									>
										NO
									</Button>
								</div>
								<div
									className={cn(
										"hidden space-y-2",
										data.discomfort.isDiscomfort && "block",
									)}
								>
									<h3>Choose area of discomfort</h3>
									<div className="flex gap-2 flex-wrap">
										<Button
											variant="outline"
											className={cn(
												data.discomfort.area === "Hip" &&
													"bg-slate-500 text-white hover:bg-slate-400",
											)}
											onClick={() =>
												setData({
													...data,
													discomfort: { ...data.discomfort, area: "Hip" },
												})
											}
										>
											Hip
										</Button>
										<Button
											variant="outline"
											className={cn(
												data.discomfort.area === "Knee" &&
													"bg-slate-500 text-white hover:bg-slate-400",
											)}
											onClick={() =>
												setData({
													...data,
													discomfort: { ...data.discomfort, area: "Knee" },
												})
											}
										>
											Knee
										</Button>
										<Button
											variant="outline"
											className={cn(
												data.discomfort.area === "Ankle" &&
													"bg-slate-500 text-white hover:bg-slate-400",
											)}
											onClick={() =>
												setData({
													...data,
													discomfort: { ...data.discomfort, area: "Ankle" },
												})
											}
										>
											Ankle
										</Button>
									</div>
								</div>
							</CardContent>
							<CardFooter className="flex justify-end">
								<Button
									disabled={data.discomfort.isDiscomfort === undefined}
									onClick={() => api?.scrollNext()}
								>
									Next
								</Button>
							</CardFooter>
						</Card>
					</CarouselItem>

					{/* CONFIRM DATA */}
					<CarouselItem>
						<Card>
							<CardHeader>
								<h3>Confirm data</h3>
							</CardHeader>
							<CardContent className="flex items-center gap-2">
								{data.isReady ? (
									<>
										<div className="flex flex-col items-center">
											<dt className="text-sm text-muted-foreground">Energy</dt>
											<dd className="text-4xl">{data.energy}</dd>
										</div>
										<div className="flex flex-col items-center">
											<dt className="text-sm text-muted-foreground">Sleep</dt>
											<dd className="text-4xl">{data.sleep}</dd>
										</div>
									</>
								) : (
									<>
										<p className="text-2xl text-red-500 flex-1 text-center">
											I am not ready today
										</p>
									</>
								)}
								<div className="flex flex-col items-center flex-1">
									<dt className="text-sm text-muted-foreground">Discomfort</dt>
									<dd className="text-4xl">
										{data.discomfort.isDiscomfort
											? `in ${data.discomfort.area}`
											: "NO"}
									</dd>
								</div>
							</CardContent>
							<CardFooter className="flex justify-between gap-2">
								<Button
									variant="outline"
									className="flex-1"
									onClick={() => api?.scrollPrev()}
								>
									Go back
								</Button>
								<Button
									variant="destructive"
									className="flex-1"
									onClick={() => {
										setData(initialData);
										api?.scrollTo(0);
										return;
									}}
								>
									Reset
								</Button>
								<Button className="flex-1" onClick={() => console.log(data)}>
									Send your status
								</Button>
							</CardFooter>
						</Card>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	);
}
