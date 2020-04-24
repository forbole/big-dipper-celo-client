import { createMuiTheme } from '@material-ui/core/styles';
// import AurulentsansmonoWoff2 from './fonts/aurulentsansmono-regular.woff2';
// import TSIcon from './fonts/icomoon.woff';
import red from '@material-ui/core/colors/red';

// const aurulentsansmono = {
//   fontFamily: 'Aurulent Sans Mono',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 400,
//   src: `
//     local('Raleway'),
//     local('Raleway-Regular'),
//     url(${AurulentsansmonoWoff2}) format('woff')
//   `,
//   unicodeRange:
//     'U+30-39',
// };
// Create a theme instance.

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#2E3338',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#43484C',
      default: '#2E3338'
    },
    text:{
      primary: '#FFFFFFE6',
    },
    action:{
      active: '#3AD39E'
    }
  },
  typography: {
    fontFamily: [
      'Hind Madurai',
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default theme;