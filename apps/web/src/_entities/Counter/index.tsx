import { ActionIcon, Flex } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { memo } from 'react';
import { cartApi } from 'features/resources/cart';
import { z } from 'zod';

type Props = {
  quantity: number
  available: number
  id: string
};

const schema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
});

type AddToCartParams = z.infer<typeof schema>;

const Counter = ({ quantity, available, id }: Props) => {
  const {
    isLoading,
    mutate: updateQuantity,
  } = cartApi.useUpdateQuantity<AddToCartParams>();

  return (
    <Flex gap={12} align="center">
      <ActionIcon
        size={24}
        variant="subtle"
        c="gray"
        aria-label="Settings"
        loading={isLoading}
        onClick={() => { updateQuantity({ productId: id, quantity: quantity - 1 }); }}
        disabled={quantity === 0}
      >
        <IconMinus stroke={1} />
      </ActionIcon>
      {quantity}
      <ActionIcon
        size={24}
        variant="subtle"
        c="gray"
        aria-label="Settings"
        loading={isLoading}
        onClick={() => { updateQuantity({ productId: id, quantity: quantity + 1 }); }}
        disabled={available === 0}
      >
        <IconPlus stroke={1} />
      </ActionIcon>
    </Flex>
  );
};

export const ProductCounter = memo(Counter);
