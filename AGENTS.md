# Prototype

iOS app for playing interactive prototypes. Expo (SDK 56) + expo-router, styled with
Uniwind (Tailwind v4) and shadcn components from React Native Reusables.

After making changes, run `npm run lint` and `npm run typecheck`, and fix all errors.

## Model

**Product** (owns the design system, e.g. AccessSOS) → **Project** (e.g. Assistive Call) →
**Exploration** (a design direction; the tabs at the top of the controls) → **Version**
(v1, v2, …; the segmented control in the bottom sheet) → ordered **steps** (screen ids).

## Structure

- `app/index.tsx` — the player: renders the active screen inside the product's theme, plus the control dot.
- `app/controls.tsx` — native iOS form sheet: version switcher + playback controls.
- `components/player/` — control dot, top overlay (project picker + exploration tabs), glass.
- `components/ui/` — shadcn (React Native Reusables) components. Add more with
  `npx @react-native-reusables/cli@latest add <name> --styling-library uniwind`
  (answer **no** when asked to overwrite `text.tsx` — it has a custom `overline` variant).
- `lib/prototype/` — types, state provider (selection + history), shared screens.
- `products/<product>/`:
  - `theme.css` — the product's design system (Uniwind theme).
  - `index.ts` — the `PrototypeProduct` and its projects.
  - `projects/<project>/index.ts` — the project's screens and explorations/versions.
  - `projects/<project>/screens/` — the project's screens.

## Adding a product

1. Create `products/<id>/theme.css` with an `@variant <id> { ... }` block defining **every**
   variable the other themes define (see `global.css`).
2. Import it from `global.css` and add `<id>` to `products/themes.js`.
3. Create `products/<id>/index.ts` exporting a `PrototypeProduct` and add it to `products/index.ts`.
4. Restart Metro (`npm start`) so Uniwind picks up the new theme — a running Metro rewrites the
   generated theme files with its old theme list.

## Screens

Screens receive `{ nav }`: `nav.next()`, `nav.back()`, `nav.go(screenId)`, `nav.restart()`.
Style them only with theme tokens (`bg-primary`, `text-muted-foreground`, …) so they follow the
product's design system — `@shadcn/lint` enforces this.

The project folder must not contain spaces — React Native's Xcode build scripts break on them.
