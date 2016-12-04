module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true,
    "mocha": true,
    "es6": true
  },
  "plugins": [
    "react",
    "jsx-a11y"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "import/no-unresolved": 2,
    "import/no-named-default": 0,
    "comma-dangle": ["error", "never"],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "no-console": 0,
    "max-len": 0,
    "prefer-template": 2,
    "no-use-before-define": 0,
    "newline-per-chained-call": 0,
    "arrow-body-style": [2, "as-needed"],
    "arrow-parens": 0,
    "no-unused-vars": ["error", { "args": "none" }],
    "jsx-a11y/href-no-hash": 2,
    "jsx-a11y/label-has-for": 2,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "jsx-a11y/aria-props": 2,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "arrow-body-style": 0,
    "no-global-assign": 0,
    "no-unused-expressions": ["error", { "allowTernary": true }],
    "no-return-assign": [ "error", "except-parens" ]
  }
}
