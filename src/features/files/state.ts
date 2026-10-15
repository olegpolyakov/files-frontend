import { atom } from 'jotai';

import type { FileData } from '@olegpolyakov/files-core';
import { listReducer, singleReducer, type Store } from '@olegpolyakov/frontend/store';

export const filesAtom = atom<FileData[]>([]);
export const filesReducer = listReducer<FileData>('file');

export const fileAtom = atom<FileData | null>(null);
export const fileReducer = singleReducer<FileData>('file');

export function setupFilesState(store: Store) {
    store.set('files', filesAtom);
    store.set('file', fileAtom);
}