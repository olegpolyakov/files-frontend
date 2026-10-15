import { useContext } from 'react';

import { FilesContext } from '../contexts';

export default function useFilesContext() {
    const context = useContext(FilesContext);
    
    if (!context) {
        throw new Error('useProjectsContext must be used within a ProjectsProvider');
    }
    
    return context;
}