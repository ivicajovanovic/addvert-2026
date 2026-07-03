import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "components/ui/**",
  ]),
  {
    files: ["hooks/**/*.{ts,tsx}"],
    rules: {
      // Legitimate sync-with-DOM patterns (scroll reveal, breakpoints, media queries).
      "react-hooks/set-state-in-effect": "off",
    },
  },
])

export default eslintConfig
