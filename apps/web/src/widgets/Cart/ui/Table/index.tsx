import { Center, Table } from '@mantine/core';
import { CartProduct } from 'types';

import Row from './Row';

type Props = {
  elements: Array<CartProduct>
};

export const CartTable = ({ elements }: Props) => {
  const rows = elements.map(({
    _id: id,
    quantity,
    name,
    available,
    image,
    price,
  }) => (
    <Row
      key={id}
      id={id}
      image={image}
      inBasket={quantity}
      name={name}
      quantity={available}
      price={price}
    />
  ));
  return (
    <Table maw={951}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th c="gray" fw="normal" maw={80}>Item</Table.Th>
          <Table.Th c="gray" fw="normal" miw={144} />
          <Table.Th c="gray" fw="normal" maw={144}>
            <Center>Unit Price</Center>
          </Table.Th>
          <Table.Th c="gray" fw="normal" maw={144}>
            <Center>Quantity</Center>
          </Table.Th>
          <Table.Th c="gray" fw="normal" maw={144} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
