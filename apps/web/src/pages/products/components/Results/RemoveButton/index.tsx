import { Button } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { type MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
};

export const RemoveButton = ({ onClick }: Props) => (
  <Button
    size="sm"
    variant="white"
    p={4}
    color="gray"
    onClick={onClick}
  >
    <IconTrash size={24} />
  </Button>
);
