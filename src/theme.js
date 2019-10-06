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

export default materialTheme;
