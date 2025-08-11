import { backButton, useSignal } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

/**
 * Component which controls the Back Button visibility.
 */
export function BackButton() {
	const isVisible = useSignal(backButton.isVisible);

	useEffect(() => {
		console.log("The button is", isVisible ? "visible" : "invisible");
	}, [isVisible]);

	useEffect(() => {
		backButton.show();
		return () => {
			backButton.hide();
		};
	}, []);

	return null;
}
