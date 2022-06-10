import type { File, RunMode, Suite, Task, TaskState, Test } from 'vitest'
import { UnreachableCaseError } from 'ts-essentials'

type Table = {
  headers: string[]
  rows: string[][]
}

const buildRowFromFile = (task: File): string[][] => {
  const buildFullName = (test: Test): string => {
    const rec = (name: string, suite: Suite): string => {
      if (!suite?.suite) {
        return `${suite.file?.name + ':' ?? ''}${name}`
      } else {
        return rec(`${suite.name}.${name}`, suite.suite)
      }
    }

    if (test.suite) return rec(test.name, test.suite)
    else return test.name
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
        return '✔️'
      default:
        return ''
    }
  }

  const rec =
    (lines: string[][]) =>
    (task: Task): string[][] => {
      switch (task.type) {
        case 'suite': {
          return task.tasks.flatMap(rec(lines))
        }
        case 'test': {
          //nothing
          lines.push([
            buildFullName(task),
            stateToEmoji(task.result?.state),
            runModeToEmoji(task.mode),
            `${task.result?.duration?.toString() ?? '?'}ms`,
          ])
          return lines
        }
        default:
          throw new UnreachableCaseError(task)
      }
    }

  return rec([])(task)
}

export { buildRowFromFile }
export type { Table }
