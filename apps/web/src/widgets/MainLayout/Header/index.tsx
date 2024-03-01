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
import { accountApi } from 'features/resources';
import classes from './index.module.css';
import { NavigationMenu } from './Navigation';
import { CartIcon } from './CartIcon';
import { AuthButton } from './AuthIcon';
import { CustomBurger } from './Burger';

const Component: FC = () => {
  const { data } = accountApi.useGet();
  return (
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
            {data && <CartIcon />}
            <AuthButton isLogin={!!data} />
          </Flex>
        </Flex>
        <Flex className={classes.mobile}>
          <CustomBurger isLogin={!!data} />
        </Flex>
      </Container>
    </LayoutHeader>
  );
};

export const Header = memo(Component);
