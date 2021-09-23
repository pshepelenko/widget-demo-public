module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended' // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
      arrowFunctions: true
    }
  },
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      paths: ['./src']
    }
  },
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'spaced-comment': 2,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    ]
  }
}
