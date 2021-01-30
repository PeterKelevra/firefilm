import { makeStyles } from '@material-ui/core/styles';

const useFilmCardStyles = makeStyles(theme => ({
  root: {
    '& .MuiCardHeader-title': {
      fontSize: '1.3rem'
    },
    '& .MuiCardHeader-root': {
      minHeight: 110
    },
    '& .MuiCardContent-root': {
      paddingTop: 0
    },
    '& .MuiCardMedia-root': {
      backgroundPosition: 'top center',
      height: '40vh',
      minHeight: 300
    }
  }
}));

export default useFilmCardStyles;
