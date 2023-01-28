# 📝 vitest-github-actions-summary-reporter

Vitest reporter that will append test results to the [GITHUB_STEP_SUMMARY](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary) file.

## 💿 Installation

```shell
pnpm i -D vitest-github-actions-summary-reporter ts-essentials
```

## 🔧 Configuration

Add new custom reporter `vite.config.ts`

```typescript
import { defineConfig } from 'vitest/config'
import { GithubActionsReporter } from 'vitest-github-actions-summary-reporter'

export default defineConfig({
  test: {
    reporters: [new GithubActionsReporter()],
  },
})
```
