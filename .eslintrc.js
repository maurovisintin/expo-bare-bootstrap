module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  rules: {
    /**
     * @description rules of eslint official
     */
    /**
     * @bug https://github.com/benmosher/eslint-plugin-import/issues/1282
     * "import/named" temporary disable.
     */
    'import/named': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    /**
     * @bug?
     * "import/export" temporary disable.
     */
    'import/export': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off', // Allow single Named-export
    'no-unused-expressions': [
      'warn',
      {
        allowShortCircuit: true,
        allowTernary: true
      }
    ], // https://eslint.org/docs/rules/no-unused-expressions

    /**
     * @description rules of @typescript-eslint
     */
    '@typescript-eslint/prefer-interface': 'off', // also want to use "type"
    '@typescript-eslint/explicit-function-return-type': 'off', // annoying to force return type
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/camelcase': 'off', // Apollo GraphQL auto-generated types
    '@typescript-eslint/ban-ts-ignore': 'off', // annoying to have this when we need ts-ignore to make tests work
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    /**
     * @description rules of eslint-plugin-react
     */
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx']
      }
    ], // also want to use with ".tsx"
    'react/prop-types': 'off', // Is this incompatible with TS props type?
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false }
    ], // Conflicts with prettier
    'react/jsx-curly-newline': 'off', // Conflicts with prettier
    'react/display-name': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-props-no-spreading': 'off',

    /**
     * @description rules of eslint-plugin-prettier
     */
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        trailingComma: 'none'
      }
    ]
  }
};
