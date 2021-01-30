import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useLoginStyles } from './Login.styles';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import useStores from '../../hooks/useStores';

const Login = () => {
  const classes = useLoginStyles();
  const firebase = useFirebase()
  const { sessionStore } = useStores();
  const { register, trigger, errors, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const history = useHistory();
  const required = 'Campo requerido';

  const goToHome = () => history.push('/');

  const onGoogleLogin = () => {
    setError(undefined);
    firebase
      .doSignInWithGoogle()
      .then(goToHome)
      .catch(catchFirebaseError);
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    setError(undefined);
    trigger().then(() => {
      firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(goToHome)
        .catch(catchFirebaseError);
    });
  };

  const catchFirebaseError = ({ message }) => setError(message);

  if (!!sessionStore.user) {
    goToHome();
  }

  return !sessionStore.user && (
    <Container disableGutters={ true } component="main" maxWidth="xs">
      <Box className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box mt={ 2 }>
          { !!error && (
            <Box my={ 2 }>
              <Alert severity="error"> { error } </Alert>
            </Box>
          ) }
          <form className={ classes.form } onSubmit={ handleSubmit(onSubmit) } noValidate>
            <TextField
              fullWidth
              margin="normal"
              color="secondary"
              name="email"
              label="email"
              error={ !!errors.email }
              helperText={ errors.email?.message }
              inputRef={ register({
                required,
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Email no válido'
                }
              }) }
            />

            <TextField
              fullWidth
              margin="normal"
              color="secondary"
              name="password"
              type="password"
              label="Contraseña"
              error={ !!errors.password }
              helperText={ errors.password?.message }
              inputRef={ register({ required }) }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={ classes.button }
            >
              Iniciar sesión
            </Button>

            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              className={ classes.button }
              onClick={ onGoogleLogin }
            >
              Iniciar sesión con Google
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
