import { Button } from '@mantine/core';
import { MouseEventHandler } from 'react';

type Props = {
  handleBue: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  amount: number
};

export const Summary = ({ amount, handleBue, isLoading }: Props) => (
  <Button fullWidth h="100%" onClick={handleBue} loading={isLoading}>
    $
    {amount}
  </Button>
);
