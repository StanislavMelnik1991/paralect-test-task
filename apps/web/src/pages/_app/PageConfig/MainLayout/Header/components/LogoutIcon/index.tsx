import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { Link } from 'components';
import { accountApi } from 'resources/account';
import { RoutePath } from 'routes';

export const LogoutIcon = () => {
  const { mutate: signOut } = accountApi.useSignOut();
  const { data } = accountApi.useGet();

  return data ? (
    <ActionIcon
      color="gray"
      variant="subtle"
      size={40}
      onClick={() => signOut()}
    >
      <IconLogout size={40} strokeWidth={1} />
    </ActionIcon>
  ) : (
    <Link
      type="router"
      href={RoutePath.SignIn}
    >
      SignIn
    </Link>
  );
};
