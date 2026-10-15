import { ReactNode, useMemo } from 'react';

import { FilesContext, FilesContextValue } from '../contexts';
import { useFiles } from '../hooks';

export default function FilesProvider({ children }: { children: ReactNode }) {
    const {
        files,
        createFile,
        updateFile,
        deleteFile
    } = useFiles();

    const value = useMemo<FilesContextValue>(() => ({
        files,
        createFile,
        updateFile,
        deleteFile
    }), [
        files,
        createFile,
        updateFile,
        deleteFile
    ]);

    return (
        <FilesContext.Provider value={value}>
            {children}
        </FilesContext.Provider>
    );
}