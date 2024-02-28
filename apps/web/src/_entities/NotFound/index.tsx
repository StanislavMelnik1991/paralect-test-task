import { Container, Text, Title, Stack, Button } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { RoutePath } from '_app/routes';

type Props = {
  onClick?: () => void
};

export const NotFoundResults = ({ onClick }: Props) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      router.push(RoutePath.Home);
    }
  }, [onClick, router]);
  return (
    <Container>
      <Stack gap={20} align="center">
        <Image
          src="/images/404.png"
          alt="404"
          width={206}
          height={206}
        />
        <Title order={3}>
          {" Oops, there's nothing here yet!"}
        </Title>
        <Text size="xs" ta="center" c="gray">
          {"You haven't made any purchases yet. "}
          <br />
          Go to the marketplace and make purchases.
        </Text>
        <Button onClick={handleClick}>Go to Marketplace</Button>
      </Stack>
    </Container>
  );
};
