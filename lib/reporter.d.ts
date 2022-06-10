import type { Awaitable, File, Reporter } from 'vitest';
declare class GithubActionsReporter implements Reporter {
    private fileAppender;
    constructor();
    onFinished(files?: File[], errors?: unknown[]): Awaitable<void>;
}
export { GithubActionsReporter };
