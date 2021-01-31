import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@material-ui/core';

import filmCommentsStyles from './FilmComments.styles';
import useStores from '../../hooks/useStores';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import FilmCard from '../../components/filmCard/FilmCard';
import useFirebase from '../../hooks/useFirebase';
import CommentForm from '../../components/commentForm/CommentForm';

function FilmComments() {

  const classes = filmCommentsStyles();
  const firebase = useFirebase();
  const { filmsStore, commentsStore } = useStores();
  const { uid } = useParams();
  const film = filmsStore.filmsList.find(film => film.uid === uid)
  const dateFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  useEffect(() => {
    const comments = firebase.comments().orderByChild('filmUid').equalTo(uid);
    comments.on('value', (snapshot) => {
      !!snapshot?.val && commentsStore.setComments(snapshot.val());
    });
    return () => comments.off();
  }, [])

  return (
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 6 } md={ 4 }>
        { film && <FilmCard film={ film }/> }
      </Grid>
      <Grid item xs={ 12 } sm={ 6 } md={ 8 } className={ classes.comments }>
        <Box mb={1}>
          <Typography variant="h4">Comentarios</Typography>
        </Box>
        {!commentsStore?.commentsList?.length && (
          <Card>
            <CardContent>Sé el primero en comentar esta película</CardContent>
          </Card>

        )}
        { commentsStore?.commentsList?.map(comment =>
          <Card>
            <CardContent>
              <Box display="flex">
                <Box flexGrow={ 1 }>
                  <Typography color="textSecondary" gutterBottom>
                    { comment.author }
                  </Typography>
                </Box>
                <Box>{ new Date(comment.createdAt).toLocaleDateString('es', dateFormatOptions) }</Box>
              </Box>
              { comment.text }
            </CardContent>
          </Card>
        ) }
      </Grid>
      <Grid item xs={ 12 }>
        <CommentForm filmUid={ uid }/>
      </Grid>
    </Grid>
  );
}

export default observer(FilmComments);
