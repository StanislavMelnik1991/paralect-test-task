import { ActionIcon } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { accountApi } from 'services/resources/account';
import { RoutePath } from '_app/routes';
import Link from 'next/link';

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
