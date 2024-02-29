import { Center, Table } from '@mantine/core';
import { CartProduct } from 'types';

import Row from './Row';

type Props = {
  elements: Array<CartProduct>
};

export const HistoryTable = ({ elements }: Props) => {
  const rows = elements.map(({
    _id: id,
    quantity,
    name,
    image,
    price,
    createdOn,
  }) => (
    <Row
      key={id}
      image={image}
      name={name}
      quantity={quantity}
      price={price}
      date={new Date(createdOn)}
    />
  ));
  return (
    <Table maw={951}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th c="gray" fw="normal" maw={80}>Item</Table.Th>
          <Table.Th c="gray" fw="normal" />
          <Table.Th c="gray" fw="normal" maw={144}>
            <Center>Unit Price</Center>
          </Table.Th>
          <Table.Th c="gray" fw="normal" maw={144}>
            <Center>Quantity</Center>
          </Table.Th>
          <Table.Th c="gray" fw="normal" maw={144}>
            <Center>Date</Center>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
