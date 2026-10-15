import { useCallback } from 'react';

import type { File } from '@olegpolyakov/files-core';

import useFilesApi from './useFilesApi';
import useFilesState from './useFilesState';

export default function useFiles() {
    const api = useFilesApi();
    const files = useFilesState(api);

    const createFile = useCallback(async (file: globalThis.File) => {
        return api.createFile(file);
    }, [api]);

    const updateFile = useCallback(async (id: string, data: Partial<File>) => {
        return api.updateFile(id, data);
    }, [api]);

    const deleteFile = useCallback(async (id: string) => {
        return api.deleteFile(id);
    }, [api]);

    return {
        files,
        createFile,
        updateFile,
        deleteFile
    };
}