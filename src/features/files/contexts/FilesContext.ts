import { createContext } from 'react';

import type { File, FileData } from '@olegpolyakov/files-core';

export type FilesContextValue = {
    files: File[];
    createFile: (file: globalThis.File) => Promise<FileData>;
    updateFile: (id: string, data: Partial<FileData>) => Promise<FileData>;
    deleteFile: (id: string) => Promise<void>;
};

export default createContext<FilesContextValue>(null! as FilesContextValue);