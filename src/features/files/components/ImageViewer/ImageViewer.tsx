import type { FileData } from '@olegpolyakov/files-core';
import { Image } from '@olegpolyakov/ui';

import { STORAGE_URL } from '@/env';

import styles from './ImageViewer.module.scss';

export default function ImageViewer({ file }: { file: FileData }) {
    return (
        <div className={styles.root}>
            <Image
                className={styles.image}
                src={`${STORAGE_URL}/${file.path}`}
                alt={file.name}
            />
        </div>
    );
}