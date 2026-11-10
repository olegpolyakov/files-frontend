import { DragEvent, useCallback, useRef, useState } from 'react';

import { Box, Flex, Icon, Item, Spinner, State, Text } from '@olegpolyakov/ui';
import { formatFileSize } from '@olegpolyakov/files-core/utils';

import { getIcon } from '../../helpers';
import FileInput from '../FileInput';

import styles from './FileUpload.module.scss';

export default function FileUpload({
    accept = '*',
    onUpload,
    onUploaded
}: {
    accept?: string;
    onUpload: (file: File) => Promise<void>;
    onUploaded?: () => void;
}) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [uploadingFile, setUploadingFile] = useState<File | null>();
    const [isActive, setActive] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleChange = useCallback((files: FileList | null) => {
        const file = files?.item(0);

        if (!file) return;

        setUploadingFile(file);

        onUpload(file)
            .then(() => {
                onUploaded?.();
            })
            .finally(() => {
                setUploadingFile(null);
            });
    }, [onUpload, onUploaded]);

    const handleDrop = useCallback((event: DragEvent) => {
        event.preventDefault();

        setError(undefined);

        const acceptableTypes = accept.split(',').map(type => type.includes('/*')
            ? type.replace('*', '')
            : type);
        const files = event.dataTransfer.files;

        let acceptFile = false;

        for (const file of files) {
            for (const type of acceptableTypes) {
                if (type === '*' || file.type.startsWith(type)) {
                    acceptFile = true;
                    break;
                }
            }
        }

        if (!acceptFile) {
            setError('Неподдерживаемый формат файла');
            setActive(false);

            return;
        }

        // const files = event.dataTransfer.items ?
        //     [...event.dataTransfer.items].filter(item => item.kind === 'file').map(item => item.getAsFile()) :
        //     event.dataTransfer.files;

        setActive(false);
        handleChange(event.dataTransfer.files);
    }, [accept, handleChange]);

    const handleDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        setActive(true);
    }, []);

    const handleDragLeave = useCallback((event: DragEvent) => {
        event.preventDefault();
        setActive(false);
    }, []);

    return (
        <Box
            ref={rootRef}
            className={styles.root}
        >
            {uploadingFile ?
                <Item
                    start={getIcon(uploadingFile)}
                    content={
                        <Flex column>
                            <Text
                                content={uploadingFile?.name}
                                size="m"
                                weight="bold"
                            />

                            <Text
                                content={formatFileSize(uploadingFile?.size ?? 0)}
                                size="s"
                                color="secondary"
                            />
                        </Flex>
                    }
                    end={<Spinner size="s" />}
                />
                :
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    <FileInput
                        ref={fileInputRef}
                        accept={accept}
                        onChange={handleChange}
                    />

                    <Box
                        className={styles.dropZone}
                        padding="m"
                        variant="outlined"
                        shape="rounded-m"
                        interactive
                        onClick={handleButtonClick}
                    >
                        <State
                            image={
                                <Icon
                                    name={error ? 'error' : 'upload'}
                                    size="l"
                                />
                            }
                            title={{
                                content: error || 'Drag and drop a file here',
                                size: 'xs'
                            }}
                            subtitle={{
                                content: !error ? 'or click to browse' : undefined,
                                size: 'xxs'
                            }}
                            description={{
                                content: !error ? `Supported file types: ${accept}` : undefined,
                                color: 'secondary',
                                size: 'xs'
                            }}
                        /> 
                    </Box>
                </div>
            }
        </Box>
    );
}