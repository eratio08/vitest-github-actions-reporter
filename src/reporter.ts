import type { Awaitable, File, Reporter } from 'vitest'
import { summary, notice } from '@actions/core'
import { buildSummaryTable } from './summary-table'

class GithubActionsReporter implements Reporter {
  onFinished(files?: File[], errors?: unknown[]): Awaitable<void> {
    notice('Running Vitest Github Actions Summary Reporter')
    summary.addHeading('Test Results', 1)
    const summaryTable = buildSummaryTable([
      'File',
      'Result',
      'Skipped',
      'Duration',
    ])
    files
      ?.map((file) => {
        notice(file.name)
        return file
      })
      .map(summaryTable.addFile)
    summary.addTable(summaryTable.getRows())

    return Promise.resolve()
  }
}

export { GithubActionsReporter }
