import type { Awaitable, File, Reporter } from 'vitest'
import { summary } from '@actions/core'
import { buildSummaryTable } from './summary-table'

class GithubActionsReporter implements Reporter {
  onFinished(files?: File[], errors?: unknown[]): Awaitable<void> {
    summary.addHeading('Test Results', 1)
    const summaryTable = buildSummaryTable([
      'File',
      'Test',
      'Result',
      'Skipped',
      'Duration',
    ])
    files?.map(summaryTable.addFile)
    summary.addTable(summaryTable.getRows())
    summary.write()

    return Promise.resolve()
  }
}

export { GithubActionsReporter }
