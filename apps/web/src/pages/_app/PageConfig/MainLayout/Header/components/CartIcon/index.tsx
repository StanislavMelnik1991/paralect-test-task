import { Badge, ActionIcon } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { cartApi } from 'resources/cart';
import { RoutePath } from 'routes';

export const CartIcon = () => {
  const { data, isLoading } = cartApi.useMyCart();
  const router = useRouter();
  return (
    <ActionIcon
      color={router.route === RoutePath.Cart ? 'blue' : 'gray'}
      variant="subtle"
      pos="relative"
      size={40}
      onClick={() => router.push(RoutePath.Cart)}
      disabled={!data}
      loading={isLoading}
    >
      {data && (
        <Badge
          right={0}
          top={2}
          pos="absolute"
          p={0}
          w={20}
          h={20}
        >
          {data.count}
        </Badge>
      )}
      <IconShoppingCart size={40} strokeWidth={1} />
    </ActionIcon>
  );
};
