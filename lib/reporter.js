"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubActionsReporter = void 0;
const file_appender_1 = require("./file-appender");
const table_1 = require("./table");
class GithubActionsReporter {
    constructor() {
        const stepSummaryFile = process.env.GITHUB_STEP_SUMMARY;
        if (!stepSummaryFile)
            throw Error('GITHUB_STEP_SUMMARY needs to be set');
        this.fileAppender = (0, file_appender_1.buildFileAppender)(stepSummaryFile);
    }
    onFinished(files, errors) {
        var _a;
        this.fileAppender.appendLine('# Test Results');
        const table = {
            headers: ['File', 'Result', 'Skipped', 'Duration'],
            rows: (_a = files === null || files === void 0 ? void 0 : files.flatMap(table_1.buildRowFromFile)) !== null && _a !== void 0 ? _a : [],
        };
        console.log(table);
        this.fileAppender.appendTable(table);
        return Promise.resolve();
    }
}
exports.GithubActionsReporter = GithubActionsReporter;
