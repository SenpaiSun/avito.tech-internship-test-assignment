import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer';
const { REACT_APP_API_TOKEN } = process.env

export const Layout = () => {
  const token = REACT_APP_API_TOKEN
  console.log(token)
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
