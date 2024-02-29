import { Center, Table } from '@mantine/core';
import { ProductCounter, TableImage, RemoveButton } from '_entities';
import { memo } from 'react';
import { z } from 'zod';
import { cartApi } from 'features/resources';

type Props = {
  name: string
  image?: string
  price: number
  id: string
  quantity: number
  inBasket: number
};

const updateSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(0),
});

type UpdateQuantityParams = z.infer<typeof updateSchema>;

const Row = ({ id, image = '', inBasket, name, price, quantity }: Props) => {
  const {
    isLoading,
    mutate: updateQuantity,
  } = cartApi.useUpdateQuantity<UpdateQuantityParams>();
  return (
    <Table.Tr key={name}>
      <Table.Td>
        <TableImage image={image} name={name} />
      </Table.Td>

      <Table.Td>{name}</Table.Td>

      <Table.Td>
        <Center>
          $
          {price}
        </Center>
      </Table.Td>

      <Table.Td>
        <Center>
          <ProductCounter
            handleChange={(val: number) => updateQuantity({ productId: id, quantity: val })}
            isLoading={isLoading}
            available={quantity}
            quantity={inBasket}
          />
        </Center>
      </Table.Td>

      <Table.Td>
        <Center>
          <RemoveButton
            isLoading={isLoading}
            handleRemove={() => updateQuantity({ productId: id, quantity: 0 })}
          />
        </Center>
      </Table.Td>
    </Table.Tr>
  );
};

export default memo(Row);
