import { v4 as uuid } from 'uuid';

import { File, FileData } from '@olegpolyakov/files-core';

import type { FilesApi } from './interface';

const files = new Map<string, FileData>();
const events = new EventTarget();

export default (): FilesApi => ({
    events,

    async fetchFiles(): Promise<FileData[]> {
        return Array.from(files.values());
    },

    async fetchFile(id: string): Promise<FileData> {
        const file = files.get(id);

        if (!file) throw new Error('File not found');

        return file;
    },

    async createFile(file: globalThis.File) {
        const id = uuid();
        const fileData = new File({
            id,
            name: file.name,
            path: file.name,
            size: file.size,
            type: file.type
        }).toData();

        files.set(id, fileData);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'file',
                action: 'create',
                documentId: id,
                data: fileData
            })
        }));

        return fileData;
    },

    async updateFile(id: string, data: Partial<FileData>) {
        const file = files.get(id);

        if (!file) throw new Error('File not found');

        const updatedFile = { ...file, ...data } as FileData;
        files.set(id, updatedFile);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'file',
                action: 'update',
                documentId: id,
                data: updatedFile
            })
        }));

        return updatedFile;
    },

    async deleteFile(id: string) {
        files.delete(id);

        this.events.dispatchEvent(new MessageEvent('message', {
            data: JSON.stringify({
                model: 'file',
                action: 'delete',
                documentId: id,
                data: null
            })
        }));
        
        return;
    }
});