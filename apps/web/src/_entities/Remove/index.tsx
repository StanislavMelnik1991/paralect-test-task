import { Button } from '@mantine/core';
import { MouseEventHandler, memo } from 'react';
import { IconX } from '@tabler/icons-react';

type Props = {
  handleRemove: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
};

const CustomButton = ({ handleRemove, isLoading }: Props) => (
  <Button
    variant="subtle"
    c="gray"
    onClick={handleRemove}
    loading={isLoading}
    leftSection={<IconX />}
  >
    Remove
  </Button>
);

export const RemoveButton = memo(CustomButton);
