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
  price: z.number().min(0),
  quantity: z.number().min(1),
  image: z.string().url(),
});

type CreateParams = z.infer<typeof schema>;

const Profile: NextPage = () => {
  const { push } = useRouter();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('1');

  const {
    register,
    setError,
    formState: { errors },
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const {
    mutate: createProduct,
    isLoading: isUpdateLoading,
  } = productApi.useCreate<CreateParams>();

  const onSubmit = (submitData: CreateParams) => createProduct(submitData, {
    onSuccess: async (data) => {
      toast(`${data.product.name} created`);
      push(RoutePath.Products);
    },
    onError: (e) => handleError(e, setError),
  });

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
        /* onSubmit={handleSubmit(onSubmit)} */
        >
          <Stack gap={20}>
            <TextInput
              {...register('name')}
              label="Title of the product"
              placeholder="Enter title of the product..."
              labelProps={{
                'data-invalid': !!errors.name,
              }}
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              error={errors.name?.message}
            />
            <TextInput
              {...register('price')}
              label="Price"
              placeholder="Enter price of the product"
              labelProps={{
                'data-invalid': !!errors.price,
              }}
              value={price}
              onChange={(ev) => {
                const val = Number(ev.target.value);
                if (!ev.target.value) {
                  setPrice('');
                }
                if (!Number.isNaN(val)) {
                  setPrice(ev.target.value);
                }
              }}
              error={errors.price?.message}
            />
            <TextInput
              {...register('quantity')}
              label="Quantity"
              placeholder="Enter price of the product"
              labelProps={{
                'data-invalid': !!errors.quantity,
              }}
              value={quantity}
              onChange={(ev) => {
                const val = Number(ev.target.value);
                if (!ev.target.value) {
                  setQuantity('');
                }
                if (!Number.isNaN(val)) {
                  setQuantity(ev.target.value);
                }
              }}
              error={errors.quantity?.message}
            />
          </Stack>

          <Button
            type="button"
            onClick={
              () => {
                onSubmit({
                  name,
                  price: Number(price),
                  quantity: Number(quantity),
                  image,
                });
              }
            }
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
