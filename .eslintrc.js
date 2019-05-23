module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react'],
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: 'babel-eslint',
  rules: {
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off'
  }
};
