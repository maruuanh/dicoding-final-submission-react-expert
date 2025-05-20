// eslint-disable-next-line no-undef
module.exports = {
  tabWidth: 2,
  useTabs: false,
  indentStyle: 'space',
  indentSwitchCase: true,
  extends: ['plugin:jest/recommended', 'prettier'],
  env: {
    jest: true,
  },
  rules: {
    indent: ['error', 2, { 'SwitchCase': 1 }]
  },
  plugins: ['jest'],
};
