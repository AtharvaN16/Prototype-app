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
  - `theme.css` — the product's design system (Uniwind theme): colors, `--font-sans`, type scale.
  - `index.ts` — the `PrototypeProduct` and its projects.
  - `components/` — the product's design-system components (e.g. AccessSOS `SosText`, `SosIcon`).
  - `icons/` — the product's icon SVGs (Figma exports) and their registry (`index.ts`).
  - `screens/` — screens shared by the product's projects (e.g. the AccessSOS design-system sheet).
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

AccessSOS screens use `<SosText variant="h1|h2|h3|button|picker|body-lg|body-lg-bold|body|label|helper|placeholder|subtext|link">`
for text and `<SosIcon name="…" className="size-8 text-primary" />` for icons.

## Fonts & icons

- Product fonts are embedded natively by the `expo-font` plugin in `app.json`, and each theme sets
  `--font-sans` (`<Text>` uses `font-sans`). Adding a font needs a native rebuild (`npm run ios`).
- `.svg` files import as components (`react-native-svg-transformer`, see `svgr.config.js`). `#333333`
  fills become `currentColor`, so `text-*` classes tint single-colour icons.
- New `--text-*` sizes in a product theme must also be added to `lib/utils.ts` so `cn()` treats them
  as font sizes, not colors.

The project folder must not contain spaces — React Native's Xcode build scripts break on them.
