import { BackButton } from "./BackButton";

export default function Header() {
	return (
		<header className="p-2 flex gap-2 bg-white text-black justify-between">
			<BackButton />
			<h1>Fit-score</h1>
		</header>
	);
}
