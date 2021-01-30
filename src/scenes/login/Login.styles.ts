import { makeStyles } from '@material-ui/core/styles';

export const useLoginStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(5, 2, 8, 2),
    minHeight: '40vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  boxForm: {
    margin: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(3, 0)
  }
}));

