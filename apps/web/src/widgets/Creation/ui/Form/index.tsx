import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

type Props = {
  register: UseFormRegister<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>
  errors: FieldErrors<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>
  isLoading: boolean
  setValue: UseFormSetValue<{
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>
};

export const CreationForm = ({ register, errors, isLoading, setValue }: Props) => (
  <Stack gap={20}>
    <TextInput
      {...register('name')}
      label="Title of the product"
      placeholder="Enter title of the product..."
      labelProps={{
        'data-invalid': !!errors.name,
      }}
      error={errors.name?.message}
    />
    <NumberInput
      suffix="$"
      label="Price"
      onChange={(val) => setValue('price', Number(val))}
      placeholder="Enter price of the product"
      allowNegative={false}
      decimalScale={2}
      hideControls
      labelProps={{
        'data-invalid': !!errors.price,
      }}
      error={errors.price?.message}
    />
    <NumberInput
      label="Quantity"
      onChange={(val) => setValue('quantity', Number(val))}
      placeholder="Enter the product quantity"
      allowNegative={false}
      decimalScale={0}
      hideControls
      labelProps={{
        'data-invalid': !!errors.quantity,
      }}
      error={errors.quantity?.message}
    />
    <Button
      type="submit"
      loading={isLoading}
      w="fit-content"
      ml="auto"
      mt="sm"
      size="lg"
    >
      Create Product
    </Button>
  </Stack>
);
