module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:react/recommended", // 리액트 추천 룰셋
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // 타입스크립트 추천 룰셋
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함. (eslint-plugin-prettier)
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "simple-import-sort/imports": [
      "warn",
      {
        groups: [
          // Packages `react` related packages come first.
          ["^react", "^@?\\w"],
          // Internal packages.
          ["^(@|components)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.?(css)$"],
        ],
      },
    ],
    "prettier/prettier": [
      "warn",
      {
        "endOfLine": "auto"
      }
    ],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": [ "warn" ]
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
  },
};
