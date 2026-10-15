import type { FileData } from '@olegpolyakov/files-core';

export interface FilesApi {
    events: EventTarget;

    fetchFiles(): Promise<FileData[]>;
    fetchFile(id: string): Promise<FileData>;
    createFile(file: globalThis.File): Promise<FileData>;
    updateFile(id: string, data: Partial<FileData>): Promise<FileData>;
    deleteFile(id: string, options?: { deleteTasks: boolean }): Promise<void>;
}