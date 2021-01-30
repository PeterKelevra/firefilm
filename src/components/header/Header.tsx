import React, { useState } from 'react';
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link as RouterLink } from 'react-router-dom';
import headerStyles from './Header.styles';
import { localImage } from '../../services/media.provider';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import useFirebase from '../../hooks/useFirebase';

function Header({ sessionStore }) {

  const classes = headerStyles();
  const firebase = useFirebase();
  const { user } = sessionStore;
  const [openDialog, setOpenDialog] = useState(false);

  const logout = () => {
    firebase.doSignOut().then(() => {
      sessionStore.setUser();
      onClose();
    });
  };

  const onClose = () => setOpenDialog(false);

  return (
    <AppBar position="sticky">
      <Box className={ classes.toolbar }>
        <Box>
          <Link component={ RouterLink } to="/" className={ classes.logo }>
            <img src={ localImage('logo.png') } alt="logo"/>
            <Typography variant="h4">FireFilm</Typography>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end" flexGrow={ 1 }>
          { !!user ? (
            <>
              <Box mr={ 1 }>
                <AccountCircleIcon color="secondary" fontSize="large"/>
              </Box>
              <Typography color="secondary" variant="body1">
                { user.displayName }
              </Typography>
              <IconButton onClick={ () => setOpenDialog(true) } className={ classes.logoutButton }>
                <ExitToAppIcon/>
              </IconButton>
            </>
          ) : (
            <Button variant="contained" color="primary" component={ RouterLink } to="/login">
              Login
            </Button>
          ) }
        </Box>
      </Box>
      <Dialog open={ openDialog } onClose={ onClose }>
        <DialogTitle>Cerrar Sesión</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que desea salir de la aplicación?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ onClose } color="secondary">
            Cancelar
          </Button>
          <Button onClick={ logout } color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default compose(
  inject('sessionStore'),
  observer
)(Header);
