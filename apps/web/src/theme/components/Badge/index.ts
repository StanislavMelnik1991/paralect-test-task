import { Badge } from '@mantine/core';

import classes from './index.module.css';

export default Badge.extend({
  classNames: {
    label: classes.label,
    root: classes.root,
    section: classes.section,
  },
});
