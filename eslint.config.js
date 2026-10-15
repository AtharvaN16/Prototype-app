// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = (async () => {
  // @shadcn/lint is ESM-only.
  const { plugin: shadcn } = await import('@shadcn/lint');

  return defineConfig([
    expoConfig,
    {
      ignores: ['dist/*', 'ios/*', 'android/*', '.expo/*', 'uniwind-types.d.ts'],
    },
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: { shadcn },
      settings: {
        shadcn: {
          note: 'Design tokens live in global.css (app chrome) and products/<id>/theme.css (one design system per product).',
        },
      },
      rules: {
        // Design-system rules. Tune these to taste — see https://github.com/shadcn-ui/lint#rules
        'shadcn/no-raw-colors': 'error',
        'shadcn/no-arbitrary-values': 'error',
        'shadcn/no-unknown-classes': 'error',
        'shadcn/no-inline-styles': 'error',
        'shadcn/require-static-classes': 'error',
        'shadcn/no-restyle': [
          'error',
          {
            allow: ['layout'],
            // Icons take their color from the call site; SosText's color varies by context in the kit (white / red / blue).
            contracts: [{ pattern: '^(Icon|Symbol|SosIcon|SosText)$', allow: ['layout', 'color'] }],
          },
        ],
      },
    },
    {
      files: ['scripts/**', 'plugins/**', '*.config.js', 'products/themes.js'],
      languageOptions: { globals: { __dirname: 'readonly' } },
    },
    {
      // shadcn/ui source (React Native Reusables) and product design-system components own their styling.
      files: ['components/ui/**', 'products/*/components/**'],
      rules: {
        'shadcn/no-restyle': 'off',
        'shadcn/no-arbitrary-values': 'off',
        'shadcn/no-raw-colors': 'off',
        'shadcn/no-unknown-classes': 'off',
        'shadcn/no-inline-styles': 'off',
        'shadcn/require-static-classes': 'off',
      },
    },
  ]);
})();
