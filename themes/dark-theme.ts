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
      main: '#3AD39E',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#43484C',
      default: '#2E3338',
    },
    text:{
      primary: 'rgba(255, 255, 255, 0.8)',
    },
    action:{
      active: '#3AD39E'
    }
  },
  typography: {
    fontFamily: [
      'SF Pro Text',
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