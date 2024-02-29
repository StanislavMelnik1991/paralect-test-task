import { Center, Table } from '@mantine/core';
import { TableImage } from '_entities';
import { memo } from 'react';
import { formatDate } from 'shared/utils/formatDate.util';

type Props = {
  name: string
  image?: string
  price: number
  quantity: number
  date: Date
};

const Row = ({ image = '', name, price, quantity, date }: Props) => (
  <Table.Tr key={name}>
    <Table.Td>
      <TableImage image={image} name={name} />
    </Table.Td>

    <Table.Td>
      {name}
    </Table.Td>

    <Table.Td>
      <Center>
        $
        {price}
      </Center>
    </Table.Td>

    <Table.Td>
      <Center>{quantity}</Center>
    </Table.Td>

    <Table.Td>
      <Center>{formatDate(date)}</Center>
    </Table.Td>
  </Table.Tr>
);

export default memo(Row);
