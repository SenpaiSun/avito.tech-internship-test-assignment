import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
// import * as page from '../pages';
import { Layout } from '../components/Layout';
import { Movies } from '../pages';

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
      ></Route>
    </Route>
  ),
  {
    basename: '/'
  }
);

export default router;
