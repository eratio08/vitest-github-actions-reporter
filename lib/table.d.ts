import type { File } from 'vitest';
declare type Table = {
    headers: string[];
    rows: string[][];
};
declare const buildRowFromFile: (task: File) => string[][];
export { buildRowFromFile };
export type { Table };
