import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, useMediaQuery, useTheme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useFilmDialogStyles from './FilmDialog.styles';
import React from 'react';
import useStores from '../../hooks/useStores';
import { useForm } from 'react-hook-form';
import { observer } from 'mobx-react';
import useFirebase from '../../hooks/useFirebase';

function FilmDialog() {
  const classes = useFilmDialogStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const firebase = useFirebase();
  const { filmsStore } = useStores();
  const { film } = filmsStore;
  const { register, watch, errors, trigger, getValues, handleSubmit } = useForm();
  const required = 'Campo requerido';

  const onClose = () => {
    filmsStore.setFilm();
  };

  const onSubmit = () => {
    console.log('onSubmit');
    trigger().then(() => {
      const data = {
        ...film,
        ...getValues()
      }
      return (film.uid ?
          firebase.film(film.uid).set(data) :
          firebase.films().push(data)
      ).then(() => onClose());
    });
  }

  return (
    <Dialog disableBackdropClick maxWidth="md" open={ !!film?.userUid } fullScreen={ fullScreen } onClose={ onClose }>
      <form onSubmit={ handleSubmit(onSubmit) } noValidate>
      <DialogTitle id="form-dialog-title">
        { film?.uid ? 'Film Edition' : 'Create Film' }
        <IconButton aria-label="close" className={ classes.closeButton } onClick={ onClose }>
          <CloseIcon/>
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container className={ classes.content } spacing={ 2 }>
          <Grid item xs={ 12 } md={ 7 }>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              defaultValue={ film?.name }
              error={ !!errors.name }
              helperText={ errors.name?.message }
              inputRef={ register({ required }) }
            />
            <TextField
              autoFocus
              name="year"
              margin="dense"
              label="Year"
              type="number"
              fullWidth
              defaultValue={ film?.year }
              error={ !!errors.year }
              helperText={ errors.year?.message }
              inputRef={ register({ required }) }
              inputProps={ { min: 1985, max: 2022 } }
            />
            <TextField
              autoFocus
              name="director"
              margin="dense"
              label="Direcctor"
              type="text"
              fullWidth
              defaultValue={ film?.director }
              error={ !!errors.director }
              helperText={ errors.director?.message }
              inputRef={ register({ required }) }
            />
            <TextField
              autoFocus
              name="duration"
              margin="dense"
              label="Duration (min.)"
              type="number"
              fullWidth
              defaultValue={ film?.duration }
              error={ !!errors.duration }
              helperText={ errors.duration?.message }
              inputRef={ register({ required }) }
            />
            <TextField
              autoFocus
              name="image"
              margin="dense"
              label="Image"
              type="text"
              fullWidth
              defaultValue={ film?.image }
              error={ !!errors.image }
              helperText={ errors.duration?.message }
              inputRef={ register({ required }) }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 5 }>
            <img src={ watch('image') || film?.image }/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={ onClose } color="secondary">
        Cancel
        </Button>
        <Button type="submit" color="primary">
        Save
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
}

export default observer(FilmDialog);
