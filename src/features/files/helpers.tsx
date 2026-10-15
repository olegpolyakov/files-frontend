import { FileData } from '@olegpolyakov/files-core';

import DocxIcon from '@/features/files/images/docx.svg';
import FileIcon from '@/features/files/images/file.svg';
import JpegIcon from '@/features/files/images/jpeg.svg';
import PdfIcon from '@/features/files/images/pdf.svg';
import TxtIcon from '@/features/files/images/txt.svg';
import VideoIcon from '@/features/files/images/video.svg';

export function getIcon(file: FileData | File) {
    switch (file.type) {
        case 'text/plain':
            return <TxtIcon />;
        case 'image/jpeg':
        case 'image/jpg':
            return <JpegIcon />;
        case 'video/quicktime':
        case 'video/webm':
            return <VideoIcon />;
        case 'application/pdf':
            return <PdfIcon />;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return <DocxIcon />;
        default:
            return <FileIcon />;
    }
}