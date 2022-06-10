import { appendFileSync } from 'fs'
import type { Table } from './table'

const buildFileAppender = (summaryFilePath: string) => {
  const appendLine = (line: string) =>
    appendFileSync(summaryFilePath, `${line}\n`)

  const appendTable = (table: Table) => {
    const buildTableLine = (columns: string[]) =>
      columns.reduce((acc, col) => `${acc}${col}|`, '|')

    const headline = buildTableLine(table.headers)
    const headlineSeparator = buildTableLine(
      table.headers.map((col) => '-'.repeat(col.length))
    )
    appendLine(headline)
    appendLine(headlineSeparator)
    table.rows.map(buildTableLine).forEach(appendLine)
  }

  return {
    appendLine,
    appendTable,
  }
}

type FileAppender = ReturnType<typeof buildFileAppender>

export { buildFileAppender }
export type { FileAppender, Table }
