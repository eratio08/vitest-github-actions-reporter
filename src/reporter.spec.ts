import { describe, expect, it, vi } from 'vitest'
import { GithubActionsReporter } from './reporter'

describe('VitestGithubReporter', () => {
  const actualProcess = process

  it('should throw if GITHUB_STEP_SUMMARY env is not set', () => {
    //given
    vi.stubGlobal('process', { env: undefined })

    //when
    //then
    expect(() => new GithubActionsReporter()).toThrow()

    // workaround the stubbing issue with process
    vi.stubGlobal('process', actualProcess)
  })
})
