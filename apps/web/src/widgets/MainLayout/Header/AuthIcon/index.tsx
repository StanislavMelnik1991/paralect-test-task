import { ActionIcon } from '@mantine/core';
import { IconLogout, IconLogin } from '@tabler/icons-react';
import { RoutePath } from '_app/routes';
import { accountApi } from 'features/resources/account';
import { useRouter } from 'next/router';

type Props = {
  isLogin?: boolean
};

export const AuthButton = ({ isLogin }: Props) => {
  const { mutate: signOut } = accountApi.useSignOut();
  const router = useRouter();

  return (
    <ActionIcon
      color="gray"
      variant="subtle"
      size={40}
      onClick={() => {
        if (isLogin) {
          signOut();
        } else {
          router.push(RoutePath.SignIn);
        }
      }}
    >
      {isLogin ? (
        <IconLogout size={40} strokeWidth={1} />
      ) : (
        <IconLogin size={40} strokeWidth={1} />
      )}
    </ActionIcon>
  );
};
