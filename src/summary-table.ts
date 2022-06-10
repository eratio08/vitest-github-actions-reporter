import { SummaryTableCell, SummaryTableRow } from '@actions/core/lib/summary'
import { UnreachableCaseError } from 'ts-essentials'
import { File, RunMode, Suite, Task, TaskState, Test } from 'vitest'

const asCode = (str: string) => `<code>${str}</code>`

const fileName = (test: Test) =>
  (test.file?.name && asCode(test.file?.name)) ?? ''

const buildFullName = (test: Test): string => {
  const rec = (name: string, suite: Suite): string => {
    if (!suite.suite) {
      return `${name}`
    } else {
      return rec(`${suite.name}.${name}`, suite.suite)
    }
  }

  if (test.suite) return asCode(rec(test.name, test.suite))
  else return asCode(test.name)
}

const stateToEmoji = (state?: TaskState): string => {
  switch (state) {
    case 'fail':
      return '❌'
    case 'pass':
      return '✅'
    default:
      return '❔'
  }
}

const runModeToEmoji = (runMode?: RunMode): string => {
  switch (runMode) {
    case 'skip':
      return '❗'
    default:
      return ''
  }
}

const formatDuration = (task: Task): string =>
  `${task.result?.duration?.toString() ?? '0'}ms`

const testToRow = (test: Test): SummaryTableRow => [
  { data: fileName(test) },
  { data: buildFullName(test) },
  { data: stateToEmoji(test.result?.state) },
  { data: runModeToEmoji(test.mode) },
  { data: formatDuration(test) },
]

const buildSummaryTable = (headers: string[]) => {
  const rows: SummaryTableRow[] = []
  rows.push(
    headers.map((item): SummaryTableCell => ({ data: item, header: true }))
  )

  const addFile = (file: File) => {
    const rec =
      (rows: SummaryTableRow[]) =>
      (task: Task): SummaryTableRow[] => {
        switch (task.type) {
          case 'suite': {
            return task.tasks.flatMap(rec(rows))
          }
          case 'test': {
            return [...rows, testToRow(task)]
          }
          default:
            throw new UnreachableCaseError(task)
        }
      }

    rec([])(file).forEach((row) => rows.push(row))
  }

  const getRows = (): SummaryTableRow[] => [...rows]

  return {
    addFile,
    getRows,
  }
}

type SummaryTable = ReturnType<typeof buildSummaryTable>

export { buildSummaryTable }
export type { SummaryTable }
