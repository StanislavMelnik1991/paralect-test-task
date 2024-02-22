import { Button, Card, Group, Text } from '@mantine/core';
import Image from 'next/image';
import { type MouseEventHandler } from 'react';
import { Product } from 'types';

import classes from './index.module.css';

type Props = {
  product: Product
  handleAddToCart: (data: { id: string, name: string }) => MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
};

export const ProductCard = ({
  handleAddToCart,
  product: {
    _id: id,
    image,
    name,
    price,
  },
  disabled,
}: Props) => (
  <Card shadow="sm" padding="lg" radius="xl" withBorder>
    <Card.Section>
      <Image
        className={classes.image}
        src={image || ''}
        alt={name}
        width={0}
        height={0}
        sizes="100%"
      />
    </Card.Section>

    <Text truncate="end" mt={16} size="md" fw="bold">{name}</Text>

    <Group justify="space-between" mt={13} mb={22}>
      <Text c="A3A3A3" size="xs" fw="bold">Price: </Text>
      <Text fw="bold">{`$${price}`}</Text>
    </Group>

    <Button onClick={handleAddToCart({ id, name })} size="sm" color="blue" fullWidth disabled={disabled}>
      Add to Cart
    </Button>
  </Card>
);
