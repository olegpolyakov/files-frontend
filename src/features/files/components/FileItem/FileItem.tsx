import { useState } from 'react';   

import { FileData } from '@olegpolyakov/files-core';
import { Flex, Item, Text } from '@olegpolyakov/ui';
import { formatFileSize } from '@olegpolyakov/files-core/utils';
import ConfirmButton from '@olegpolyakov/frontend/components/ConfirmButton';

import { getIcon } from '../../helpers';

export default function FileItem({
    file,
    onView,
    onDelete
}: {
    file: FileData;
    onView: (file: FileData) => void
    onDelete: (file: FileData) => void
}) {
    const [isDeleting, setDeleting] = useState(false);

    return (
        <Item
            start={getIcon(file)}
            content={
                <Flex column>
                    <Text
                        content={file.name}
                        ellipsis
                    />

                    <Text
                        content={formatFileSize(file.size)} 
                        size="s"
                        color="secondary"
                        ellipsis
                    />
                </Flex>
            }
            end={
                <ConfirmButton
                    icon="delete"
                    color="danger"
                    variant="tinted"
                    loading={isDeleting}
                    onConfirm={async () => {
                        setDeleting(true);
                        await onDelete(file);
                        setDeleting(false);
                    }}
                />
            }
            shape="rounded-m"
            variant="outlined-tinted"
            interactive
            onClick={() => onView(file)}
        />
    );
}