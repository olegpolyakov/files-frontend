import { Route, Routes } from 'react-router-dom';

import { AppContent, AppDrawer, AppShell } from '@olegpolyakov/frontend/app';
import { createStore, StoreContext } from '@olegpolyakov/frontend/store';

import { FeaturesProvider } from '@/features';
import { Files, setupFilesState } from '@/features/files';

import styles from './App.module.scss';

const store = createStore();

store.setup(setupFilesState);

export default function App() {
    return (
        <StoreContext value={store}>
            <FeaturesProvider>
                <AppShell name="Files">
                    <AppDrawer />

                    <AppContent>
                        <Routes>
                            <Route
                                index
                                element={<Files />}
                            />
                        </Routes>
                    </AppContent>
                </AppShell>
            </FeaturesProvider>
        </StoreContext>
    );
}