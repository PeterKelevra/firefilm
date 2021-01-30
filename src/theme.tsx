import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const disableFormFill = {
  transition: 'background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s',
};


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#EFC84A',
    },
    secondary: {
      main: '#DDDDDD',
    },
    background: {
      paper: '#1D1D1D',
      default: '#141414',
    },
    grey: {
      600: '#808080'
    },
    text: {
      disabled: '#808080'
    }
  },
  overrides: {
    MuiInputBase: {
      root: {
        '& input': {
          '&:-webkit-autofill': disableFormFill,
          '&:-webkit-autofill:focus': disableFormFill,
          '&:-webkit-autofill:hover': disableFormFill,
        },
      },
    },
    MuiCssBaseline: {
      '@global': {
        a: {
          cursor: 'pointer'
        },
      }
    }
  }
});

export default responsiveFontSizes(theme);
