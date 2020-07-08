import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';



const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgba(46, 51, 56, 1)',
    },
    secondary: {
      main: 'rgba(58, 211, 158, 1)',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: 'rgba(67, 72, 76, 1)',
      default: 'rgba(46, 51, 56, 1)',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.8)',
      secondary: 'rgba(255, 255, 255, 0.6)',

    },
    action: {
      active: '#3AD39E'
    }
  },
  typography: {
    fontFamily: [
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