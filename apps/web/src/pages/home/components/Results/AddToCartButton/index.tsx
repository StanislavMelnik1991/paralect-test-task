import { Button } from '@mantine/core';
import { type MouseEventHandler } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled: boolean
};

export const AddToCartButton = ({ onClick, disabled }: Props) => (
  <Button
    onClick={onClick}
    size="sm"
    color="blue"
    fullWidth
    disabled={disabled}
  >
    Add to Cart
  </Button>
);
