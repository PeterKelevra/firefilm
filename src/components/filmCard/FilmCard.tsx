import { Box, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import useFilmCardStyles from './FilmCard.styles';
import { Film } from '../../domain/Film';
import useStores from '../../hooks/useStores';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import { observer } from 'mobx-react';

interface FilmCardProperties {
  film: Film
}

function FilmCard({ film }: FilmCardProperties) {
  const classes = useFilmCardStyles();

  const { sessionStore, filmsStore } = useStores();
  const { user } = sessionStore;

  return (
    <Card className={ classes.root }>
      <CardActionArea>
        <CardMedia image={ film.image }/>
        <CardHeader title={ film.name } subheader={ `Año ${ film.year }` }/>
        <CardContent>
          <Typography color="textSecondary" component="div">
            <Box>
              <strong>Director</strong> { film.director }
            </Box>
            <Box>
              <strong>Duración</strong> { film.duration } min.
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      { user && (
        <CardActions disableSpacing onClick={ (e) => e.stopPropagation() }>
          <Box display="flex" justifyContent="flex-end" width={ 1 }>
            <IconButton disabled={ film.userUid !== user.uid } onClick={ () => filmsStore.setFilm(film) }>
              <EditIcon/>
            </IconButton>
          </Box>
        </CardActions>
      ) }
    </Card>
  );
}

export default observer(FilmCard);
