import { component$ } from "@builder.io/qwik"
import { useTheme } from "./lib/provider"

export const Test = component$(() => {
	const { theme, setTheme, resolvedTheme } = useTheme()
	console.log(theme, resolvedTheme)
	return (
		<div>
			{theme}
			<button
				type="button"
				onClick$={() => {
					setTheme(theme === "dark" ? "light" : "dark")
					// themeSig.value = themeSig.value === "dark" ? "light" : "dark"
				}}
			>
				Toggle
			</button>
		</div>
	)
})
