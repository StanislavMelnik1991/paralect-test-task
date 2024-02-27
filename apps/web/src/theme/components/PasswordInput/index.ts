import { PasswordInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default PasswordInput.extend({
  classNames: (_, props) => ({
    innerInput: cx(classes.innerInput, {
      [classes.innerInputError]: props.error,
    }),
    label: classes.label,
    error: classes.error,
    input: cx({
      [classes.inputError]: props.error,
    }),
  }),
});
