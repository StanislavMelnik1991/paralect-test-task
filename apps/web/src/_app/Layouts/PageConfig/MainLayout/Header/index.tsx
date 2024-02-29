import { memo, FC } from 'react';
import {
  AppShellHeader as LayoutHeader,
  Container,
  Box,
} from '@mantine/core';
import { RoutePath } from '_app/routes';

import { LogoImage } from 'public/images';

import Link from 'next/link';
import {
  NavigationMenu,
  LogoutIcon,
  CartIcon,
} from 'widgets/Header';
import classes from './index.module.css';

const Header: FC = () => (
  <LayoutHeader>
    <Container
      className={classes.wrapper}
      mih={72}
      display="flex"
      fluid
    >
      <Link className={classes.link} href={RoutePath.Home}>
        <LogoImage />
      </Link>
      <NavigationMenu />
      <Box display="flex" className={classes.userMenu}>
        <CartIcon />
        <LogoutIcon />
      </Box>
    </Container>
  </LayoutHeader>
);

export default memo(Header);
