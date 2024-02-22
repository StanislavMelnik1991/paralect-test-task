import { Select } from '@mantine/core';

import classes from './index.module.css';

export default Select.extend({
  defaultProps: { size: 'md' },
  classNames: {
    root: classes.root,
    input: classes.input,
  },
});
