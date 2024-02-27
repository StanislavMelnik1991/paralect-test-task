import { Table } from '@mantine/core';
import { CartProducts } from '../../hooks/constants';
import ProductImage from './Image';
import Counter from './Counter';
import RemoveButton from './Remove';

type Props = {
  elements: Array<CartProducts>
  handleUpdateQuantity: (props: {
    quantity: number;
    productId: string;
  }) => void
  isUpdateLoading: boolean
};

export const CartTable = ({ elements, handleUpdateQuantity, isUpdateLoading }: Props) => {
  const rows = elements.map((el) => (
    <Table.Tr key={el.name}>
      <Table.Td>
        <ProductImage image={el.image} name={el.name} />
      </Table.Td>
      <Table.Td>{el.name}</Table.Td>
      <Table.Td>
        $
        {el.price}
      </Table.Td>
      <Table.Td>
        <Counter
          quantity={el.quantity}
          loading={isUpdateLoading}
          changeQuantity={(quantity: number) => {
            handleUpdateQuantity({ quantity, productId: el.id });
          }}
        />
      </Table.Td>
      <Table.Td>
        <RemoveButton
          loading={isUpdateLoading}
          changeQuantity={(quantity: number) => {
            handleUpdateQuantity({ quantity, productId: el.id });
          }}
        />
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th c="gray" fw="normal" w={80}>Item</Table.Th>
          <Table.Th c="gray" fw="normal" />
          <Table.Th c="gray" fw="normal" w="17%">Unit Price</Table.Th>
          <Table.Th c="gray" fw="normal" w="17%">Quantity</Table.Th>
          <Table.Th c="gray" fw="normal" w="17%" />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
