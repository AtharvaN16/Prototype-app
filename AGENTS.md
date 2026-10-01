# Prototype

iOS app for playing interactive prototypes. Expo (SDK 56) + expo-router, styled with
Uniwind (Tailwind v4) and shadcn components from React Native Reusables.

After making changes, run `npm run lint` and `npm run typecheck`, and fix all errors.

## Structure

- `app/index.tsx` — the player: renders the active screen inside the project's theme, plus the control dot.
- `app/controls.tsx` — native iOS form sheet with playback controls.
- `components/player/` — control dot, top overlay (project picker + flow pills), glass.
- `components/ui/` — shadcn (React Native Reusables) components. Add more with
  `npx @react-native-reusables/cli@latest add <name> --styling-library uniwind`.
- `lib/prototype/` — types, state provider (project / flow / history), shared screens.
- `projects/<id>/` — one folder per prototype project:
  - `index.ts` — screens + flows.
  - `theme.css` — the project's design system (Uniwind theme).
  - `screens/` — the project's screens.

## Adding a project

1. Create `projects/<id>/theme.css` with an `@variant <id> { ... }` block defining **every**
   variable the other themes define (see `global.css`).
2. Import it from `global.css` and add `<id>` to `projects/themes.js`.
3. Create `projects/<id>/index.ts` exporting a `PrototypeProject` and add it to `projects/index.ts`.
4. Restart Metro (`npm start`) so Uniwind picks up the new theme.

## Screens

Screens receive `{ nav }`: `nav.next()`, `nav.back()`, `nav.go(screenId)`, `nav.restart()`.
Style them only with theme tokens (`bg-primary`, `text-muted-foreground`, …) so they follow the
project's design system — `@shadcn/lint` enforces this.
