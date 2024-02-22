import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';
import { NextPage } from 'next';
import { Button, TextInput, Stack, Title } from '@mantine/core';

import { productApi } from 'resources/products';

import { handleError } from 'utils';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import PhotoUpload from './PhotoUpload';

import classes from './index.module.css';

const schema = z.object({
  name: z.string().min(3).max(256),
  price: z.string().transform(parseFloat),
  quantity: z.string().transform(parseFloat),
});

type CreateParams = z.infer<typeof schema>;

const Profile: NextPage = () => {
  const { push } = useRouter();
  const [image, setImage] = useState('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
  });

  const {
    mutate: createProduct,
    isLoading: isUpdateLoading,
  } = productApi.useCreate<CreateParams & { image: string }>();

  const onSubmit = (submitData: CreateParams) => createProduct(
    {
      ...submitData,
      image,
    },
    {
      onSuccess: async (data) => {
        toast(`${data.product.name} created`);
        push(RoutePath.Products);
      },
      onError: (e) => handleError(e, setError),
    },
  );

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Stack
        w={408}
        m="auto"
        pt={48}
        gap={32}
      >
        <Title order={1}>Profile</Title>
        <PhotoUpload image={image} setImage={setImage} />

        <form
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
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
            {/* <NumberInput
              {...register('price')}
              label="Price"
              prefix="$"
              placeholder="Enter price of the product"
              decimalScale={2}
            /> */}
            <TextInput
              {...register('price')}
              label="Price"
              type="number"
              placeholder="Enter price of the product"
              labelProps={{
                'data-invalid': !!errors.price,
              }}
              error={errors.price?.message}
            />
            <TextInput
              {...register('quantity')}
              type="number"
              label="Quantity"
              placeholder="Enter price of the product"
              labelProps={{
                'data-invalid': !!errors.quantity,
              }}
              error={errors.quantity?.message}
            />
          </Stack>

          <Button
            type="submit"
            loading={isUpdateLoading}
          >
            Create Product
          </Button>
        </form>
      </Stack>
    </>
  );
};

export default Profile;
