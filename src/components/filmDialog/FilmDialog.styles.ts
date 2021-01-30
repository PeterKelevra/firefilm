import { makeStyles } from '@material-ui/core/styles';

const useFilmDialogStyles = makeStyles(theme => ({
  content: {
    width: '100%',
    minHeight: '80vh',
    '& img': {
      marginTop: theme.spacing(2),
      width: '100%'
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[100]
  }
}));

export default useFilmDialogStyles;
