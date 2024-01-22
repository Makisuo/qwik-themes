import { ThemeProvider } from "./lib/provider"
import { Test } from "./test"

export default () => {
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body>
				<ThemeProvider
					themes={[
						["simple", "light-yellow"],
						["simple", "dark-yellow"],
						["brutalist", "light-yellow"],
						["brutalist", "dark-yellow"],
						["hand-drawn", "light"],
						["hand-drawn", "dark"],
					]}
					// themes={["dark", "light"]}
					attribute="class"
					// defaultTheme="dark"
				>
					<div>Nested Theme test</div>
					<Test />
				</ThemeProvider>
			</body>
		</>
	)
}
