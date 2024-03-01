import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import { Header } from 'widgets/MainLayout';

import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    header={{ height: 72 }}
    padding={{
      base: 4,
      xs: 4,
      sm: 4,
      md: 8,
      lg: 16,
      xl: 32,
    }}
    classNames={{
      root: classes.root,
      main: classes.main,
    }}
  >
    <Header />

    <AppShell.Main>
      {children}
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
