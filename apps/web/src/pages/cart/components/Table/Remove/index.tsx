import { Button } from '@mantine/core';
import { memo } from 'react';
import { IconX } from '@tabler/icons-react';

type Props = {
  changeQuantity: (val: number) => void
  loading: boolean
};

const Remove = ({ changeQuantity, loading }: Props) => (
  <Button
    variant="subtle"
    c="gray"
    onClick={() => { changeQuantity(0); }}
    loading={loading}
    leftSection={<IconX />}
  >
    Remove
  </Button>
);

export default memo(Remove);
