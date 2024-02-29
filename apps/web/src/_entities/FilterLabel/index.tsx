import { Pill } from '@mantine/core';
import { memo, useEffect, useState } from 'react';

type Props = {
  onRemove?(): void
  from?: string
  to?: string
};

const Component = ({ from, onRemove, to }: Props) => {
  const [text, setText] = useState('asd');
  useEffect(() => {
    if (from && to) {
      setText(`$${from}-$${to}`);
    } else if (!from && to) {
      setText(`less than $${to}`);
    } else if (from && !to) {
      setText(`more than $${from}`);
    } else {
      setText('');
    }
  }, [from, to]);
  return (
    <Pill.Group>
      <Pill
        withRemoveButton
        size="md"
        onRemove={onRemove}
      >
        {text}
      </Pill>
    </Pill.Group>
  );
};

export const FilterLabel = memo(Component);
