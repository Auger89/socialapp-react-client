import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        flexDirection: 'row'
      }
    }
  }
});

/*
primary: {
      main: '#c62828',
      light: '#d15353',
      dark: '#8a1c1c',
      contrastText: '#fff'
    },
    secondary: {
      main: '#c67028',
      light: '#d18c53',
      dark: '#8a4e1c',
      contrastText: '#fff'
    },

*/

export default materialTheme;
