import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Title } from '@mantine/core';
import { productApi } from 'features/resources/products';
import { handleError } from 'shared/utils';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { RoutePath } from '_app/routes';
import { CreationForm, PreviewUpload } from 'widgets/Creation';

const schema = z.object({
  name: z.string().min(3).max(256),
  image: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

type CreateParams = z.infer<typeof schema>;

const Profile = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<CreateParams>({
    resolver: zodResolver(schema),
  });

  const {
    mutate: createProduct,
    isLoading: isUpdateLoading,
  } = productApi.useCreate<CreateParams>();

  const onSubmit = (submitData: CreateParams) => createProduct(
    submitData,
    {
      onSuccess: async (data) => {
        toast(`${data.product.name} created`);
        push(RoutePath.Products);
      },
      onError: (e) => handleError(e, setError),
    },
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        maw={700}
        gap={20}
      >
        <Title order={3}>Create new product</Title>

        <PreviewUpload
          image={getValues('image')}
          updateImage={(val: string) => { setValue('image', val); }}
          error={errors.image?.message}
          setError={(message) => { setError('image', { message }); }}
        />
        <CreationForm
          errors={errors}
          isLoading={isUpdateLoading}
          register={register}
          setValue={setValue}
        />
      </Stack>
    </form>
  );
};

export default Profile;
