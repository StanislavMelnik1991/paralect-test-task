import { FC, ReactElement } from 'react';

import { SimpleGrid, Image, Center, Card, Text, Group } from '@mantine/core';

import classes from './UnauthorizedLayout.module.css';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const MEMBERS = [
  { src: '/images/unauthorized/members/Avatar.png' },
  { src: '/images/unauthorized/members/Avatar2.png' },
  { src: '/images/unauthorized/members/Avatar3.png' },
  { src: '/images/unauthorized/members/Avatar4.png' },
  { src: '/images/unauthorized/members/Avatar5.png' },
];

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => (
  <SimpleGrid
    cols={{ base: 1, sm: 2 }}
    spacing="sm"
  >
    <Center w="100%" h="100vh" component="main">
      {children}
    </Center>
    <Card m={32} p={32} radius="lg" className={classes.card}>
      <Image
        alt="Logo"
        src="/images/logo.svg"
        w="135px"
        className={classes.logo}
      />
      <Image
        alt="App Info"
        src="/images/unauthorized/shop.png"
        w="100%"
        m="auto"
      />
      <Group gap={5}>
        <Text component="h2" size="xl" fw="bold">
          Sell and buy products super quickly!
        </Text>
        <Text size="md">
          Save your time, we take care of all the processing.
        </Text>
      </Group>
      <Group align="center" gap={20}>
        <Group gap={0}>
          {MEMBERS.map(({ src }) => (
            <Image
              className={classes.avatar}
              src={src}
              alt="avatar"
              key={src}
              w="40px"
              h="40px"
            />
          ))}
        </Group>
        <Text size="sm">
          <span className={classes.bold}>+100</span>
          {' '}
          users from all over the world
        </Text>
      </Group>
    </Card>
  </SimpleGrid>
);

export default UnauthorizedLayout;
