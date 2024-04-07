import { useMantineColorScheme } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer';

export const Layout = () => {
  const { colorScheme } = useMantineColorScheme();
  console.log(colorScheme);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
