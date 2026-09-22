import { defineConfig } from 'vitest/config'
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'jsdom', include: ['tests/**/*.spec.*'],
    server: { deps: { inline: [/@deepseek-ai\/dsh-client-ui-primitives/] } },
  },
})
