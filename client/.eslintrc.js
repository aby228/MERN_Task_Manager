module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["react-app", "react-app/jest", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};

