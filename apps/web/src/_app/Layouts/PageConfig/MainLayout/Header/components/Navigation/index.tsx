import { FC, memo } from 'react';

import { RoutePath } from '_app/routes';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import classes from './index.module.css';

const Component: FC = () => {
  const router = useRouter();
  return (
    <nav className={classes.navigation}>
      <Button
        size="sm"
        variant="filled"
        onClick={() => router.push(RoutePath.Home)}
        className={classes.button}
        disabled={router.route === RoutePath.Home}
      >
        Marketplace
      </Button>
      <Button
        size="sm"
        variant="filled"
        onClick={() => router.push(RoutePath.Products)}
        className={classes.button}
        disabled={router.route === RoutePath.Products}
      >
        Your Products
      </Button>
    </nav>
  );
};

export const NavigationMenu = memo(Component);
