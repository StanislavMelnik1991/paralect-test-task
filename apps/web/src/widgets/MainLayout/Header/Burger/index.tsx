import { Menu, Burger } from '@mantine/core';
import { RoutePath } from '_app/routes';
import { accountApi } from 'features/resources';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';

export const CustomBurger = () => {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();
  const { useGet, useSignOut } = accountApi;
  const { data } = useGet();
  const { mutate: signOut } = useSignOut();
  return (
    <Menu shadow="md" width={200} withinPortal={false}>
      <Menu.Target>
        <Burger opened={opened} onClick={toggle} />
      </Menu.Target>

      <Menu.Dropdown onClick={toggle}>
        <Menu.Label>Shopy</Menu.Label>
        <Menu.Item
          color={router.route === RoutePath.Home ? 'gray' : 'dark'}
          onClick={() => router.push(RoutePath.Home)}
          disabled={router.route === RoutePath.Home}
        >
          Marketplace
        </Menu.Item>
        <Menu.Item
          color={router.route.startsWith(RoutePath.Products) ? 'gray' : 'dark'}
          onClick={() => router.push(RoutePath.Products)}
          disabled={router.route.startsWith(RoutePath.Products)}
        >
          Your Products
        </Menu.Item>
        <Menu.Item
          color={router.route.startsWith(RoutePath.Cart) ? 'gray' : 'dark'}
          onClick={() => router.push(RoutePath.Cart)}
          disabled={router.route.startsWith(RoutePath.Cart)}
        >
          Cart
        </Menu.Item>

        <Menu.Divider />

        {!data && (
          <Menu.Item onClick={() => router.push(RoutePath.SignIn)}>
            SignIn
          </Menu.Item>
        )}

        {data && (
          <Menu.Item onClick={() => signOut()}>
            Logout
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
