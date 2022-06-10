import { defineConfig, configDefaults } from 'vitest/config'
import { GithubActionsReporter } from './src'

export default defineConfig({
  test: {
    ...configDefaults,
    clearMocks: true,
    reporters: process.env.CI
      ? ['default', new GithubActionsReporter()]
      : configDefaults.reporters,
  },
})
