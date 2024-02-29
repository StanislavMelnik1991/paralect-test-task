import { ActionIcon, Flex } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { memo } from 'react';

type Props = {
  quantity: number
  available: number
  handleChange: (val: number) => void
  isLoading: boolean
};

const Counter = ({ quantity, available, handleChange, isLoading }: Props) => (
  <Flex gap={12} align="center">
    <ActionIcon
      size={24}
      variant="subtle"
      c="gray"
      aria-label="Settings"
      loading={isLoading}
      onClick={() => { handleChange(quantity - 1); }}
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
      onClick={() => { handleChange(quantity + 1); }}
      disabled={available === 0}
    >
      <IconPlus stroke={1} />
    </ActionIcon>
  </Flex>
);

export const ProductCounter = memo(Counter);
