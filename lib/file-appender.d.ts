import type { Table } from './table';
declare const buildFileAppender: (summaryFilePath: string) => {
    appendLine: (line: string) => void;
    appendTable: (table: Table) => void;
};
declare type FileAppender = ReturnType<typeof buildFileAppender>;
export { buildFileAppender };
export type { FileAppender, Table };
