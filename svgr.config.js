// Used by react-native-svg-transformer when importing .svg files.
module.exports = {
  native: true,
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
  // Icons are drawn in #333333 in Figma; render that as `currentColor` so the icon's `color` (text-* class) tints it.
  // Multi-colour icons (Medical red, Police blue, …) keep their own colours.
  replaceAttrValues: { '#333333': 'currentColor' },
  svgoConfig: {
    plugins: [
      // Same as react-native-svg-transformer's defaults (this config replaces them).
      {
        name: 'preset-default',
        params: {
          overrides: {
            inlineStyles: { onlyMatchedOnce: false },
            removeViewBox: false,
            removeUnknownsAndDefaults: false,
            convertColors: false,
          },
        },
      },
      // Figma exports put web-only attributes (`style="display: block;"`, `overflow`) on the root <svg>.
      { name: 'removeAttrs', params: { attrs: ['svg:(style|overflow|preserveAspectRatio)'] } },
    ],
  },
};
