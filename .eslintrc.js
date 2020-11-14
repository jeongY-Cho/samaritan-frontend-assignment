module.exports = {
  ignorePatterns: ["/dist"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["off", "double"],
    "react/button-has-type": "off",
    "react/jsx-one-expression-per-line": "off",
  },
};
