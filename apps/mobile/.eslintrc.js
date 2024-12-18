// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: ['/dist/*'],
};
s;
