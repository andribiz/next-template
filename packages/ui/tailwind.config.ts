/*
 * This file is not used for any compilation purpose, it is only used
 * for Tailwind Intellisense & Autocompletion in the source files
 */
import baseConfig from "@template/tailwind-config";

import type { Config } from "tailwindcss";

export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './primitives/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
} satisfies Config;

