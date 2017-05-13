module.exports = {
  extends: ['airbnb-base', 'prettier'],
  installedESLint: true,
  'no-unused-vars': 0,
  plugins: ['react'],
  env: {
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 0,
    'react/no-named-default': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-underscore-dangle': 'off',
  },
};
