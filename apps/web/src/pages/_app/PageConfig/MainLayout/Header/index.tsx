import { memo, FC } from 'react';
import {
  AppShellHeader as LayoutHeader,
  Container,
  Box,
} from '@mantine/core';
import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import classes from './index.module.css';
import {
  NavigationMenu,
  LogoutIcon,
  CartIcon,
} from './components';

const Header: FC = () => (
  <LayoutHeader>
    <Container
      className={classes.wrapper}
      mih={72}
      display="flex"
      fluid
    >
      <Link type="router" href={RoutePath.Home}>
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
