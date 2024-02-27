import { ActionIcon, Flex } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { memo } from 'react';

type Props = {
  quantity: number
  changeQuantity: (val: number) => void
  loading: boolean
};

const Counter = ({ quantity, changeQuantity, loading }: Props) => (
  <Flex gap={12} align="center">
    <ActionIcon
      size={24}
      variant="subtle"
      c="gray"
      aria-label="Settings"
      loading={loading}
      onClick={() => { changeQuantity(quantity - 1); }}
    >
      <IconMinus stroke={1} />
    </ActionIcon>
    {quantity}
    <ActionIcon
      size={24}
      variant="subtle"
      c="gray"
      aria-label="Settings"
      loading={loading}
      onClick={() => { changeQuantity(quantity + 1); }}
    >
      <IconPlus stroke={1} />
    </ActionIcon>
  </Flex>
);

export default memo(Counter);
