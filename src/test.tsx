import { component$ } from "@builder.io/qwik"
import { useTheme } from "./lib/provider"

export const Test = component$(() => {
	const { theme, setTheme, themes, resolvedTheme } = useTheme()
	console.log(theme, themes, resolvedTheme)
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 4,
			}}
		>
			{theme?.toString()}
			{themes?.map((theme) => (
				<button
					key={theme.toString()}
					type="button"
					onClick$={() => {
						console.log(theme)
						setTheme(theme)
					}}
				>
					{theme.toString()}
				</button>
			))}

			{/* <button
				type="button"
				onClick$={() => {
					setTheme(theme === "dark" ? "light" : "dark")
					// themeSig.value = themeSig.value === "dark" ? "light" : "dark"
				}}
			>
				Toggle
			</button> */}
		</div>
	)
})
