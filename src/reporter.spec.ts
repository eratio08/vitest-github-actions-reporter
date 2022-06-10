import { describe, expect, it } from 'vitest'
import { GithubActionsReporter } from './reporter'

describe('VitestGithubReporter', () => {
  it('should throw if GITHUB_STEP_SUMMARY env is not set', () => {
    //given
    //when
    //then
    expect(() => new GithubActionsReporter()).toThrowError()
  })
})
