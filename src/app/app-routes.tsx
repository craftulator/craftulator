import {Route, Routes} from 'react-router-dom';

import {RootLayout} from '@layouts/root';

import {HomePage} from '@pages';
import {AboutPage} from '@pages/about';
import {NotFoundPage} from '@pages/not-found';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          element={<HomePage />}
          path='/'
        />
        <Route
          element={<AboutPage />}
          path='/about'
        />
        <Route
          element={<NotFoundPage />}
          path='*'
        />
      </Route>
    </Routes>
  );
}
