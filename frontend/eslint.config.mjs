import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Change no-explicit-any from error to warning
      "@typescript-eslint/no-explicit-any": "warn",
      // Change no-unused-vars from error to warning
      "@typescript-eslint/no-unused-vars": "warn",
      // Allow apostrophes and quotes in JSX text
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
