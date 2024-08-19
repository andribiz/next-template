
import baseConfig from "@template/tailwind-config";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  ...baseConfig,
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
}

