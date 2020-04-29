import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';



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