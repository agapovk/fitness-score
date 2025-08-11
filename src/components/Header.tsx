// import { BackButton } from "./BackButton";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export default function Header() {
	const launchParams = useLaunchParams();
	return (
		<header className="p-2 flex gap-2 bg-white text-black justify-between">
			{/* <BackButton /> */}
			{/* <h1>Fit-score</h1> */}
			{JSON.stringify(launchParams, null, 2)}
		</header>
	);
}
