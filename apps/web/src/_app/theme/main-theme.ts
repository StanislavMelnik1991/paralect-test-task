import { createTheme } from '@mantine/core';

import * as components from 'shared/theme';

const mainTheme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  fontFamilyMonospace: 'monospace',
  headings: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '600',
  },
  radius: {
    xl: '20px',
    lg: '12px',
    md: '10px',
    sm: '8px',
    xs: '6px',
  },
  lineHeights: {
    xl: '44px',
    lg: '36px',
    md: '28px',
    sm: '24px',
    xs: '21px',
  },
  primaryColor: 'blue',
  primaryShade: 6,
  components,
  fontSizes: {
    xl: '36px',
    lg: '26px',
    md: '20px',
    sm: '16px',
    xs: '14px',
  },
});

export default mainTheme;
