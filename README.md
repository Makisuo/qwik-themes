# Qwik Themes

This is a direct Qwik port of the amazing library [Next Themes](https://github.com/pacocoursey/next-themes).
Please give the original creator some ❤️

---

An abstraction for themes in your Qwik app.

- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ No flash on load 
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
- ✅ `useTheme` hook


## Install

```bash
$ bun add qwik-themes
# or
$ npm install qwik-themes
# or
$ yarn add qwik-themes
# or
$ pnpm add qwik-themes
```

## Use

Wrap your root with the ThemeProvider

```js
// src/root.tsx
import { ThemeProvider } from 'qwik-themes'

export  default component$(({ Component, pageProps }) => {
  return (
   <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="manifest" href="/manifest.json" />
                <RouterHead />
                <ServiceWorkerRegister />
            </head>
            <body lang="en">
                <ThemeProvider>
                    <RouterOutlet />
                </ThemeProvider>
            </body>
	</QwikCityProvider>
  )
})
```


### HTML & CSS

That's it, now your Qwik app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, qwik-themes modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

```css
:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
}

[data-theme='dark'] {
  --background: black;
  --foreground: white;
}
```

> **Note!** If you set the attribute of your Theme Provider to class for Tailwind qwik-themes will modify the `class` attribute on the `html` element. See [With Tailwind](###with-tailwind).

### useTheme

Your UI will need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```js
import { useTheme } from 'qwik-themes'

const ThemeChanger = component$(() => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
})
```

## API

Let's dig into the details.

### ThemeProvider

All your theme configuration is passed to ThemeProvider.

- `storageKey = 'theme'`: Key used to store theme setting in localStorage
- `defaultTheme = 'system'`: Default theme name (for v0.0.12 and lower the default was `light`). If `enableSystem` is false, the default theme is `light`
- `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
- `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
- `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
- `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes ([example](#disable-transitions-on-theme-change))
- `themes = ['light', 'dark']`: List of theme names
- `attribute = 'data-theme'`: HTML attribute modified based on the active theme
  - accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) ([example](#class-instead-of-data-attribute))
- `value`: Optional mapping of theme name to attribute value
  - value is an `object` where key is the theme name and value is the attribute value ([example](#differing-dom-attribute-and-theme-name))
- `nonce`: Optional nonce passed to the injected `script` tag, used to allow-list the qwik-themes script in your CSP

### useTheme

useTheme takes no parameters, but returns:

- `theme`: Active theme name
- `setTheme(name)`: Function to update the theme
- `forcedTheme`: Forced page theme or falsy. If `forcedTheme` is set, you should disable any theme switching UI
- `resolvedTheme`: If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme`
- `systemTheme`: If `enableSystem` is true, represents the System theme preference ("dark" or "light"), regardless what the active theme is
- `themes`: The list of themes passed to `ThemeProvider` (with "system" appended, if `enableSystem` is true)

Not too bad, right? Let's see how to use these properties with examples:

## Examples

The [Live Example](TODO) shows qwik-themes in action, with dark, light, system themes and pages with forced themes.

### Use System preference by default

```js
<ThemeProvider>
```

### Ignore System preference

If you don't want a System theme, disable it via `enableSystem`:

```js
<ThemeProvider enableSystem={false}>
```

### Class instead of data attribute

If your Qwik app uses a class to style the page based on the theme, change the attribute prop to `class`:

```js
<ThemeProvider attribute="class">
```

Now, setting the theme to "dark" will set `class="dark"` on the `html` element.

### Multi Class Themes

You can also use multi Class Themes like `[dark, skeumorphic]`


```tsx
<ThemeProvider
    themes={[
						["simple", "light-yellow"],
						["simple", "dark-yellow"],
						["brutalist", "light-yellow"],
						["brutalist", "dark-yellow"],
						["hand-drawn", "light"],
						["hand-drawn", "dark"],
            ]
}>
```

and then you can simply change the theme as before, just with your arrays instead!

```tsx
	const { setTheme } = useTheme()

  setTheme(["simple", "light-yellow"])
```


### Force page to a theme
TODO

### Disable transitions on theme change

The creator of qwik-themes wrote about [this technique here](https://paco.sh/blog/disable-theme-transitions). We can forcefully disable all CSS transitions before the theme is changed, and re-enable them immediately afterwards. This ensures your UI with different transition durations won't feel inconsistent when changing the theme.

To enable this behavior, pass the `disableTransitionOnChange` prop:

```js
<ThemeProvider disableTransitionOnChange>
```

### Differing DOM attribute and theme name

The name of the active theme is used as both the localStorage value and the value of the DOM attribute. If the theme name is "pink", localStorage will contain `theme=pink` and the DOM will be `data-theme="pink"`. You **cannot** modify the localStorage value, but you **can** modify the DOM value.

If we want the DOM to instead render `data-theme="my-pink-theme"` when the theme is "pink", pass the `value` prop:

```js
<ThemeProvider value={{ pink: 'my-pink-theme' }}>
```

Done! To be extra clear, this affects only the DOM. Here's how all the values will look:

```js
const { theme } = useTheme()
// => "pink"

localStorage.getItem('theme')
// => "pink"

document.documentElement.getAttribute('data-theme')
// => "my-pink-theme"
```

### More than light and dark mode

qwik-themes is designed to support any number of themes! Simply pass a list of themes:

```js
<ThemeProvider themes={['pink', 'red', 'blue']}>
```

> **Note!** When you pass `themes`, the default set of themes ("light" and "dark") are overridden. Make sure you include those if you still want your light and dark themes:

```js
<ThemeProvider themes={['pink', 'red', 'blue', 'light', 'dark']}>
```

### Without CSS variables

This library does not rely on your theme styling using CSS variables. You can hard-code the values in your CSS, and everything will work as expected (without any flashing):

```css
html,
body {
  color: #000;
  background: #fff;
}

[data-theme='dark'],
[data-theme='dark'] body {
  color: #fff;
  background: #000;
}
```


#### CSS

You can also use CSS to hide or show content based on the current theme. To avoid the hydration mismatch, you'll need to render _both_ versions of the UI, with CSS hiding the unused version. For example:

```jsx
function ThemedImage() {
  return (
    <>
      {/* When the theme is dark, hide this div */}
      <div data-hide-on-theme="dark">
        <img src="light.png" width={400} height={400} />
      </div>

      {/* When the theme is light, hide this div */}
      <div data-hide-on-theme="light">
        <img src="dark.png" width={400} height={400} />
      </div>
    </>
  )
}

export default ThemedImage
```

```css
[data-theme='dark'] [data-hide-on-theme='dark'],
[data-theme='light'] [data-hide-on-theme='light'] {
  display: none;
}
```

### With Tailwind

[Visit the live example](TODO) • [View the example source code](TODO)

In your `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class'
}
```

Set the attribute for your Theme Provider to class:

```js
// root.tsx
<ThemeProvider attribute="class">
```

If you're using the `value` prop to specify different attribute values, make sure your dark theme explicitly uses the "dark" value, as required by Tailwind.

That's it! Now you can use dark-mode specific classes:

```js
<h1 className="text-black dark:text-white">
```




## FAQ

---

**Do I need to use CSS variables with this library?**

Nope. See the [example](#without-css-variables).

---

**Can I set the class or data attribute on the body or another element?**

Nope. If you have a good reason for supporting this feature, please open an issue.

---

**Is the injected script minified?**

Yes, using Terser.

---

**Why is `resolvedTheme` necessary?**

When supporting the System theme preference, you want to make sure that's reflected in your UI. This means your buttons, selects, dropdowns, or whatever you use to indicate the current theme should say "System" when the System theme preference is active.

If we didn't distinguish between `theme` and `resolvedTheme`, the UI would show "Dark" or "Light", when it should really be "System".

`resolvedTheme` is then useful for modifying behavior or styles at runtime:

```js
const { resolvedTheme } = useTheme()

<div style={{ color: resolvedTheme === 'dark' ? white : black }}>
```

If we didn't have `resolvedTheme` and only used `theme`, you'd lose information about the state of your UI (you would only know the theme is "system", and not what it resolved to).
