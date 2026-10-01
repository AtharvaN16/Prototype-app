# Prototype

An iOS app for running interactive prototypes. Products (each with its own design system) contain projects; projects contain explorations, and each exploration has versions (v1, v2, …).

- Tap the small dot in the bottom-left corner to open the controls.
- Pick a project at the top and an exploration from the tabs; in the bottom sheet pick a version, then begin, go back or forward, or jump to a screen.

## Run on your iPhone (Xcode)

```bash
npm install
npx expo prebuild -p ios   # generates ios/ (only needed once, or after adding native libraries)
npm start                  # Metro: serves the screens to the app, with live reload
```

Then open `ios/Prototype.xcworkspace` in Xcode, pick your iPhone, and press ⌘R.
After that, saving any file in `app/`, `components/` or `products/` updates the phone instantly — no rebuild.

> Keep the project in a folder **without spaces** in its path — React Native's build scripts break on spaces.

## Checks

```bash
npm run lint       # ESLint + @shadcn/lint design-system rules
npm run typecheck
```

See [AGENTS.md](./AGENTS.md) for the project structure and how to add projects and screens.
