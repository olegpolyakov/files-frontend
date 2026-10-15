import { useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';

import { File, type FileData } from '@olegpolyakov/files-core';
import { useStateEvents } from '@olegpolyakov/frontend/store';

import type { FilesApi } from '../api';
import { filesAtom, filesReducer } from '../state';

export default function useFilesState(api: FilesApi) {
    const [state, setState] = useAtom(filesAtom);

    useEffect(() => {
        api.fetchFiles().then(setState);
    }, [api, setState]);

    useStateEvents<FileData>(
        api.events,
        action => setState(state => filesReducer(state, action))
    );

    const files = useMemo(() => state.map(s => new File(s)), [state]);

    return files;
}