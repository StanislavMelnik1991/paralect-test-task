import { Badge, Box } from '@mantine/core';
import classes from './index.module.css';

type Props = {
  quantity: number
  sold: number
  pending: number
};

export const CardBadge = ({ quantity, sold, pending }: Props) => {
  if (quantity === 0 && pending === 0 && sold) {
    return (
      <Box display="flex" className={classes.wrapper}>
        <Badge radius={0} size="lg" variant="light" color="green">Sold</Badge>
      </Box>
    );
  } if (pending) {
    return (
      <Box display="flex" className={classes.wrapper}>
        <Badge radius={0} size="lg" variant="light" color="blue">{`Payment expected: ${pending}`}</Badge>
      </Box>
    );
  }
  return (
    <Box display="flex" className={classes.wrapper}>
      <Badge radius={0} size="lg" variant="light" color="orange">On sale</Badge>
    </Box>
  );
};
