import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";
import eslintConfigPrettier from "eslint-config-prettier";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          type: "line-length",
          order: "asc",
          fallbackSort: { type: "alphabetical", order: "asc" },
          newlinesBetween: 1,
          internalPattern: ["^@/.+"],
          groups: [
            "side-effect-style",
            ["type-builtin", "value-builtin"],
            ["type-external", "value-external"],
            "custom-helpers",
            "custom-ui",
            "unknown",
          ],
          customGroups: [
            {
              groupName: "custom-helpers",
              elementNamePattern: "^@/(lib|utils|queries)/.+",
            },
            {
              groupName: "custom-ui",
              elementNamePattern: "^@/(components|screens)/.+",
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
