import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import classes from './index.module.css';

export const CartNavigation = () => {
  const router = useRouter();
  return (
    <nav className={classes.navigation}>
      <Button
        size="md"
        c={router.route === RoutePath.Cart ? 'dark' : 'gray'}
        p={5}
        variant="subtle"
        onClick={() => router.push(RoutePath.Cart)}
        className={classes.button}
        disabled={router.route === RoutePath.Cart}
      >
        My cart
      </Button>
      <Button
        size="md"
        c={router.route === RoutePath.History ? 'dark' : 'gray'}
        p={5}
        variant="subtle"
        onClick={() => router.push(RoutePath.History)}
        className={classes.button}
        disabled={router.route === RoutePath.History}
      >
        History
      </Button>
    </nav>
  );
};
