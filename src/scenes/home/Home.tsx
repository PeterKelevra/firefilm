import React from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import useStores from '../../hooks/useStores';
import FilmCard from '../../components/filmCard/FilmCard';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

function Home() {

  const { sessionStore, filmsStore } = useStores();
  const { user } = sessionStore;
  const history = useHistory();

  return (
    <Box>
      { user && (
        <Box display="flex" justifyContent="flex-end" mb={ 2 }>
          <Button variant="contained" color="primary"
            disabled={ !user }
            onClick={ () => filmsStore.setFilm({ userUid: user.uid }) }>
            Add film
          </Button>
        </Box>
      ) }
      <Grid container spacing={ 2 }>
        { filmsStore.filmsList.map(film =>
          <Grid key={ film.uid } item
            xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }
            onClick={ () => history.push(`/film/${ film.uid }`) }>
            <FilmCard film={ film }/>
          </Grid>
        ) }
      </Grid>
    </Box>
  );
}

export default observer(Home);
