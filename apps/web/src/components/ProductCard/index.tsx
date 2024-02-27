import { Box, Card, Group, Text } from '@mantine/core';
import Image from 'next/image';
import { Product } from 'types';

import classes from './index.module.css';

type Props = {
  product: Product
  mainButton?: JSX.Element | false
  secondaryButton?: JSX.Element | false
  badge?: JSX.Element | false
};

export const ProductCard = ({
  product: {
    image,
    name,
    price,
  },
  mainButton,
  secondaryButton,
  badge,
}: Props) => (
  <Card
    h="100%"
    shadow="sm"
    padding="md"
    radius="xl"
    withBorder
  >
    <Card.Section pos="relative">
      <Image
        className={classes.image}
        src={image || ''}
        alt={name}
        width={0}
        height={0}
        sizes="100%"
      />
      <Box pos="absolute" right={16} top={16}>
        {secondaryButton}
      </Box>
      <Box pos="absolute" right={16} bottom={16}>
        {badge}
      </Box>
    </Card.Section>

    <Text truncate="end" mt={16} size="md" fw="bold">{name}</Text>

    <Group justify="space-between" mt={13}>
      <Text c="A3A3A3" size="xs" fw="bold">Price: </Text>
      <Text fw="bold">{`$${price}`}</Text>
    </Group>

    {mainButton && (
    <Box mt={22}>
      {mainButton}
    </Box>
    )}
  </Card>
);
