import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';



const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: 'rgba(246, 247, 249, 1)',
    },
    secondary: {
      main: 'rgba(8, 178, 122, 1)',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: 'rgba(255, 255, 255, 1)',
      default: 'rgba(246, 247, 249, 1)',
    },
    text: {
      primary: 'rgba(0, 0, 0, 1)',
      secondary: 'rgba(119, 119, 119, 1)',

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