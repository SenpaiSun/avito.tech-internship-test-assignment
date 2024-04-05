import { useMantineColorScheme } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  const { colorScheme } = useMantineColorScheme();
  console.log(colorScheme);
  return (
    <>
      <header>
      </header>
      <Outlet />
    </>
  );
};
