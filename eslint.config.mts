import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig({
  languageOptions: {
    globals: globals.node, 
  },
  ignores: ["node_modules", "dist", "migrations"], 
  rules: {},
});
