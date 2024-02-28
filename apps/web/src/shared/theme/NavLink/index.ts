import { NavLink } from '@mantine/core';

import classes from './index.module.css';

export default NavLink.extend({
  classNames: {
    label: classes.label,
    root: classes.root,
  },
});
