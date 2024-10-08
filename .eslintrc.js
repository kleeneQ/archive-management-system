module.exports = {
  lintOnSave: false, //关闭eslint
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    // 加上vue/表示作用在vue模板部分，不加vue/  表示作用在js部分
    'vue/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'off',
    'no-multi-spaces': 'off'
  }
}
