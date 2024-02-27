import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { type MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
};

export const RemoveButton = ({ onClick, disabled }: Props) => (
  <Button
    size="sm"
    variant="white"
    p={4}
    color="gray"
    onClick={onClick}
    disabled={disabled}
  >
    <IconTrash size={24} />
  </Button>
);
