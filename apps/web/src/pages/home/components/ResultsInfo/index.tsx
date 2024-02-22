import { Box, Group, Pill, Select, Skeleton, Text } from '@mantine/core';
import { type ComboboxData } from '@mantine/core';
import { IconArrowsSort, IconSelector } from '@tabler/icons-react';

import classes from './index.module.css';

type Props = {
  count?: number;
  isLoading: boolean;
  data: ComboboxData;
  value: string | null;
  onChange: (value: string) => void
  filter: [string | undefined, string | undefined]
  onRemove: ()=>void
};

export const ResultsInfo = ({
  count,
  data,
  isLoading,
  onChange,
  value,
  filter,
  onRemove,
}: Props) => (
  <Box>
    <Group wrap="nowrap" justify="space-between" w="100%" className={classes.wrapper}>
      <Text fw="bold">
        {`${count || 0} results`}
      </Text>
      <Skeleton
        width="auto"
        height={42}
        radius="sm"
        visible={isLoading}
      >
        <Select
          size="xs"
          w={160}
          data={data}
          value={value}
          onChange={onChange}
          rightSection={<IconSelector size={16} />}
          leftSection={<IconArrowsSort size={16} />}
          comboboxProps={{
            withinPortal: false,
            transitionProps: {
              transition: 'pop-bottom-right',
              duration: 210,
              timingFunction: 'ease-out',
            },
          }}
        />
      </Skeleton>
    </Group>
    <Pill.Group>
      {filter[0] && (
      <Pill
        withRemoveButton
        size="md"
        onRemove={onRemove}
      >
        {`$${filter[0]}${filter[1] ? `-$${filter[1]}` : ''}`}
      </Pill>
      )}
    </Pill.Group>
  </Box>
);
