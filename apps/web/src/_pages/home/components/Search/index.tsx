import { Flex, Skeleton, TextInput, UnstyledButton } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

import { type ChangeEvent } from 'react';

import classes from './index.module.css';

type Props = {
  isLoading: boolean,
  value: string,
  setValue: (value: string | ChangeEvent<any> | null | undefined) => void
};

export const SearchProducts = ({ isLoading, setValue, value }: Props) => (
  <Skeleton
    className={classes.wrapper}
    height={42}
    radius="sm"
    visible={isLoading}
    w="100%"
  >
    <TextInput
      w="100%"
      size="md"
      value={value}
      onChange={setValue}
      placeholder="Search by name or email"
      leftSection={<IconSearch size={16} />}
      rightSection={value ? (
        <UnstyledButton
          component={Flex}
          display="flex"
          align="center"
          onClick={() => setValue('')}
        >
          <IconX color="gray" />
        </UnstyledButton>
      ) : null}
    />
  </Skeleton>
);
