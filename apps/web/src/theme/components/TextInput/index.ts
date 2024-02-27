import { TextInput } from '@mantine/core';
import cx from 'clsx';

import classes from './index.module.css';

export default TextInput.extend({
  classNames: (_, props) => ({
    input: cx(classes.input, {
      [classes.inputError]: props.error,
    }),
    label: classes.label,
    error: classes.error,
  }),
});
