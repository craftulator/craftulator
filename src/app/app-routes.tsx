import {Route, Routes} from 'react-router-dom';

import {RootLayout} from '@layouts/root';

import {HomePage} from '@pages';
import {EditorPage} from '@pages/editor';
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
          element={<EditorPage />}
          path='/editor'
        />
        <Route
          element={<NotFoundPage />}
          path='*'
        />
      </Route>
    </Routes>
  );
}
