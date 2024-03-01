import { Button, Card, Flex, Stack, Text, Title } from '@mantine/core';
import { MouseEventHandler } from 'react';
import classes from './index.module.css';

type Props = {
  handleBue: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  amount: number
};

export const Summary = ({ amount, handleBue, isLoading }: Props) => (
  <Card
    h="100%"
    shadow="sm"
    padding="md"
    radius="lg"
    withBorder
  >
    <Stack gap={32}>
      <Title order={4}>Summary</Title>

      <Flex className={classes.line} />

      <Flex display="inline-flex" justify="space-between">
        <Text size="sm" c="gray">Total price</Text>
        <Title order={4}>{amount}</Title>
      </Flex>
      <Button
        fullWidth
        loading={isLoading}
        onClick={handleBue}
      >
        Proceed to Ckeckout
      </Button>
    </Stack>
  </Card>
);
