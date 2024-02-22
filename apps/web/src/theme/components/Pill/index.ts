import { Pill } from '@mantine/core';

import classes from './index.module.css';

export default Pill.extend({
  defaultProps: {
    withRemoveButton: true,
  },
  classNames: {
    root: classes.root,
    label: classes.label,
    remove: classes.remove,
  },
});
