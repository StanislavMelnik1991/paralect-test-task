import { Checkbox } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default Checkbox.extend({
  defaultProps: {
    size: 'sm',
    variant: 'outline',
  },
  classNames: (_, props) => ({
    input: cx(classes.input, {
      [classes.inputError]: props.error,
    }),
    label: classes.label,
    icon: classes.icon,
  }),
});
