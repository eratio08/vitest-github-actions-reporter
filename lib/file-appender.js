"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFileAppender = void 0;
const fs_1 = require("fs");
const buildFileAppender = (summaryFilePath) => {
    const appendLine = (line) => (0, fs_1.appendFileSync)(summaryFilePath, `${line}\n`);
    const appendTable = (table) => {
        const buildTableLine = (columns) => columns.reduce((acc, col) => `${acc}${col}|`, '|');
        const headline = buildTableLine(table.headers);
        const headlineSeparator = buildTableLine(table.headers.map((col) => '-'.repeat(col.length)));
        appendLine(headline);
        appendLine(headlineSeparator);
        table.rows.map(buildTableLine).forEach(appendLine);
    };
    return {
        appendLine,
        appendTable,
    };
};
exports.buildFileAppender = buildFileAppender;
