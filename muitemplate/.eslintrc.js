module.exports = {
  extends: ["react-app", "plugin:prettier/recommended",  "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
