import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navigation, RouterSpinner } from 'src/core/components';
import { NAVIGATION_LINKS } from 'src/core/routing';
import './app.css';

const SignInPage = lazy(() => import('src/features/sign-in'));
const ListsPage = lazy(() => import('src/features/lists'));
const ItemsPage = lazy(() => import('src/features/items'));

export const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <div className="app-content">
          <Suspense fallback={<RouterSpinner />}>
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/lists" element={<ListsPage />} />
              <Route path="/lists/:id" element={<ItemsPage />} />
            </Routes>
          </Suspense>
        </div>
        <Navigation links={NAVIGATION_LINKS} />
      </BrowserRouter>
    </main>
  );
};
