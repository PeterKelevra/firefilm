import { makeStyles } from '@material-ui/core/styles';

const useFooterStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    left: 0,
    bottom: 0,
    backgroundColor: 'black',
    padding: theme.spacing(2),
    fontSize: 14,
    '& img': {
      maxWidth: '100%',
      margin: theme.spacing(1),
      height: 30
    }
  }
}));

export default useFooterStyles;
