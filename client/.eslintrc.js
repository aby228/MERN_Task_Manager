module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // Keep CRA defaults; drop prettier-enforced errors during build
  extends: ["react-app", "react-app/jest"],
  rules: {}
};

