import { makeStyles } from '@material-ui/core';

const useAppStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    margin: 1,
    minWidth: 100,
    flexGrow: 1
  },
  mainContent: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(14)
  }
}));

export default useAppStyles;
