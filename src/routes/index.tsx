import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
// import * as page from '../pages';
import { Layout } from '../components/Layout';
import { Movies } from '../pages';
import { CurrentFilm } from '../pages/CurrentFilm/CurrentFilm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={() => {
        return null;
      }}
      errorElement={<></>}
    >
      <Route
        path="/movies"
        element={<Movies />}
        loader={() => {
          return null;
        }}
        errorElement={<></>}
      />
      <Route
        path="/movie/:id"
        element={<CurrentFilm />}
        loader={() => {
          return null;
        }}
        errorElement={<></>}
      />
    </Route>
  ),
  {
    basename: '/'
  }
);

export default router;
