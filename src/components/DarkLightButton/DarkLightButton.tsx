import React from 'react';
import { ActionIcon, DEFAULT_THEME, Image  } from '@mantine/core';
import {
  useMantineColorScheme
} from '@mantine/core';
import darkIcon from '../../assets/icons/dark-icon.svg';
import lightIcon from '../../assets/icons/light-icon.svg';

export const DarkLightButton = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      variant="default"
      size="lg"
      radius="lg"
      aria-label={colorScheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleColorScheme}
      color = {colorScheme ==='dark' ? DEFAULT_THEME.colors.dark[6] : 'black'}
      children = {colorScheme ==='dark' ? <Image  src={lightIcon} alt="Light Mode" style={{ width: '70%', height: '70%' }} /> : <Image  src={darkIcon} alt="Dark Mode" style={{ width: '70%', height: '70%' }} />}
    />
  );
}