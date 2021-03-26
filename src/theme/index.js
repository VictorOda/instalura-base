import { typographyVariants } from './typographyVariants';

const colors = {
  background: {
    light: {
      color: '#F2F2F2',
    },
    main: {
      color: '#FFFFFF',
    },
    dark: {
      color: '#030506',
    },
  },
  borders: {
    main: {
      color: '#F2F2F2',
    },
    dark: {
      color: '#181F22',
    },
  },
  primary: {
    main: {
      color: '#D7385E',
      contrastText: '#fff',
    },
    dark: {
      color: '#D7385E',
      contrastText: '#fff',
    },
  },
  secondary: {
    main: {
      color: '#FB7B6B',
    },
    dark: {
      color: '#FFA59A',
    },
  },
  tertiaryMain: {
    main: {
      color: '#070C0E',
      contrastText: '#070C0E',
    },
    dark: {
      color: '#FFA59A',
      contrastText: '#fff',
    },
  },
  tertiaryLight: {
    main: {
      color: '#88989E',
      contrastText: '#88989E',
    },
    dark: {
      color: '#fff',
      contrastText: '#D4D4D4',
    },
  },
  // Feedback colors
  error: {
    main: {
      color: '#dc3545',
      contrastText: '#fff',
    },
    dark: {
      color: '#dc3545',
      contrastText: '#fff',
    },
  },
  success: {
    main: {
      color: '#28a745',
      contrastText: '#fff',
    },
    dark: {
      color: '#dc3545',
      contrastText: '#fff',
    },
  },
  modes: {
    dark: {},
  },
};

export default {
  colors,
  typographyVariants,
  breakpoints: {
    xs: 0,
    sm: 480,
    md: 768,
    lg: 992,
    xl: 1200,
  },
  borderRadius: '12px',
  transition: '200ms ease-in-out',
  fontFamily: '\'Rubik\', sans-serif',
  mode: 'main',
};
