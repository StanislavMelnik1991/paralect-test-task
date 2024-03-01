import { memo, FC } from 'react';
import {
  AppShellHeader as LayoutHeader,
  Container,
  Flex,
  Center,
} from '@mantine/core';
import { RoutePath } from '_app/routes';
import { LogoImage } from 'public/images';
import { Link } from '_entities';
import classes from './index.module.css';
import { NavigationMenu } from './Navigation';
import { CartIcon } from './CartIcon';
import { LogoutIcon } from './LogoutIcon';
import { CustomBurger } from './Burger';

const Component: FC = () => (
  <LayoutHeader>
    <Container
      className={classes.wrapper}
      mih={72}
      display="flex"
      pos="relative"
      fluid
    >
      <Link type="router" href={RoutePath.Home}>
        <LogoImage />
      </Link>

      <Flex
        className={classes.desktop}
        w="100%"
        justify="space-between"
      >
        <Center mx="auto">
          <NavigationMenu />
        </Center>
        <Flex className={classes.userMenu}>
          <CartIcon />
          <LogoutIcon />
        </Flex>
      </Flex>
      <Flex className={classes.mobile}>
        <CustomBurger />
      </Flex>
    </Container>
  </LayoutHeader>
);

export const Header = memo(Component);
