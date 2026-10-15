import { useCallback, useState } from 'react';

import type { FileData } from '@olegpolyakov/files-core';
import { Button, Dialog, Grid, GridItem, Heading, Text } from '@olegpolyakov/ui';
import { formatFileSize } from '@olegpolyakov/files-core/utils';

import { FileItem, FileUpload, FileViewer } from '../../components';
import { getIcon } from '../../helpers';
import { useFilesContext } from '../../hooks';
import { FilesProvider } from '../../providers';

import styles from './Files.module.scss';

export default function Files() {
    return (
        <FilesProvider>
            <FilesView />
        </FilesProvider>
    );
}

export function FilesView() {
    const { files, createFile, deleteFile } = useFilesContext();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<FileData | null>(null);

    const handleUpload = useCallback(async (file: globalThis.File) => {
        await createFile(file);
        setIsDialogOpen(false);
    }, [createFile]);

    const handleDelete = useCallback(async (file: FileData) => {
        await deleteFile(file.id);
    }, [deleteFile]);

    return (
        <main className={styles.root}>
            <header className={styles.header}>
                <Heading
                    className={styles.heading}
                    content="Files"
                />
                
                <Button
                    content="Upload"
                    icon="upload"
                    color="brand"
                    variant="filled"
                    onClick={() => setIsDialogOpen(true)}
                />
            </header>
            
            <div className={styles.content}>
                <Grid>
                    {files.map(file => (
                        <GridItem
                            key={file.id}
                            desktop="3"
                        >
                            <FileItem
                                file={file}
                                onView={() => setCurrentFile(file)}
                                onDelete={() => handleDelete(file)}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </div>

            <Dialog
                title="Upload File"
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            >
                <FileUpload onUpload={handleUpload} />
            </Dialog>

            <Dialog
                title={currentFile ? {
                    start: getIcon(currentFile),
                    content: currentFile.name,
                    end: <Text
                        content={formatFileSize(currentFile.size)}
                        size="s"
                        color="secondary"
                    />
                } : undefined}
                closeButtonPosition="outside"
                open={currentFile !== null}
                onClose={() => setCurrentFile(null)}
            >
                {currentFile && (
                    <FileViewer file={currentFile} />
                )}
            </Dialog>
        </main>
    );
}