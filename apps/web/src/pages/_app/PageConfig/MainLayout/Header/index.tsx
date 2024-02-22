import { memo, FC } from 'react';
import { AppShellHeader as LayoutHeader, Container } from '@mantine/core';

import { accountApi } from 'resources/account';

import { Link } from 'components';
import { RoutePath } from 'routes';

import { LogoImage } from 'public/images';

import UserMenu from './components/UserMenu';
import NavigationMenu from './components/Navigation';

import classes from './index.module.css';

const Header: FC = () => {
  const { data: account } = accountApi.useGet();

  return (
    <LayoutHeader>
      <Container
        className={classes.header}
        mih={72}
        px={32}
        py={0}
        display="flex"
        fluid
      >
        <Link type="router" href={RoutePath.Home}>
          <LogoImage />
        </Link>
        <NavigationMenu />
        {
          account
            ? <UserMenu />
            : <Link type="router" href={RoutePath.SignIn}>SignIn</Link>
        }
      </Container>
    </LayoutHeader>
  );
};

export default memo(Header);
