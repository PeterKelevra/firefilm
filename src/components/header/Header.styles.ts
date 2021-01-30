import { makeStyles } from '@material-ui/core/styles';

const headerStyles = makeStyles(theme => ({
  toolbar: {
    minHeight: 64,
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    borderBottomStyle: 'solid',
    borderColor: theme.palette.primary.main,
    borderBottomWidth: 2,
    [theme.breakpoints.up('md')]: {
      minHeight: 80
    }
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      height: 60,
      width: 'auto',
      float: 'left',
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        maxHeight: 40
      }
    },
    '&:hover': {
      textDecoration: 'none'
    }
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default headerStyles;
