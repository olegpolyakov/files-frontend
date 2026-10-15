import type { ReactNode } from 'react';

import { AuthProvider } from '@olegpolyakov/frontend/features/auth';
import { ApiProvider } from '@olegpolyakov/frontend/services/api';

import { API_URL, AUTH_URL, WS_URL } from '@/env'; 

export default function FeaturesProvider({ children }: { children: ReactNode }) {
    return (
        <AuthProvider apiUrl={AUTH_URL}>
            <ApiProvider
                apiUrl={API_URL}
                wsUrl={WS_URL}
            >
                {children}
            </ApiProvider>
        </AuthProvider>
    );
}