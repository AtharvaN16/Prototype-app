// Regenerates Uniwind's theme CSS + types outside of Metro, so ESLint (@shadcn/lint)
// can build the Tailwind theme including every product's theme variant.
const { execFileSync } = require('node:child_process');
const themes = require('../products/themes');

execFileSync(
  'npx',
  [
    'uniwind',
    'generate-artifacts',
    '--css',
    './global.css',
    '--dts',
    './uniwind-types.d.ts',
    ...themes.flatMap((t) => ['--theme', t]),
  ],
  { stdio: 'inherit', cwd: require('node:path').join(__dirname, '..') }
);
