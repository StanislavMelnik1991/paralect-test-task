import { BackgroundImage, Button, Flex, Text } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useState } from 'react';
import { productApi } from 'features/resources';
import { handleError } from 'shared/utils';
import classes from './index.module.css';

const ONE_MB_IN_BYTES = 1048576;

type Props = {
  image?: string
  updateImage: (image: string) => void,
  error?: string
  setError: (val?: string) => void
};

export const PreviewUpload = ({ image = '/images/default-image.png', updateImage, setError, error }: Props) => {
  const [newImage, setImage] = useState(image);

  const { mutate: uploadProfilePhoto } = productApi.useUploadImage<FormData>();

  const isFileSizeCorrect = (file: any) => {
    if ((file.size / ONE_MB_IN_BYTES) > 2) {
      setError('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setError('Sorry, you can only upload JPG, JPEG or PNG photos.');
    return false;
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    setError();

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);

      await uploadProfilePhoto(body, {
        onSuccess: ({ imageUrl }) => {
          setImage(imageUrl);
          updateImage(imageUrl);
        },
        onError: (err) => handleError(err),
      });
    }
  };
  return (
    <Flex
      maw={330}
      wrap="wrap"
      justify="space-between"
      align="center"
    >
      <BackgroundImage
        className={classes.avatar}
        w={180}
        h={180}
        src={newImage}
      />
      <Dropzone
        name="avatarUrl"
        accept={['image/png', 'image/jpg', 'image/jpeg']}
        onDrop={handlePhotoUpload}
        classNames={{
          root: classes.dropzoneRoot,
        }}
      >
        <Button
          color="gray"
          variant="outline"
        >
          Upload Photo
        </Button>
      </Dropzone>
      {!!error && <Text c="red">{error}</Text>}
    </Flex>
  );
};
