import { Button, Card, Flex, Title, Text, Stack } from '@mantine/core';
import { RoutePath } from '_app/routes';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  image: string
  text: string
  route: RoutePath
  title: string
};

export const PaymentResults = ({ image, route, text, title }: Props) => {
  const router = useRouter();
  return (
    <Card maw={480} mx="auto" radius="xl" mt={84} py={20}>
      <Flex direction="column" align="center" gap={32} maw={330} mx="auto">
        <Image width={56} height={56} src={image} alt="payment result" />
        <Stack gap={16}>
          <Title size={24} order={2} ta="center">{title}</Title>
          <Text maw={235} size="sm" ta="center">{text}</Text>
        </Stack>
        <Button w={186} onClick={() => router.push(route)}>Back to Cart</Button>
      </Flex>
    </Card>
  );
};
