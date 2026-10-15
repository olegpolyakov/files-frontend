import type { FileData } from '@olegpolyakov/files-core';
import type { HttpClient } from '@olegpolyakov/frontend/clients/http';
import type { WsClient } from '@olegpolyakov/frontend/clients/ws';

import type { FilesApi } from './interface';

export default (http: HttpClient, ws: WsClient): FilesApi => ({
    events: ws,

    async fetchFiles(): Promise<FileData[]> {
        return http.get<FileData[]>('/files');
    },

    async fetchFile(id: string): Promise<FileData> {
        return http.get<FileData>(`/files/${id}`);
    },

    async createFile(file: globalThis.File) {
        const data = new FormData();
        data.append('file', file);
        return http.post<FileData>('/files', data);
    },

    async updateFile(id: string, data: Partial<FileData>) {
        return http.put<FileData>(`/files/${id}`, data);
    },

    async deleteFile(id: string) {
        await http.delete(`/files/${id}`);
    }
});