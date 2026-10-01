# Prototype

An iOS app for running interactive prototypes: multiple projects, each with its own design system and multiple flows.

- Tap the small dot in the bottom-left corner to open the controls.
- Pick a project at the top, pick a flow from the pills, and use the sheet to begin, go back or forward, or jump to a screen.

## Run on your iPhone (Xcode)

```bash
npm install
npx expo prebuild -p ios   # generates ios/ (only needed once, or after adding native libraries)
npm start                  # Metro: serves the screens to the app, with live reload
```

Then open `ios/Prototype.xcworkspace` in Xcode, pick your iPhone, and press ⌘R.
After that, saving any file in `app/`, `components/` or `projects/` updates the phone instantly — no rebuild.

> Keep the project in a folder **without spaces** in its path — React Native's build scripts break on spaces.

## Checks

```bash
npm run lint       # ESLint + @shadcn/lint design-system rules
npm run typecheck
```

See [AGENTS.md](./AGENTS.md) for the project structure and how to add projects and screens.
