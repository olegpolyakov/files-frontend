import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import type { FileData } from '@olegpolyakov/files-core';
import { Button, Spinner } from '@olegpolyakov/ui';

import { STORAGE_URL } from '@/env';

import styles from './PDFViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ file: data }: { file: FileData }) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        fetch(`${STORAGE_URL}/${data.path}`)
            .then(response => response.blob())
            .then(blob => setFile(new File([blob], data.name, { type: blob.type })))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [data]);

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!file) return null;

    return (
        <article className={styles.root}>
            <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
                <Page
                    pageNumber={pageNumber}
                    width={640}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>

            <footer className={styles.root__footer}>
                <Button
                    icon="chevron_left"
                    disabled={pageNumber === 1}
                    onClick={() => setPageNumber(n => n - 1)}
                />

                <span className={styles.root__pages_label}>
                    <input value={pageNumber} /> из {numPages}
                </span>

                <Button
                    icon="chevron_right"
                    disabled={pageNumber === numPages}
                    onClick={() => setPageNumber(n => n + 1)}
                />
            </footer>
        </article>
    );
}