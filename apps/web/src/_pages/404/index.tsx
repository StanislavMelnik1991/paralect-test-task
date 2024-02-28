import { useCallback } from 'react';
import router from 'next/router';
import { Stack, Title, Text, Button } from '@mantine/core';

import { RoutePath } from '_app/routes';

const NotFound = () => {
  const handleClick = useCallback(() => {
    router.push(RoutePath.Home);
  }, []);

  return (
    <Stack
      m="auto"
      w={328}
      h="100vh"
      justify="center"
      display="flex"
    >
      <Title order={2}>Oops! The page is not found.</Title>

      <Text mx={0} mt={20} mb={24} c="gray.6">
        The page you are looking for may have been removed,
        or the link you followed may be broken.
      </Text>

      <Button
        type="submit"
        onClick={handleClick}
      >
        Go to homepage
      </Button>
    </Stack>
  );
};

export default NotFound;
