import type { Awaitable, File, Reporter } from 'vitest'
import { buildFileAppender } from './file-appender'
import type { FileAppender, Table } from './file-appender'
import { buildRowFromFile } from './table'

class GithubActionsReporter implements Reporter {
  private fileAppender: FileAppender

  constructor() {
    const stepSummaryFile = process.env.GITHUB_STEP_SUMMARY
    if (!stepSummaryFile) throw Error('GITHUB_STEP_SUMMARY needs to be set')
    this.fileAppender = buildFileAppender(stepSummaryFile)
  }

  onFinished(files?: File[], errors?: unknown[]): Awaitable<void> {
    this.fileAppender.appendLine('# Test Results')
    const table: Table = {
      headers: ['File', 'Result', 'Skipped', 'Duration'],
      rows: files?.flatMap(buildRowFromFile) ?? [],
    }
    console.log(table)
    this.fileAppender.appendTable(table)

    return Promise.resolve()
  }
}

export { GithubActionsReporter }
