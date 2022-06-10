"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRowFromFile = void 0;
const ts_essentials_1 = require("ts-essentials");
const buildRowFromFile = (task) => {
    const buildFullName = (test) => {
        const rec = (name, suite) => {
            var _a, _b;
            if (!(suite === null || suite === void 0 ? void 0 : suite.suite)) {
                return `${(_b = ((_a = suite.file) === null || _a === void 0 ? void 0 : _a.name) + ':') !== null && _b !== void 0 ? _b : ''}${name}`;
            }
            else {
                return rec(`${suite.name}.${name}`, suite.suite);
            }
        };
        if (test.suite)
            return rec(test.name, test.suite);
        else
            return test.name;
    };
    const stateToEmoji = (state) => {
        switch (state) {
            case 'fail':
                return '❌';
            case 'pass':
                return '✅';
            default:
                return '❔';
        }
    };
    const runModeToEmoji = (runMode) => {
        switch (runMode) {
            case 'skip':
                return '✔️';
            default:
                return '';
        }
    };
    const rec = (lines) => (task) => {
        var _a, _b, _c, _d;
        switch (task.type) {
            case 'suite': {
                return task.tasks.flatMap(rec(lines));
            }
            case 'test': {
                //nothing
                lines.push([
                    buildFullName(task),
                    stateToEmoji((_a = task.result) === null || _a === void 0 ? void 0 : _a.state),
                    runModeToEmoji(task.mode),
                    `${(_d = (_c = (_b = task.result) === null || _b === void 0 ? void 0 : _b.duration) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '?'}ms`,
                ]);
                return lines;
            }
            default:
                throw new ts_essentials_1.UnreachableCaseError(task);
        }
    };
    return rec([])(task);
};
exports.buildRowFromFile = buildRowFromFile;
