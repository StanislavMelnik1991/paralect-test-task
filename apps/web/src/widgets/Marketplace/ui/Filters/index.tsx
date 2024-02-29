import { Button, Card, Grid, Group, NumberInput, Text } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  data: [string | undefined, string | undefined]
  onChange: Dispatch<SetStateAction<[string | undefined, string | undefined]>>
};

export const Filters = ({ data: [from, to], onChange }: Props) => (
  <Card shadow="sm" padding="lg" radius="xl" withBorder>
    <Group justify="space-between">
      <Text fw="bold" size="md">Filters</Text>
      <Button
        variant="subtle"
        size="sm"
        onClick={() => onChange(['', ''])}
        rightSection={<IconX size={16} />}
      >
        Reset All
      </Button>
    </Group>
    <Text mt={32} mb={12} fw="bold">Price</Text>

    <Grid grow>
      <Grid.Col span={6} miw={140}>
        <NumberInput
          leftSectionWidth={54}
          suffix="$"
          leftSection={<Text ml={12} size="sm">From</Text>}
          value={from}
          onChange={(val) => onChange([String(val), to])}
          placeholder=""
          allowNegative={false}
          decimalScale={2}
          hideControls
        />
      </Grid.Col>
      <Grid.Col span={6} miw={140}>
        <NumberInput
          leftSectionWidth={30}
          leftSection={<Text size="sm">To</Text>}
          value={to}
          onChange={(val) => onChange([from, String(val)])}
          suffix="$"
          placeholder=""
          allowNegative={false}
          decimalScale={2}
          hideControls
        />
      </Grid.Col>
    </Grid>
  </Card>
);
