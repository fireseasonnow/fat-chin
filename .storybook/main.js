module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs/register',
    '@storybook/addon-storysource',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-a11y/register',
  ],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
