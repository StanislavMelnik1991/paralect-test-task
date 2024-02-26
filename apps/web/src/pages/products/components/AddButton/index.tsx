import { Box, Button, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import classes from './index.module.css';

export const AddButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="white"
      size="xl"
      h="100%"
      fullWidth
      onClick={() => router.push(RoutePath.CreateProduct)}
    >
      <Box className={classes.wrapper}>
        <Box
          className={classes.icon}
          w={40}
          h={40}
        >
          +
        </Box>
        <Text>New Product</Text>
      </Box>
    </Button>
  );
};
