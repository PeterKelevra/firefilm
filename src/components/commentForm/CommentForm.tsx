import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import useFirebase from '../../hooks/useFirebase';
import useUser from '../../hooks/useUser';
import { observer } from 'mobx-react';

interface CommentForm {
  filmUid: string
}

function CommentForm({ filmUid }: CommentForm) {
  const firebase = useFirebase();
  const user = useUser();
  const { trigger, register, errors, getValues, setValue, handleSubmit } = useForm();

  const onSubmit = () => {
    trigger().then(() => {
      const data = {
        createdAt: Date.now(),
        userUid: user.uid,
        author: user.displayName,
        ...getValues(),
        filmUid
      };
      firebase.comments().push(data)
        .then(() => {
          setValue('text', '');
        });
    });
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) } noValidate>
      <Box display="flex" mt={ 3 }>
        <Box flexGrow={ 1 }>
          <TextField
            autoFocus
            margin="dense"
            name="text"
            label="Escribe tu comentario"
            type="text"
            multiline
            fullWidth
            disabled={ !user }
            error={ !!errors.text }
            helperText={ errors.text?.message }
            inputRef={ register({ required: 'Campo requerido' }) }
          />
        </Box>
        <Box ml={ 2 }>
          <Button type="submit" disabled={ !user } variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default observer(CommentForm);
