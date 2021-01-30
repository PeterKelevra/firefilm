import { makeStyles } from '@material-ui/core/styles';

const filmCommentsStyles = makeStyles((theme) => ({
  comments: {
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    '& .MuiCard-root': {
      marginBottom: theme.spacing(2)
    }
  }
}));

export default filmCommentsStyles;
