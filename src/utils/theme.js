import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FCB033'
    },
    secondary: {
      main: '#2D60A6'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#F6F5F4'
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
