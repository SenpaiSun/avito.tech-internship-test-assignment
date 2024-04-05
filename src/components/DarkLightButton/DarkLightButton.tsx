import React from 'react';
import { Button } from '@mantine/core';
import {
  useMantineColorScheme
} from '@mantine/core';

export const DarkLightButton = () => {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      style={{ backgroundColor: colorScheme === 'dark' ? 'blue' : 'teal' }}
      onClick={toggleColorScheme}
    >
      {colorScheme === 'dark' ? 'Dark Button' : 'Light Button'}
    </Button>
  );
}