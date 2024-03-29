import { afterAll, describe, expect, File, it, Suite, Test, vi } from 'vitest'
import { GithubActionsReporter } from './reporter'
import { summary } from '@actions/core'

vi.mock('@actions/core', () => {
  return {
    summary: { addTable: vi.fn(), addHeading: vi.fn(), write: vi.fn() },
    notice: vi.fn(),
  }
})

describe('VitestGithubReporter', () => {
  it('should add file to the summary on finish', () => {
    //given
    const reporter = new GithubActionsReporter()

    const file: File = {
      id: 'file-id',
      name: '/path',
      filepath: '/path',
      mode: 'run',
      tasks: [],
      type: 'suite',
    }
    file.file = file
    const suite: Suite = {
      id: 'suite-id',
      name: 'suite-name',
      mode: 'run',
      tasks: [],
      type: 'suite',
      suite: file,
    }
    file.tasks.push(suite)
    const passedTest: Test = {
      id: 'passed-test-id',
      name: 'passed-test-name',
      mode: 'run',
      context: new (vi.fn())(),
      suite: suite,
      type: 'test',
      result: { state: 'pass', duration: 10 },
      file,
    }
    suite.tasks.push(passedTest)
    const skippedTest: Test = {
      id: 'skipped-test-id',
      name: 'skipped-test-name',
      mode: 'skip',
      context: new (vi.fn())(),
      suite: suite,
      type: 'test',
      result: { state: 'skip', duration: 0 },
      file,
    }
    suite.tasks.push(skippedTest)
    const failedTest: Test = {
      id: 'failed-test-id',
      name: 'failed-test-name',
      mode: 'run',
      context: new (vi.fn())(),
      suite: suite,
      type: 'test',
      result: { state: 'fail', duration: 20 },
      file,
    }
    suite.tasks.push(failedTest)

    //when
    reporter.onFinished([file])

    //then
    expect(summary.addHeading).toBeCalledWith('Test Results', 1)
    expect(summary.addTable).toBeCalledWith([
      [
        { data: 'File', header: true },
        { data: 'Test', header: true },
        { data: 'Result', header: true },
        { data: 'Skipped', header: true },
        { data: 'Duration', header: true },
      ],
      [
        { data: '<code>/path</code>' },
        { data: '<code>suite-name.passed-test-name</code>' },
        { data: '✅' },
        { data: '' },
        { data: '10ms' },
      ],
      [
        { data: '<code>/path</code>' },
        { data: '<code>suite-name.skipped-test-name</code>' },
        { data: '❔' },
        { data: '❗' },
        { data: '0ms' },
      ],
      [
        { data: '<code>/path</code>' },
        { data: '<code>suite-name.failed-test-name</code>' },
        { data: '❌' },
        { data: '' },
        { data: '20ms' },
      ],
    ])
    expect(summary.write).toBeCalled()
    expect(summary.addTable).toBeCalledTimes(1)
  })

  it.skip('example skipped test', () => {
    expect(true).toBe(false)
  })
})

afterAll(() => {
  vi.resetModules()
})
