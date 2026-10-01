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
          note: 'Design tokens live in global.css (app chrome) and projects/<id>/theme.css (each prototype project).',
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
            // Icons take their color from the call site.
            contracts: [{ pattern: '^(Icon|Symbol)$', allow: ['layout', 'color'] }],
          },
        ],
      },
    },
    {
      files: ['scripts/**', 'plugins/**', '*.config.js', 'projects/themes.js'],
      languageOptions: { globals: { __dirname: 'readonly' } },
    },
    {
      // shadcn/ui source (React Native Reusables) owns its own styling.
      files: ['components/ui/**'],
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
