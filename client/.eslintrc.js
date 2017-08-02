module.exports = {
  extends: ["prettier"],
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};
