import { Pill } from '@mantine/core';

import classes from './index.module.css';

export default Pill.extend({
  classNames: {
    root: classes.root,
    label: classes.label,
    remove: classes.remove,
  },
});
