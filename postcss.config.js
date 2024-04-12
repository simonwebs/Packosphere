// postcss.config.js

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('tailwindcss'),
    // PurgeCSS only if needed for additional customization not covered by Tailwind's purge
    ...(process.env.NODE_ENV === 'production'
      ? [
          require('@fullhuman/postcss-purgecss')({
            content: [
              './imports/ui/**/*.{html,js,jsx,tsx}',
              './client/**/*.html',
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
          }),
        ]
      : []),
  ],
};
