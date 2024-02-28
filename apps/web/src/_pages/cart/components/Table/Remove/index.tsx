import { Button } from '@mantine/core';
import { memo } from 'react';
import { IconX } from '@tabler/icons-react';
import { z } from 'zod';
import { cartApi } from 'services/resources/cart';

type Props = {
  id: string
};

const schema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
});

type AddToCartParams = z.infer<typeof schema>;

const Remove = ({ id }: Props) => {
  const {
    isLoading,
    mutate: updateQuantity,
  } = cartApi.useUpdateQuantity<AddToCartParams>();
  return (
    <Button
      variant="subtle"
      c="gray"
      onClick={() => { updateQuantity({ productId: id, quantity: 0 }); }}
      loading={isLoading}
      leftSection={<IconX />}
    >
      Remove
    </Button>
  );
};

export default memo(Remove);
