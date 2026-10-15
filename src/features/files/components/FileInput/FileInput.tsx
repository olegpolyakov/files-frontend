import { type ChangeEventHandler, Ref, useCallback } from 'react';

import './FileInput.scss';

export type FileInputProps = {
    accept?: string;
    onChange: (files: FileList | null) => void;
};

export default function FileInput({
    ref,
    accept,
    onChange,
    ...props
}: FileInputProps & { ref?: Ref<HTMLInputElement> }) {
    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(event => {
        onChange(event.target.files);
    }, [onChange]);

    return (
        <input
            ref={ref}
            className="FileInput"
            type="file"
            accept={accept}
            onChange={handleChange}
            {...props}
        />
    );
}