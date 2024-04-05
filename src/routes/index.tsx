import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import * as page from '../pages';
import { Layout } from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={() => {
        return null;}}
      errorElement={<></>}
    >
    </Route>
  ),
  {
    basename: '/',
  }
);

export default router;