import { ThemeProvider } from "./lib/provider"
import { Test } from "./test"

export default () => {
	return (
		<>
			<head>
				<meta charSet="utf-8" />
				<title>Qwik Blank App</title>
			</head>
			<body class="dark">
				<ThemeProvider>
					<div>Cool</div>
					<Test />
				</ThemeProvider>
			</body>
		</>
	)
}
