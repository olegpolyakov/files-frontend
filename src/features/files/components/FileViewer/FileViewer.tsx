import type { FileData } from '@olegpolyakov/files-core';

import ImageViewer from '../ImageViewer';
import PDFViewer from '../PDFViewer';

export default function FileViewer({ file }: { file: FileData }) {
    if (file.type.startsWith('image/')) return (
        <ImageViewer file={file} />
    );

    if (file.type === 'application/pdf') return (
        <PDFViewer file={file} />
    );

    return 'File type not supported';
}